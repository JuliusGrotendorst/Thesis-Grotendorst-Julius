"use client";

import { useState } from "react";
import { z } from "zod";
import { hzlHaushaltPersonSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import { HZL_ABSETZBARE_BETRAEGE } from "@/lib/constants";

type HaushaltPerson = z.infer<typeof hzlHaushaltPersonSchema>;

interface AbsetzbarItem {
  art: string;
  betrag: string;
  begruendung: string;
}

interface PersonAbsetzbar {
  personName: string;
  items: AbsetzbarItem[];
}

// Feldname für den Datei-Upload je Person + absetzbare Position. Identisches
// Schema wie Einkommens-Nachweise (hzl_ek_nachweis_…), damit alle HzL-Belege
// gleichartig im fileRefs-Array adressiert werden.
const absetzbarFieldName = (personName: string, art: string) =>
  `hzl_absetzbar_nachweis_${personName.replace(/\s+/g, "_")}_${art.replace(/\s+/g, "_")}`;

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
  entry: PersonAbsetzbar;
  label: string;
  onUpdate: (e: PersonAbsetzbar) => void;
  fileRefs: { field: string; name: string }[];
  onFileSelect: (field: string, name: string, size: number, type: string, base64: string, file: File) => void;
  onFileRemove: (field: string) => void;
  fileErrors: Record<string, string>;
  clearFileError: (field: string) => void;
}) {
  const needsBegruendung = (art: string) =>
    art.startsWith("Fahrtkosten zur Arbeitsstelle") || art === "Sonstige absetzbare Beträge";

  const toggle = (art: string) => {
    const exists = entry.items.find((i) => i.art === art);
    if (exists) onFileRemove(absetzbarFieldName(entry.personName, art));
    onUpdate({
      ...entry,
      items: exists
        ? entry.items.filter((i) => i.art !== art)
        : [...entry.items, { art, betrag: "", begruendung: "" }],
    });
  };

  const setAmount = (art: string, betrag: string) =>
    onUpdate({ ...entry, items: entry.items.map((i) => (i.art === art ? { ...i, betrag } : i)) });

  const setBegruendung = (art: string, begruendung: string) =>
    onUpdate({ ...entry, items: entry.items.map((i) => (i.art === art ? { ...i, begruendung } : i)) });

  return (
    <fieldset className="border border-neutral-200 rounded-sm p-5 space-y-4">
      <legend className="text-sm font-semibold text-neutral-800 px-1">{label}</legend>

      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-700">Absetzbare Beträge (Mehrfachauswahl möglich)</p>
        <div className="grid grid-cols-1 gap-1.5">
          {HZL_ABSETZBARE_BETRAEGE.map((art) => {
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

      {entry.items.map((item) => {
        const field = absetzbarFieldName(entry.personName, item.art);
        const ref = fileRefs.find((f) => f.field === field);
        return (
          <div key={item.art} className="border border-neutral-100 rounded-sm p-4 bg-neutral-50 space-y-3">
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
            {needsBegruendung(item.art) && (
              <Input
                label="Begründung"
                required
                placeholder="z. B. Entfernung zur Arbeitsstelle, kein ÖPNV verfügbar"
                value={item.begruendung ?? ""}
                onChange={(e) => setBegruendung(item.art, e.target.value)}
              />
            )}
            <FileUpload
              label="Nachweis hochladen"
              fieldName={field}
              required
              hint="Versicherungspolice, Beitragsbescheinigung, Quittung o. ä. · PDF, JPG oder PNG · max. 10 MB"
              currentFileName={ref?.name}
              error={fileErrors[field]}
              onFileSelect={(file, f, base64) => {
                onFileSelect(f, file.name, file.size, file.type, base64, file);
                clearFileError(f);
              }}
              onFileRemove={onFileRemove}
            />
          </div>
        );
      })}
    </fieldset>
  );
}

export default function StepHzL09Absetzbar() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const mainName =
    `${(formData.vorname as string) ?? ""} ${(formData.nachname as string) ?? ""}`.trim() ||
    "Antragsteller*in";
  const hhPersonen = (formData.hzlHaushaltPersonen as HaushaltPerson[] | undefined) ?? [];
  const allNames   = [mainName, ...hhPersonen.map((p) => `${p.vorname} ${p.nachname}`.trim())];

  const saved    = (formData.hzlAbsetzbar as PersonAbsetzbar[] | undefined) ?? [];
  const initData = () =>
    allNames.map((name) => saved.find((s) => s.personName === name) ?? { personName: name, items: [] });

  const [data, setData] = useState<PersonAbsetzbar[]>(initData);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const clearFileError = (field: string) =>
    setFileErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });

  const onNext = () => {
    const errs: Record<string, string> = {};
    data.forEach((person) => {
      person.items.forEach((item) => {
        const field = absetzbarFieldName(person.personName, item.art);
        if (!fileRefs.find((f) => f.field === field))
          errs[field] = `Nachweis für „${item.art}" fehlt.`;
      });
    });
    if (Object.keys(errs).length > 0) {
      setFileErrors(errs);
      return;
    }
    updateFormData({ hzlAbsetzbar: data });
    nextStep();
  };

  return (
    <FormStep
      title="Absetzbare Beträge"
      subtitle="Geben Sie alle absetzbaren Beträge aller Haushaltsmitglieder an (z. B. Versicherungsbeiträge, Fahrtkosten)."
      onNext={onNext}
      onBack={prevStep}
    >

      {data.map((entry, idx) => (
        <PersonBlock
          key={idx}
          entry={entry}
          label={idx === 0 ? `${entry.personName} (Antragsteller*in)` : entry.personName}
          onUpdate={(updated) => {
            const newData = [...data];
            newData[idx]  = updated;
            setData(newData);
          }}
          fileRefs={fileRefs}
          onFileSelect={(field, name, size, type, base64, file) =>
            addFile({ field, name, size, type, base64, file })
          }
          onFileRemove={removeFile}
          fileErrors={fileErrors}
          clearFileError={clearFileError}
        />
      ))}
    </FormStep>
  );
}
