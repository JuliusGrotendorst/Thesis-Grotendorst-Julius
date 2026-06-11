"use client";

import { useState } from "react";

import { useFormStore, FileRef } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

function findFirstIncompleteStep(
  formData: Record<string, unknown>,
  fileRefs: FileRef[],
  isHzL: boolean
): number | null {
  const has = (field: string) => fileRefs.some((f) => f.field === field);
  const str = (v: unknown): boolean => typeof v === "string" && v.trim().length > 0;

  if (!isHzL) {
    // Step 3: Persönliche Daten + Personalausweis
    if (!str(formData.vorname) || !str(formData.nachname) || !str(formData.geburtsdatum) ||
        !str(formData.geburtsort) || !str(formData.strasse) || !str(formData.email) ||
        (!formData.aktenzeichenUnbekannt && !str(formData.aktenzeichen)) ||
        !has("ausweisdokument")) return 3;

    // Step 4: Betreuung
    if (!formData.hatBetreuung) return 4;
    if (formData.hatBetreuung === "ja" &&
        (!str(formData.betreuungVorname) || !str(formData.betreuungNachname) || !has("betreuung_vollmacht"))) return 4;

    // Step 5: Persönliche Verhältnisse
    if (!formData.familienstandAenderung || !formData.haushaltGroesseAenderung) return 5;
    if (formData.familienstandAenderung === "aenderung" && !str(formData.neuerFamilienstand)) return 5;
    if (formData.haushaltGroesseAenderung === "aenderung" && !str(formData.anzahlPersonen)) return 5;

    // Step 6: Wohnkosten + Kaltmiete + Mietbescheinigung
    if (!formData.wohnkostenAenderung) return 6;
    if (formData.wohnkostenAenderung === "aenderung") {
      if (!formData.wohnart || !str(formData.kaltmiete)) return 6;
      if (formData.wohnart === "miete" && !has("wk_mietbescheinigung")) return 6;
      if (formData.wohnart === "eigentum" && !has("wk_hauskosten")) return 6;
    }
    if (formData.wohnkostenAenderung === "keine" && !has("wk_mietbescheinigung")) return 6;

    // Step 7: Einkommen
    if (!formData.einkommenAenderung) return 7;
    if (formData.einkommenAenderung === "keine" && !has("ek_nachweise_keine_aenderung")) return 7;

    // Step 8: Vermögen + Kontoauszüge (3 Monate als 1 PDF)
    if (!formData.vermoegenAenderung || !has("verm_kontoauszug")) return 8;

    // Step 9: Mehrbedarfe & Versicherungen
    if (!formData.schwerbehinderungAenderung || !formData.ernaehrungAenderung ||
        !formData.haftpflichtAenderung || !formData.hausratAenderung ||
        !formData.weitereVersicherungenAenderung) return 9;
    if (formData.schwerbehinderungAenderung === "aenderung" && !has("sb_bescheid")) return 9;
    if (formData.ernaehrungAenderung === "aenderung" && !has("sb_ernaehrung_nachweis")) return 9;
    if (formData.haftpflichtAenderung === "aenderung" && !has("vers_haftpflicht")) return 9;
    if (formData.hausratAenderung === "aenderung" && !has("vers_hausrat")) return 9;
    if (formData.weitereVersicherungenAenderung === "aenderung" && !has("vers_weitere")) return 9;

    // Step 10: Bankverbindung
    if (!formData.bankverbindungAenderung) return 10;
    if (formData.bankverbindungAenderung === "aenderung" &&
        (!str(formData.kontoinhaber) || !str(formData.iban) || !str(formData.geldinstitut))) return 10;

    // Step 11: Auslandsaufenthalt & Veränderungen
    if (!formData.auslandsaufenthaltGeplant || !formData.weitereVeraenderungen) return 11;
    if (formData.auslandsaufenthaltGeplant === "ja" &&
        (!str(formData.auslandsaufenthaltAbWann) || !str(formData.auslandsaufenthaltDauer))) return 11;
    if (formData.weitereVeraenderungen === "ja" && !str(formData.veraenderungenBeschreibung)) return 11;

    // Step 12: Prüfen & Unterschrift
    if (!formData.richtigkeit || !formData.datenschutz || !str(formData.wbUnterschrift)) return 12;

    return null;
  }

  // HzL
  // Step 3: Persönliche Daten + Personalausweis
  if (!str(formData.vorname) || !str(formData.nachname) || !str(formData.geburtsdatum) ||
      !str(formData.geburtsort) || !str(formData.strasse) || !str(formData.email) ||
      !has("hzl_ausweis_antragsteller")) return 3;

  // Step 3: Betreuung (wird in StepHzL03PersonalData erfasst)
  if (!formData.hatBetreuung) return 3;
  if (formData.hatBetreuung === "ja" &&
      (!str(formData.betreuungVorname) || !str(formData.betreuungNachname) || !has("betreuung_vollmacht"))) return 3;

  // Step 10: Vermögen + Kontoauszüge
  if (!has("hzl_kontoauszuege")) return 10;

  // Step 11: Wohnkosten + Kaltmiete + Mietbescheinigung
  if (!str(formData.hzlKaltmiete) || !has("hzl_wk_mietbescheinigung")) return 11;

  // Step 9: Absetzbare Beträge — pro angekreuztem Item ist ein Nachweis Pflicht.
  // Greift nur, wenn Items existieren; leere Auswahl löst keinen Sprung aus.
  const absetzbar = (formData.hzlAbsetzbar as Array<{ personName: string; items: Array<{ art: string }> }> | undefined) ?? [];
  for (const person of absetzbar) {
    for (const item of person.items || []) {
      const field = `hzl_absetzbar_nachweis_${person.personName.replace(/\s+/g, "_")}_${item.art.replace(/\s+/g, "_")}`;
      if (!has(field)) return 9;
    }
  }

  // Step 15: Prüfen + Unterschriften
  if (!formData.hzlRichtigkeit || !formData.hzlDatenschutz) return 15;

  return null;
}

export default function Step11Absenden() {
  const {
    formData, fileRefs, prevStep, setVorgangsnummer, vorgangsnummer, reset,
    haushaltMitgliederEinkommen, haushaltMitgliederVermoegen, nextStep, setStep,
  } = useFormStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async () => {
    const isHzL = formData.leistungsart === "hilfe_zum_lebensunterhalt";
    const incompleteStep = findFirstIncompleteStep(formData, fileRefs, isHzL);
    if (incompleteStep !== null) {
      setError(`Schritt ${incompleteStep} enthält noch nicht ausgefüllte Pflichtfelder. Sie werden jetzt dorthin weitergeleitet.`);
      setTimeout(() => setStep(incompleteStep), 1200);
      return;
    }

    setSubmitting(true);
    setError(undefined);

    try {
      const fd = new FormData();

      const antragsteller = {
        anrede: formData.anrede,
        vorname: formData.vorname,
        nachname: formData.nachname,
        geburtsdatum: formData.geburtsdatum,
        geburtsort: formData.geburtsort,
        staatsangehoerigkeit: formData.staatsangehoerigkeit,
        familienstand: formData.familienstand,
        strasse: formData.strasse,
        plz: formData.plz,
        ort: formData.ort,
        email: formData.email,
        telefon: formData.telefon,
        aktenzeichen: formData.aktenzeichenUnbekannt ? "unbekannt" : formData.aktenzeichen,
        // HzL-Erweiterungen
        ...(isHzL && {
          aufenthaltsstatusAuslaender: formData.aufenthaltsstatusAuslaender,
          familienstandSeit: formData.familienstandSeit,
          beschaeftigung: formData.beschaeftigung,
          einschraenkungArbeitskraft: formData.einschraenkungArbeitskraft,
          volleErwerbsminderung: formData.volleErwerbsminderung,
          schwerbehinderungDatum: formData.schwerbehinderungDatum,
          schwerbehinderungGrad: formData.schwerbehinderungGrad,
          schwerbehinderungAntragGestellt: formData.schwerbehinderungAntragGestellt,
          geschiedenUrteilDatum: formData.geschiedenUrteilDatum,
          geschiedenGericht: formData.geschiedenGericht,
          geschiedenGeschaeftszeichen: formData.geschiedenGeschaeftszeichen,
        }),
      };

      const payload = isHzL
        ? {
            leistungsart: formData.leistungsart,
            antragsart: formData.antragsart,
            antragsteller,
            betreuung: {
              hatBetreuung: formData.hatBetreuung,
              vorname: formData.betreuungVorname,
              nachname: formData.betreuungNachname,
              anschrift: formData.betreuungAnschrift,
            },
            haushalt: formData.hzlHaushaltPersonen ?? [],
            aufenthalt: {
              zugezogenAm: formData.zugezogenAm,
              frueherAnschrift: formData.frueherAnschrift,
              fruehereSozialhilfe: formData.fruehereSozialhilfe,
              fruehereSozialhilfeVon: formData.fruehereSozialhilfeVon,
              fruehereSozialhilfeBis: formData.fruehereSozialhilfeBis,
              fruehereSozialhilfeWo: formData.fruehereSozialhilfeWo,
              einrichtungsaufenthaltVorhanden: formData.einrichtungsaufenthaltVorhanden,
              einrichtungVon: formData.einrichtungVon,
              einrichtungBis: formData.einrichtungBis,
              einrichtungIn: formData.einrichtungIn,
              einrichtungStationaer: formData.einrichtungStationaer,
              einrichtungUebergang: formData.einrichtungUebergang,
              einrichtungKostentraeger: formData.einrichtungKostentraeger,
              einrichtungEntlassung: formData.einrichtungEntlassung,
              uebertritteEntries: formData.hzlUebertrittEntries ?? [],
              kriegsereignisseAngehoerige: formData.kriegsereignisseAngehoerige,
              kriegsAngehoerige: formData.kriegsAngehoerige ?? [],
              ddrEntscheidungen: formData.ddrEntscheidungen,
              ddrAngehoerige: formData.ddrAngehoerige ?? [],
            },
            unterhalt: {
              unterhaltspflichtige: formData.hzlUnterhaltspflichtige ?? [],
              unterhaltsberechtigte: formData.hzlUnterhaltsberechtigte ?? [],
              nichtehelicheKinder: formData.hzlNichtehelicheKinder ?? [],
              berufeElternKinder: formData.hzlBerufeElternKinder ?? [],
            },
            krankenPflege: formData.hzlKrankenPflege ?? [],
            einkommen: formData.hzlEinkommen ?? [],
            absetzbar: formData.hzlAbsetzbar ?? [],
            vermoegen: formData.hzlVermoegen ?? [],
            vermoegenUebertragung: formData.hzlVermoegenUebertragung,
            wohnkosten: {
              kaltmiete: formData.hzlKaltmiete,
              nebenkosten: formData.hzlNebenkosten,
              wohnungGroesseQm: formData.hzlWohnungGroesseQm,
              wohnungAnzahlRaeume: formData.hzlWohnungAnzahlRaeume,
              untervermietet: formData.hzlUntervermietet,
              untervermieteteRaeume: formData.hzlUntervermieteteRaeume,
              vermieterName: formData.hzlVermieterName,
              vermieterAnschrift: formData.hzlVermieterAnschrift,
              wohngeldBewilligtBis: formData.hzlWohngeldBewilligtBis,
              wohngeldBetrag: formData.hzlWohngeldBetrag,
              heizungsart: formData.hzlHeizungsart,
              energieart: formData.hzlEnergieart,
              energieartSonstige: formData.hzlEnergieartSonstige,
              kochfeuerungEnthalten: formData.hzlKochfeuerungEnthalten,
              heizungspauschale: formData.hzlHeizungspauschale,
              heizungspauschaleWarmwasser: formData.hzlHeizungspauschaleWarmwasser,
              heizungspauschaleZahlenAn: formData.hzlHeizungspauschaleZahlenAn,
              einnahmenUntervermietung: formData.hzlEinnahmenUntervermietung,
              personenImHaushalt: formData.hzlPersonenImHaushalt,
              leerRaeume: formData.hzlLeerRaeume,
              mobiertRaeume: formData.hzlMobiertRaeume,
              mieterVorname: formData.hzlMieterVorname,
              mieterNachname: formData.hzlMieterNachname,
            },
            ansprueche: formData.hzlAnsprueche ?? [],
            begruendung: {
              antragBegruendung: formData.antragBegruendung,
              sonstigeAnmerkungen: formData.sonstigeAnmerkungen,
            },
            bankverbindung: {
              iban: formData.hzlIban,
              bankInstitut: formData.hzlBankInstitut,
            },
            bescheidePerson: formData.hzlBescheidePerson,
            versicherung: {
              richtigkeit: formData.hzlRichtigkeit,
              datenschutz: formData.hzlDatenschutz,
              unterschrift: (() => {
                const sigs = formData.hzlUnterschriften as Record<string, string> | undefined;
                if (!sigs) return "Nein";
                return Object.values(sigs).some((s) => typeof s === "string" && s.startsWith("data:image"))
                  ? "Ja"
                  : "Nein";
              })(),
            },
            dateien: fileRefs
              .filter((r) => r.base64)
              .map(({ file: _, base64, ...rest }) => ({ ...rest, base64: base64! })),
            dateiReferenzen: fileRefs.map(({ file: _, base64: _b, ...rest }) => rest),
          }
        : {
            leistungsart: formData.leistungsart,
            antragsart: formData.antragsart,
            antragsteller,
            betreuung: {
              hatBetreuung: formData.hatBetreuung,
              ...(formData.hatBetreuung === "ja" && {
                vorname:  formData.betreuungVorname,
                nachname: formData.betreuungNachname,
                telefon:  formData.betreuungTelefon,
                email:    formData.betreuungEmail,
              }),
            },
            persoenlicheVerhaeltnisse: {
              familienstandAenderung:   formData.familienstandAenderung,
              ...(formData.familienstandAenderung === "aenderung" && {
                neuerFamilienstand: formData.neuerFamilienstand,
              }),
              haushaltGroesseAenderung: formData.haushaltGroesseAenderung,
              ...(formData.haushaltGroesseAenderung === "aenderung" && {
                anzahlPersonen: formData.anzahlPersonen,
              }),
            },
            wohnkosten: {
              aenderung: formData.wohnkostenAenderung,
              ...(formData.wohnkostenAenderung === "aenderung" && {
                kaltmiete:                        formData.kaltmiete,
                nebenkosten:                      formData.nebenkosten,
                heizkosten:                       formData.heizkosten,
                betriebskostenabrechnungVorhanden: formData.betriebskostenabrechnungVorhanden,
              }),
            },
            einkommenWb: {
              aenderung: formData.einkommenAenderung,
              ...(formData.einkommenAenderung === "aenderung" && {
                hatKeinEinkommen: formData.hatKeinEinkommen,
                personen:         formData.einkommenPersonen,
              }),
            },
            vermoegen: {
              aenderung: formData.vermoegenAenderung,
              ...(formData.vermoegenAenderung === "aenderung" && {
                bankguthaben:               formData.bankguthaben,
                bargeld:                    formData.bargeld,
                wertpapiere:                formData.wertpapiere,
                sonstigesVermoegen:         formData.sonstigesVermoegen,
                hatPfaendungsschutzkonto:   formData.hatPfaendungsschutzkonto,
                kontoauszuegeNachreichen:   formData.kontoauszuegeNachreichen,
                kontoauszuegeNachreichDatum: formData.kontoauszuegeNachreichDatum,
              }),
            },
            mehrbedarfeVersicherungen: {
              schwerbehinderungAenderung:     formData.schwerbehinderungAenderung,
              ernaehrungAenderung:            formData.ernaehrungAenderung,
              haftpflichtAenderung:           formData.haftpflichtAenderung,
              hausratAenderung:               formData.hausratAenderung,
              weitereVersicherungenAenderung: formData.weitereVersicherungenAenderung,
            },
            bankverbindung: {
              aenderung: formData.bankverbindungAenderung,
              ...(formData.bankverbindungAenderung === "aenderung" && {
                kontoinhaber:            formData.kontoinhaber,
                iban:                    formData.iban,
                bic:                     formData.bic,
                geldinstitut:            formData.geldinstitut,
                hatPfaendungsschutzkonto: formData.bankHatPfaendungsschutzkonto,
              }),
            },
            sonstigeVeraenderungen: {
              auslandsaufenthaltGeplant: formData.auslandsaufenthaltGeplant,
              ...(formData.auslandsaufenthaltGeplant === "ja" && {
                auslandsaufenthaltAbWann: formData.auslandsaufenthaltAbWann,
                auslandsaufenthaltDauer:  formData.auslandsaufenthaltDauer,
              }),
              weitereVeraenderungen: formData.weitereVeraenderungen,
              ...(formData.weitereVeraenderungen === "ja" && {
                veraenderungenBeschreibung: formData.veraenderungenBeschreibung,
              }),
            },
            veraenderungen: formData.veraenderungen,
            versicherung: {
              richtigkeit: formData.richtigkeit,
              datenschutz: formData.datenschutz,
              unterschrift: typeof formData.wbUnterschrift === "string" && (formData.wbUnterschrift as string).startsWith("data:image") ? "Ja" : "Nein",
            },
            dateien: fileRefs
              .filter((r) => r.base64)
              .map(({ file: _, base64, ...rest }) => ({ ...rest, base64: base64! })),
            dateiReferenzen: fileRefs.map(({ file: _, base64: _b, ...rest }) => rest),
          };

      fd.append("payload", JSON.stringify(payload));

      const res = await fetch("/api/submit", { method: "POST", body: fd });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Unbekannter Fehler");

      setVorgangsnummer(json.vorgangsnummer);
      nextStep();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Übermittlung fehlgeschlagen.");
    } finally {
      setSubmitting(false);
    }
  };

  if (vorgangsnummer) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-brand-success rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width={36} height={36} viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth={2.2} strokeLinecap="round">
            <path d="m4 10 4 4 8-8" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">Antrag erfolgreich übermittelt</h2>
        <p className="text-neutral-600 mb-2">
          Vielen Dank, <strong>{formData.anrede as string} {formData.nachname as string}</strong>. Ihr Antrag wurde an das Sozialamt Borken übermittelt.
        </p>
        <p className="text-neutral-600 mb-6">
          Sie erhalten eine Eingangsbestätigung an{" "}
          <strong>{formData.email as string}</strong> und innerhalb von zwei Wochen Post.
        </p>
        <div className="bg-brand-soft border border-brand-border rounded-sm p-4 mb-8 text-sm">
          <p className="text-brand-subtle">Ihre Vorgangsnummer</p>
          <p className="text-xl font-mono font-bold text-brand-text mt-1">{vorgangsnummer}</p>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button variant="secondary" onClick={() => { reset(); window.location.href = "/"; }}>
            Zur Startseite
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormStep title="Antrag absenden" subtitle="Prüfen Sie Ihre hochgeladenen Dokumente und senden Sie den Antrag ab." onBack={prevStep}>
      {/* File summary */}
      {fileRefs.length > 0 && (
        <div className="border border-neutral-200 rounded-sm overflow-hidden">
          <div className="bg-neutral-50 px-4 py-3 text-sm font-semibold border-b border-neutral-200">
            Hochgeladene Dokumente ({fileRefs.length})
          </div>
          <ul className="divide-y divide-neutral-100">
            {fileRefs.map((f) => (
              <li key={f.field} className="flex items-center gap-3 px-4 py-3 text-sm">
                <svg width={16} height={16} viewBox="0 0 20 20" fill="none" stroke="#6BAD7A" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
                  <path d="M5 3h7l3 3v11H5z" /><path d="M12 3v3h3" />
                </svg>
                <span className="flex-1 truncate font-medium">{f.name}</span>
                <span className="text-neutral-400">{(f.size / 1024).toFixed(0)} KB</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div role="alert" className="p-4 bg-red-50 border border-red-200 border-l-4 border-l-brand-danger rounded-sm text-sm text-red-800">
          <strong>Fehler:</strong> {error}
          <p className="mt-1 text-xs">Ihre Eingaben wurden lokal gespeichert. Bitte versuchen Sie es erneut.</p>
        </div>
      )}

      <Button onClick={handleSubmit} loading={submitting} className="w-full justify-center text-lg py-4">
        Antrag verbindlich einreichen →
      </Button>
    </FormStep>
  );
}
