"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { versicherungSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import SignaturePad from "@/components/ui/SignaturePad";

type FormValues = z.infer<typeof versicherungSchema>;

function SummarySection({
  title,
  step,
  setStep,
  children,
}: {
  title: string;
  step: number;
  setStep: (n: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-neutral-200 rounded-sm overflow-hidden">
      <div className="bg-neutral-50 px-4 py-2.5 flex justify-between items-center border-b border-neutral-200">
        <span className="text-sm font-semibold text-neutral-700">{title}</span>
        <button
          type="button"
          onClick={() => setStep(step)}
          className="text-xs text-brand-accent underline hover:no-underline"
        >
          Bearbeiten
        </button>
      </div>
      <dl className="divide-y divide-neutral-100">{children}</dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="px-4 py-2.5 grid grid-cols-[180px_1fr] gap-4">
      <dt className="text-sm text-neutral-500">{label}</dt>
      <dd className="text-sm text-neutral-900">{value || "—"}</dd>
    </div>
  );
}

function AenderungRow({ label, aenderung }: { label: string; aenderung?: string }) {
  const text =
    aenderung === "keine" ? "Keine Änderung" : aenderung === "aenderung" ? "Änderung mitgeteilt" : "—";
  return <Row label={label} value={text} />;
}

export default function Step10Versicherung() {
  const {
    formData, updateFormData, nextStep, prevStep, setStep,
  } = useFormStore();

  const mainName = `${(formData.vorname as string) ?? ""} ${(formData.nachname as string) ?? ""}`.trim() || "Antragsteller*in";
  const savedSig = (formData.wbUnterschrift as string | undefined) ?? "";
  const [sig, setSig] = useState<string>(savedSig);
  const [sigError, setSigError] = useState<string>("");

  const { watch, setValue, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(versicherungSchema),
    defaultValues: {
      richtigkeit: formData.richtigkeit as true | undefined,
      datenschutz: formData.datenschutz as true | undefined,
    },
  });

  const richtigkeit = watch("richtigkeit");
  const datenschutz = watch("datenschutz");

  const onNext = handleSubmit((data) => {
    if (!sig) {
      setSigError("Bitte leisten Sie Ihre Unterschrift.");
      return;
    }
    setSigError("");
    updateFormData({ ...data, wbUnterschrift: sig });
    nextStep();
  });

  return (
    <FormStep
      title="Prüfen & Bestätigen"
      subtitle="Bitte prüfen Sie Ihre Angaben und bestätigen Sie die Richtigkeit. Einzelne Schritte können über 'Bearbeiten' angepasst werden."
      onNext={onNext}
      onBack={prevStep}
    >
      {/* Schritt 1 & 2 */}
      <SummarySection title="Antrag" step={1} setStep={setStep}>
        <Row
          label="Leistungsart"
          value={
            formData.leistungsart === "grundsicherung"
              ? "Grundsicherung (4. Kap. SGB XII)"
              : "Hilfe zum Lebensunterhalt (3. Kap. SGB XII)"
          }
        />
        <Row label="Antragsart" value="Weiterbewilligungsantrag" />
      </SummarySection>

      {/* Schritt 3 */}
      <SummarySection title="Persönliche Daten" step={3} setStep={setStep}>
        <Row
          label="Name"
          value={`${formData.anrede ? formData.anrede + " " : ""}${formData.vorname ?? ""} ${formData.nachname ?? ""}`.trim()}
        />
        <Row label="Geburtsdatum" value={formData.geburtsdatum as string} />
        <Row label="Adresse" value={`${(formData.strasse as string) ?? ""}, ${(formData.plz as string) ?? ""} ${(formData.ort as string) ?? ""}`} />
        <Row label="E-Mail" value={formData.email as string} />
        <Row label="Aktenzeichen" value={formData.aktenzeichenUnbekannt ? "Nicht bekannt" : formData.aktenzeichen as string} />
      </SummarySection>

      {/* Schritt 4 */}
      <SummarySection title="Betreuung" step={4} setStep={setStep}>
        <Row label="Unter Betreuung/Vollmacht" value={formData.hatBetreuung === "ja" ? "Ja" : "Nein"} />
        {formData.hatBetreuung === "ja" && (
          <Row
            label="Betreuer*in"
            value={`${formData.betreuungVorname ?? ""} ${formData.betreuungNachname ?? ""}`.trim()}
          />
        )}
      </SummarySection>

      {/* Schritt 5 */}
      <SummarySection title="Persönliche Verhältnisse" step={5} setStep={setStep}>
        <AenderungRow label="Familienstand" aenderung={formData.familienstandAenderung as string} />
        {formData.familienstandAenderung === "aenderung" && (
          <Row label="Neuer Familienstand" value={formData.neuerFamilienstand as string} />
        )}
        <AenderungRow label="Haushaltsgröße" aenderung={formData.haushaltGroesseAenderung as string} />
        {formData.haushaltGroesseAenderung === "aenderung" && (
          <Row label="Anzahl Personen" value={formData.anzahlPersonen as string} />
        )}
      </SummarySection>

      {/* Schritt 6 */}
      <SummarySection title="Unterkunft & Heizkosten" step={6} setStep={setStep}>
        <AenderungRow label="Wohnkosten" aenderung={formData.wohnkostenAenderung as string} />
        {formData.wohnkostenAenderung === "aenderung" && (
          <>
            <Row
              label="Wohnform"
              value={formData.wohnart === "miete" ? "Miete" : formData.wohnart === "eigentum" ? "Eigentum" : "—"}
            />
            {formData.kaltmiete && (
              <Row label="Kaltmiete / Hauskosten" value={`${formData.kaltmiete} €`} />
            )}
            {formData.nebenkosten && (
              <Row label="Nebenkosten" value={`${formData.nebenkosten} €`} />
            )}
            {formData.heizkosten && (
              <Row label="Heizkosten" value={`${formData.heizkosten} €`} />
            )}
          </>
        )}
      </SummarySection>

      {/* Schritt 7 */}
      <SummarySection title="Einkommen" step={7} setStep={setStep}>
        <AenderungRow label="Einkommen" aenderung={formData.einkommenAenderung as string} />
        {formData.einkommenAenderung === "aenderung" && (
          <Row
            label="Einkommensarten"
            value={
              (formData.hatKeinEinkommen as boolean)
                ? "Kein Einkommen"
                : (formData.einkommensarten as { art: string }[] | undefined)
                    ?.map((e) => e.art)
                    .join(", ") || "—"
            }
          />
        )}
      </SummarySection>

      {/* Schritt 8 */}
      <SummarySection title="Vermögen" step={8} setStep={setStep}>
        <AenderungRow label="Vermögen" aenderung={formData.vermoegenAenderung as string} />
        {formData.vermoegenAenderung === "aenderung" && (
          <>
            {formData.bankguthaben && <Row label="Bankguthaben" value={`${formData.bankguthaben} €`} />}
            {formData.bargeld && <Row label="Bargeld" value={`${formData.bargeld} €`} />}
            {formData.wertpapiere && <Row label="Wertpapiere" value={`${formData.wertpapiere} €`} />}
            <Row
              label="P-Konto"
              value={
                formData.hatPfaendungsschutzkonto === "ja"
                  ? "Ja"
                  : formData.hatPfaendungsschutzkonto === "nein"
                  ? "Nein"
                  : "—"
              }
            />
          </>
        )}
      </SummarySection>

      {/* Schritt 9 */}
      <SummarySection title="Mehrbedarfe & Versicherungen" step={9} setStep={setStep}>
        <AenderungRow label="Schwerbehindertenausweis" aenderung={formData.schwerbehinderungAenderung as string} />
        {formData.schwerbehinderungAenderung === "aenderung" && (
          <Row
            label="Merkzeichen G / aG"
            value={formData.merkzeichenGAG === "ja" ? "Ja" : formData.merkzeichenGAG === "nein" ? "Nein" : "—"}
          />
        )}
        <AenderungRow label="Ernährung (krankheitsbedingt)" aenderung={formData.ernaehrungAenderung as string} />
      </SummarySection>

      {/* Schritt 10 */}
      <SummarySection title="Bankverbindung" step={10} setStep={setStep}>
        <AenderungRow label="Bankverbindung" aenderung={formData.bankverbindungAenderung as string} />
        {formData.bankverbindungAenderung === "aenderung" && (
          <>
            <Row label="Kontoinhaber" value={formData.kontoinhaber as string} />
            <Row label="IBAN" value={formData.iban as string} />
            <Row label="Geldinstitut" value={formData.geldinstitut as string} />
            <Row
              label="P-Konto"
              value={
                formData.bankHatPfaendungsschutzkonto === "ja"
                  ? "Ja"
                  : formData.bankHatPfaendungsschutzkonto === "nein"
                  ? "Nein"
                  : "—"
              }
            />
          </>
        )}
      </SummarySection>

      {/* Schritt 11 */}
      <SummarySection title="Auslandsaufenthalt & Weitere Änderungen" step={11} setStep={setStep}>
        <Row
          label="Auslandsaufenthalt geplant"
          value={
            formData.auslandsaufenthaltGeplant === "ja"
              ? `Ja – ab ${formData.auslandsaufenthaltAbWann ?? "?"}, ${formData.auslandsaufenthaltDauer ?? "?"}`
              : formData.auslandsaufenthaltGeplant === "nein"
              ? "Nein"
              : "—"
          }
        />
        <Row
          label="Weitere Veränderungen"
          value={
            formData.weitereVeraenderungen === "ja"
              ? `Ja – ${(formData.veraenderungenBeschreibung as string | undefined)?.slice(0, 80) ?? ""}…`
              : formData.weitereVeraenderungen === "nein"
              ? "Nein"
              : "—"
          }
        />
      </SummarySection>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Datum und Unterschrift <span className="text-brand-danger">*</span>
        </legend>
        <p className="text-xs text-neutral-500">
          Bitte unterschreiben Sie mit der Maus oder per Touch. Ort und Datum: Borken, {new Date().toLocaleDateString("de-DE")}
        </p>
        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-800">{mainName} <span className="text-xs text-neutral-400 font-normal">(Antragsteller*in)</span></p>
          <SignaturePad label="" onChange={(dataUrl) => { setSig(dataUrl ?? ""); if (dataUrl) setSigError(""); }} />
          {sigError && (
            <p role="alert" className="field-error mt-1">
              <svg width={14} height={14} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
                <path d="M10 3 2.5 16h15z" /><path d="M10 8v4m0 2v.01" />
              </svg>
              {sigError}
            </p>
          )}
        </div>
      </fieldset>

      {/* Erklärung gemäß Folgeantrag */}
      <div className="space-y-3">
        <Checkbox
          label="Das Formular habe ich wahrheitsgemäß ausgefüllt. Wenn und solange ich Grundsicherungsleistungen erhalte, werde ich Änderungen der persönlichen und wirtschaftlichen Verhältnisse (Familien-, Wohn-, Einkommens-, Vermögens- und Aufenthaltsverhältnisse) unverzüglich und unaufgefordert mitteilen. Mir ist bekannt, dass zu Unrecht erbrachte Leistungen zu erstatten sind und ggf. eine Ordnungswidrigkeit bzw. Straftat vorliegt (§ 263 StGB)."
          checked={richtigkeit ?? false}
          onChange={(e) => setValue("richtigkeit", e.target.checked as true)}
          error={errors.richtigkeit?.message}
        />
        <Checkbox
          label="Ich habe den Datenschutzhinweis zur Kenntnis genommen. Die Datenerhebung erfolgt nach Art. 6 Abs. 1 lit. c) und e) DSGVO i.V.m. §§ 67–78 SGB X. Die Verarbeitung erfolgt über den Auftragsverarbeiter Make.com (AVV gem. Art. 28 DSGVO)."
          hint="Weitere Informationen: "
          checked={datenschutz ?? false}
          onChange={(e) => setValue("datenschutz", e.target.checked as true)}
          error={errors.datenschutz?.message}
        />
        <Link href="/datenschutz" className="text-xs text-brand-accent underline ml-8" target="_blank">
          Datenschutzerklärung öffnen ↗
        </Link>
      </div>
    </FormStep>
  );
}
