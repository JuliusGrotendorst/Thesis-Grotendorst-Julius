"use client";

import { useState } from "react";
import { z } from "zod";
import { hzlHaushaltPersonSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import InfoBox from "@/components/ui/InfoBox";
import FileUpload from "@/components/ui/FileUpload";
import { HZL_EINKOMMENSARTEN } from "@/lib/constants";

type HaushaltPerson = z.infer<typeof hzlHaushaltPersonSchema>;

interface EinkommensItem {
  art: string;
  betrag: string;
}

interface PersonEinkommen {
  personName: string;
  items: EinkommensItem[];
  keinEinkommen?: boolean;
}

function PersonBlock({
  entry,
  label,
  onUpdate,
  fileRefs,
  onFileSelect,
  onFileRemove,
  fileErrors,
  clearFileError,
}: {
  entry: PersonEinkommen;
  label: string;
  onUpdate: (e: PersonEinkommen) => void;
  fileRefs: { field: string; name: string }[];
  onFileSelect: (field: string, name: string, size: number, type: string, base64: string, file: File) => void;
  onFileRemove: (field: string) => void;
  fileErrors: Record<string, string>;
  clearFileError: (field: string) => void;
}) {
  const toggle = (art: string) => {
    const exists = entry.items.find((i) => i.art === art);
    onUpdate({
      ...entry,
      keinEinkommen: false,
      items: exists
        ? entry.items.filter((i) => i.art !== art)
        : [...entry.items, { art, betrag: "" }],
    });
  };

  const setAmount = (art: string, betrag: string) =>
    onUpdate({ ...entry, items: entry.items.map((i) => (i.art === art ? { ...i, betrag } : i)) });

  const toggleKeinEinkommen = () =>
    onUpdate({ ...entry, keinEinkommen: !entry.keinEinkommen, items: [] });

  return (
    <fieldset className="border border-neutral-200 rounded-sm p-5 space-y-4">
      <legend className="text-sm font-semibold text-neutral-800 px-1">{label}</legend>

      <button
        type="button"
        onClick={toggleKeinEinkommen}
        className={`text-sm px-3 py-1.5 rounded-sm border transition-colors font-medium
          ${entry.keinEinkommen
            ? "bg-red-600 text-white border-red-600"
            : "border-neutral-300 text-neutral-700 hover:border-neutral-500"}`}
      >
        Kein Einkommen
      </button>

      {!entry.keinEinkommen && (
        <>
          <div className="space-y-2">
            <p className="text-sm font-medium text-neutral-700">Einkommensarten (Mehrfachauswahl möglich)</p>
            <div className="grid grid-cols-1 gap-1.5">
              {HZL_EINKOMMENSARTEN.map((art) => {
                const selected = entry.items.some((i) => i.art === art);
                return (
                  <label
                    key={art}
                    className={`flex items-center gap-2.5 p-2.5 border rounded-sm cursor-pointer transition-colors text-sm
                      ${selected ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"}`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggle(art)}
                      className="accent-brand-accent w-4 h-4 flex-shrink-0"
                    />
                    <span className="font-medium">{art}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {entry.items.map((item) => (
            <div key={item.art} className="border border-neutral-100 rounded-sm p-4 bg-neutral-50 space-y-2">
              <p className="text-sm font-semibold text-neutral-800">{item.art}</p>
              <Input
                label="Betrag (€/Monat)"
                optional
                placeholder="0,00"
                inputMode="decimal"
                numericOnly="currency"
                value={item.betrag}
                onChange={(e) => setAmount(item.art, e.target.value)}
              />
              <p className="text-xs text-neutral-500">Einkommensnachweise müssen für die letzten 6 Monate erbracht werden.</p>
              <FileUpload
                label="Nachweis hochladen (letzte 6 Monate)"
                fieldName={`hzl_ek_nachweis_${entry.personName.replace(/\s+/g,"_")}_${item.art.replace(/\s+/g,"_")}`}
                hint="Einkommensnachweis für die letzten 6 Monate · PDF, JPG oder PNG · max. 10 MB"
                required
                currentFileName={fileRefs.find((f) => f.field === `hzl_ek_nachweis_${entry.personName.replace(/\s+/g,"_")}_${item.art.replace(/\s+/g,"_")}`)?.name}
                error={fileErrors[`hzl_ek_nachweis_${entry.personName.replace(/\s+/g,"_")}_${item.art.replace(/\s+/g,"_")}`]}
                onFileSelect={(file, field, base64) => {
                  onFileSelect(field, file.name, file.size, file.type, base64, file);
                  clearFileError(field);
                }}
                onFileRemove={onFileRemove}
              />
            </div>
          ))}
        </>
      )}

      {entry.keinEinkommen && (
        <p className="text-sm text-neutral-500 italic">Diese Person hat kein Einkommen.</p>
      )}
    </fieldset>
  );
}

export default function StepHzL08Einkommen() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const mainName =
    `${(formData.vorname as string) ?? ""} ${(formData.nachname as string) ?? ""}`.trim() ||
    "Antragsteller*in";
  const hhPersonen = (formData.hzlHaushaltPersonen as HaushaltPerson[] | undefined) ?? [];
  const allNames   = [mainName, ...hhPersonen.map((p) => `${p.vorname} ${p.nachname}`.trim())];

  const saved    = (formData.hzlEinkommen as PersonEinkommen[] | undefined) ?? [];
  const initData = () =>
    allNames.map((name) => saved.find((s) => s.personName === name) ?? { personName: name, items: [] });

  const [data, setData] = useState<PersonEinkommen[]>(initData);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [personErrors, setPersonErrors] = useState<Record<number, string>>({});

  const clearFileError = (field: string) =>
    setFileErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });

  const onNext = () => {
    const errs: Record<string, string> = {};
    const pErrs: Record<number, string> = {};
    data.forEach((person, idx) => {
      // Pflicht: entweder "Kein Einkommen" oder mindestens eine Einkommensart
      if (!person.keinEinkommen && person.items.length === 0) {
        pErrs[idx] = 'Bitte mindestens eine Einkommensart wählen oder „Kein Einkommen" auswählen.';
      }
      if (!person.keinEinkommen) {
        person.items.forEach((item) => {
          const field = `hzl_ek_nachweis_${person.personName.replace(/\s+/g, "_")}_${item.art.replace(/\s+/g, "_")}`;
          if (!fileRefs.find((f) => f.field === field))
            errs[field] = `Nachweis für „${item.art}" fehlt.`;
        });
      }
    });
    if (Object.keys(errs).length > 0 || Object.keys(pErrs).length > 0) {
      setFileErrors(errs);
      setPersonErrors(pErrs);
      return;
    }
    updateFormData({ hzlEinkommen: data });
    nextStep();
  };

  return (
    <FormStep
      title="Einkommen"
      subtitle="Geben Sie alle Einkommensarten aller Haushaltsmitglieder an."
      onNext={onNext}
      onBack={prevStep}
    >
      <InfoBox>
        Kreuzen Sie alle Einkommensarten an, die auf die jeweilige Person zutreffen, und geben Sie den monatlichen Betrag an.
        Wählen Sie nichts an, wenn eine Person kein Einkommen hat.
      </InfoBox>

      {data.map((entry, idx) => (
        <div key={idx} className="space-y-2">
          <PersonBlock
            entry={entry}
            label={idx === 0 ? `${entry.personName} (Antragsteller*in)` : entry.personName}
            onUpdate={(updated) => {
              const newData = [...data];
              newData[idx]  = updated;
              setData(newData);
              setPersonErrors((prev) => { const n = { ...prev }; delete n[idx]; return n; });
            }}
            fileRefs={fileRefs}
            onFileSelect={(field, name, size, type, base64, file) => addFile({ field, name, size, type, base64, file })}
            onFileRemove={removeFile}
            fileErrors={fileErrors}
            clearFileError={clearFileError}
          />
          {personErrors[idx] && (
            <p role="alert" className="field-error">{personErrors[idx]}</p>
          )}
        </div>
      ))}
    </FormStep>
  );
}
