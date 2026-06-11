"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { hzlVersicherungSchema, hzlHaushaltPersonSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Checkbox from "@/components/ui/Checkbox";
import Select from "@/components/ui/Select";
import SignaturePad from "@/components/ui/SignaturePad";

type FormValues = z.infer<typeof hzlVersicherungSchema>;
type HaushaltPerson = z.infer<typeof hzlHaushaltPersonSchema>;

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

export default function StepHzL14Pruefen() {
  const { formData, updateFormData, nextStep, prevStep, setStep } = useFormStore();

  const hhPersonen = (formData.hzlHaushaltPersonen as HaushaltPerson[] | undefined) ?? [];
  const mainName =
    `${(formData.vorname as string) ?? ""} ${(formData.nachname as string) ?? ""}`.trim() ||
    "Antragsteller*in";
  const allPersonNames = [mainName, ...hhPersonen.map((p) => `${p.vorname} ${p.nachname}`.trim())];

  const { watch, setValue, handleSubmit, register, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(hzlVersicherungSchema),
    defaultValues: {
      hzlRichtigkeit: formData.hzlRichtigkeit as true | undefined,
      hzlDatenschutz: formData.hzlDatenschutz as true | undefined,
    },
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const [bescheidePerson, setBescheidePerson] = useState<string>(
    (formData.hzlBescheidePerson as string) ?? ""
  );
  const [bescheidePersonError, setBescheidePersonError] = useState<string | null>(null);

  const savedSigs = (formData.hzlUnterschriften as Record<string, string> | undefined) ?? {};
  const [unterschriften, setUnterschriften] = useState<Record<string, string>>(savedSigs);

  const setSig = (name: string, dataUrl: string | null) => {
    setUnterschriften((prev) => {
      const next = { ...prev };
      if (dataUrl) next[name] = dataUrl;
      else delete next[name];
      return next;
    });
  };

  const richtigkeit = watch("hzlRichtigkeit");
  const datenschutz = watch("hzlDatenschutz");

  const requiredByStep: { step: number; label: string; field: string }[] = [
    { step: 3, label: "Vorname", field: "vorname" },
    { step: 3, label: "Nachname", field: "nachname" },
    { step: 3, label: "Geburtsdatum", field: "geburtsdatum" },
    { step: 3, label: "Geburtsort", field: "geburtsort" },
    { step: 3, label: "Staatsangehörigkeit", field: "staatsangehoerigkeit" },
    { step: 3, label: "Familienstand", field: "familienstand" },
    { step: 3, label: "Straße", field: "strasse" },
    { step: 3, label: "PLZ", field: "plz" },
    { step: 3, label: "Ort", field: "ort" },
    { step: 3, label: "E-Mail", field: "email" },
  ];

  const onNext = handleSubmit((data) => {
    for (const check of requiredByStep) {
      const val = formData[check.field];
      if (!val || (typeof val === "string" && val.trim() === "")) {
        setValidationError(`Pflichtfeld „${check.label}" (Schritt ${check.step}) ist nicht ausgefüllt.`);
        setStep(check.step);
        return;
      }
    }
    if (!bescheidePerson.trim()) {
      setBescheidePersonError("Bitte Empfänger*in der Bescheide auswählen.");
      setValidationError(null);
      return;
    }
    setBescheidePersonError(null);
    setValidationError(null);
    updateFormData({ ...data, hzlBescheidePerson: bescheidePerson, hzlUnterschriften: unterschriften });
    nextStep();
  });

  const einkommen = (formData.hzlEinkommen as { personName: string; items: { art: string }[]; keinEinkommen?: boolean }[] | undefined) ?? [];
  const vermoegen = (formData.hzlVermoegen as { personName: string; items: { art: string }[] }[] | undefined) ?? [];
  const ansprueche = (formData.hzlAnsprueche as unknown[] | undefined) ?? [];
  const krankenPflege = (formData.hzlKrankenPflege as { personName: string; krankenversicherung: string }[] | undefined) ?? [];

  return (
    <FormStep
      title="Prüfen und Bestätigen"
      subtitle="Überprüfen Sie Ihre Angaben. Einzelne Schritte können über 'Bearbeiten' angepasst werden."
      onNext={onNext}
      onBack={prevStep}
      nextLabel="Weiter zum Absenden"
    >
      {/* Schritt 1 & 2 */}
      <SummarySection title="Antrag" step={1} setStep={setStep}>
        <Row label="Leistungsart" value="Hilfe zum Lebensunterhalt (3. Kap. SGB XII)" />
        <Row
          label="Antragsart"
          value={formData.antragsart === "neuantrag" ? "Neuantrag" : "Wirtschaftliche Überprüfung"}
        />
      </SummarySection>

      {/* Schritt 3: Persönliche Daten */}
      <SummarySection title="Persönliche Daten" step={3} setStep={setStep}>
        <Row
          label="Name"
          value={`${formData.anrede ? formData.anrede + " " : ""}${(formData.vorname as string) ?? ""} ${(formData.nachname as string) ?? ""}`.trim()}
        />
        <Row label="Geburtsdatum" value={formData.geburtsdatum as string} />
        <Row
          label="Adresse"
          value={`${(formData.strasse as string) ?? ""}, ${(formData.plz as string) ?? ""} ${(formData.ort as string) ?? ""}`.trim().replace(/^,\s*/, "")}
        />
        <Row label="E-Mail" value={formData.email as string} />
        <Row label="Staatsangehörigkeit" value={formData.staatsangehoerigkeit as string} />
        <Row
          label="Aktenzeichen"
          value={formData.aktenzeichenUnbekannt ? "Nicht bekannt" : (formData.aktenzeichen as string)}
        />
      </SummarySection>

      {/* Schritt 4: Haushaltsmitglieder */}
      <SummarySection title="Haushaltsangehörige" step={4} setStep={setStep}>
        <Row
          label="Personen im Haushalt"
          value={
            hhPersonen.length === 0
              ? "Keine weiteren Personen"
              : `${hhPersonen.length} Person${hhPersonen.length !== 1 ? "en" : ""}`
          }
        />
        {hhPersonen.map((p, i) => (
          <Row key={i} label={`Person ${i + 1}`} value={`${p.vorname} ${p.nachname}`.trim()} />
        ))}
      </SummarySection>

      {/* Schritt 5: Betreuung */}
      <SummarySection title="Betreuung / Vollmacht" step={3} setStep={setStep}>
        <Row
          label="Betreuung / Vollmacht"
          value={formData.hatBetreuung === "ja" ? "Ja" : "Nein"}
        />
        {formData.hatBetreuung === "ja" && (
          <Row
            label="Betreuer*in"
            value={`${(formData.betreuungVorname as string) ?? ""} ${(formData.betreuungNachname as string) ?? ""}`.trim()}
          />
        )}
      </SummarySection>

      {/* Schritt 6: Aufenthaltsverhältnisse */}
      <SummarySection title="Aufenthaltsverhältnisse" step={6} setStep={setStep}>
        <Row label="Zugezogen nach Borken am" value={formData.zugezogenAm as string} />
        <Row
          label="Frühere Sozialhilfe"
          value={formData.fruehereSozialhilfe === "ja" ? "Ja" : formData.fruehereSozialhilfe === "nein" ? "Nein" : "—"}
        />
        <Row
          label="Übertritt aus Ausland"
          value={formData.uebertrittAusland === "ja" ? "Ja" : formData.uebertrittAusland === "nein" ? "Nein" : "—"}
        />
      </SummarySection>

      {/* Schritt 7: Unterhaltspflichtige */}
      <SummarySection title="Unterhaltspflichtige Personen" step={5} setStep={setStep}>
        <Row
          label="Unterhaltspflichtige"
          value={
            ((formData.hzlUnterhaltspflichtige as unknown[]) ?? []).length === 0
              ? "Keine"
              : `${((formData.hzlUnterhaltspflichtige as unknown[]) ?? []).length} Person(en)`
          }
        />
      </SummarySection>

      {/* Schritt 8: Kranken- und Pflegeversicherung */}
      <SummarySection title="Kranken- und Pflegeversicherung" step={7} setStep={setStep}>
        {krankenPflege.length === 0 ? (
          <Row label="Versicherung" value="Keine Angaben" />
        ) : (
          krankenPflege.map((kv, i) => (
            <Row
              key={i}
              label={i === 0 ? `${kv.personName} (Antragst.)` : kv.personName}
              value={kv.krankenversicherung || "—"}
            />
          ))
        )}
      </SummarySection>

      {/* Schritt 9: Einkommen */}
      <SummarySection title="Einkommen" step={8} setStep={setStep}>
        {einkommen.length === 0 ? (
          <Row label="Einkommen" value="Keine Angaben" />
        ) : (
          einkommen.map((pe, i) => (
            <Row
              key={i}
              label={i === 0 ? `${pe.personName} (Antragst.)` : pe.personName}
              value={
                pe.keinEinkommen
                  ? "Kein Einkommen"
                  : pe.items.length === 0
                  ? "—"
                  : pe.items.map((it) => it.art).join(", ")
              }
            />
          ))
        )}
      </SummarySection>

      {/* Schritt 10: Absetzbare Beträge */}
      <SummarySection title="Absetzbare Beträge" step={9} setStep={setStep}>
        <Row
          label="Eingetragen"
          value={
            ((formData.hzlAbsetzbar as { personName: string; items: unknown[] }[]) ?? []).some(
              (pa) => pa.items.length > 0
            )
              ? "Ja"
              : "Keine"
          }
        />
      </SummarySection>

      {/* Schritt 11: Vermögen */}
      <SummarySection title="Vermögen" step={10} setStep={setStep}>
        {vermoegen.length === 0 ? (
          <Row label="Vermögen" value="Keine Angaben" />
        ) : (
          vermoegen.map((pv, i) => (
            <Row
              key={i}
              label={i === 0 ? `${pv.personName} (Antragst.)` : pv.personName}
              value={pv.items.length === 0 ? "Kein Vermögen" : pv.items.map((it) => it.art).join(", ")}
            />
          ))
        )}
      </SummarySection>

      {/* Schritt 12: Wohnkosten */}
      <SummarySection title="Wohnkosten" step={11} setStep={setStep}>
        <Row label="Kaltmiete" value={formData.hzlKaltmiete ? `${formData.hzlKaltmiete} €` : undefined} />
        <Row label="Nebenkosten" value={formData.hzlNebenkosten ? `${formData.hzlNebenkosten} €` : undefined} />
        <Row label="Vermieter" value={formData.hzlVermieterName as string} />
      </SummarySection>

      {/* Schritt 13: Mögliche Ansprüche */}
      <SummarySection title="Mögliche Ansprüche" step={12} setStep={setStep}>
        <Row
          label="Ansprüche eingetragen"
          value={ansprueche.length === 0 ? "Keine" : `${ansprueche.length} Anspruch/Ansprüche`}
        />
      </SummarySection>

      {/* Schritt 15: Begründung & Bankverbindung */}
      <SummarySection title="Begründung & Bankverbindung" step={14} setStep={setStep}>
        <Row
          label="Begründung"
          value={
            (formData.antragBegruendung as string | undefined)?.slice(0, 80)
              ? `${(formData.antragBegruendung as string).slice(0, 80)}…`
              : undefined
          }
        />
        <Row label="IBAN" value={formData.hzlIban as string} />
        <Row label="Geldinstitut" value={formData.hzlBankInstitut as string} />
      </SummarySection>

      {/* Bescheide an Person */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-neutral-800">Bescheide sollen gesandt werden an</p>
        <Select
          label="Empfänger*in der Bescheide"
          required
          placeholder="Bitte wählen"
          options={allPersonNames}
          error={bescheidePersonError ?? undefined}
          value={bescheidePerson}
          onChange={(e) => { setBescheidePerson(e.target.value); setBescheidePersonError(null); }}
        />
      </div>

      <div className="bg-brand-soft border border-brand-border rounded-sm p-5 space-y-3 text-sm text-neutral-700">
        <p>
          Ich versichere hiermit, dass alle gemachten Angaben der Wahrheit entsprechen und vollständig sind.
          Ich verpflichte mich, alle Änderungen der persönlichen und wirtschaftlichen Verhältnisse
          (Familien-, Wohn-, Einkommens-, Vermögens- und Aufenthaltsverhältnisse) unverzüglich und
          unaufgefordert dem Sozialamt Borken mitzuteilen.
        </p>
        <p>
          Mir ist bekannt, dass zu Unrecht erbrachte Leistungen nach § 50 SGB X zu erstatten sind und
          ggf. eine Ordnungswidrigkeit bzw. Straftat nach § 263 StGB vorliegt.
        </p>
        <p>
          Ich bin damit einverstanden, dass zur Feststellung meiner Bedürftigkeit und zur Berechnung der
          Leistungen die notwendigen Auskünfte bei Behörden, Versicherungsträgern und sonstigen Stellen
          eingeholt werden können.
        </p>
      </div>

      {/* Unterschriften aller Haushaltspersonen */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Datum und Unterschrift
        </legend>
        <p className="text-xs text-neutral-500">
          Bitte unterschreiben Sie mit der Maus oder per Touch im jeweiligen Feld.
          Alle volljährigen Haushaltsmitglieder müssen unterschreiben.
        </p>
        <p className="text-xs text-neutral-500">
          Ort und Datum: Borken, {new Date().toLocaleDateString("de-DE")}
        </p>
        {allPersonNames.map((name, i) => (
          <div key={i} className="space-y-1">
            <p className="text-sm font-medium text-neutral-800">
              {name}
              {i === 0 && <span className="text-xs text-neutral-400 font-normal ml-2">(Antragsteller*in)</span>}
            </p>
            <SignaturePad
              label=""
              onChange={(dataUrl) => setSig(name, dataUrl)}
            />
          </div>
        ))}
      </fieldset>

      {validationError && (
        <div className="bg-red-50 border border-red-200 rounded-sm p-4 text-sm text-red-700">
          <strong>Pflichtfeld fehlt:</strong> {validationError}
        </div>
      )}

      <div className="space-y-3">
        <Checkbox
          label="Ich bestätige die Richtigkeit und Vollständigkeit meiner Angaben und erkläre mich mit den obigen Bedingungen einverstanden. *"
          checked={richtigkeit ?? false}
          onChange={(e) => setValue("hzlRichtigkeit", e.target.checked as true)}
          error={errors.hzlRichtigkeit?.message}
        />
        <Checkbox
          label="Ich habe den Datenschutzhinweis zur Kenntnis genommen. Die Verarbeitung meiner Daten erfolgt nach Art. 6 Abs. 1 lit. c) und e) DSGVO i.V.m. §§ 67–78 SGB X. *"
          checked={datenschutz ?? false}
          onChange={(e) => setValue("hzlDatenschutz", e.target.checked as true)}
          error={errors.hzlDatenschutz?.message}
        />
      </div>
    </FormStep>
  );
}
