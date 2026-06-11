"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { einkommenWbSchema } from "@/lib/schemas/antragSchema";
import { useFormStore, FileRef } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import RadioGroup from "@/components/ui/RadioGroup";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import { EINKOMMENSARTEN_OPTIONS, EINKOMMENSARTEN_DOCS } from "@/lib/constants";

type FormValues = z.infer<typeof einkommenWbSchema>;

interface PersonEinkommen {
  name: string;
  einkommensarten: { art: string; betrag: string; haeufigkeit: "monatlich" | "einmalig" }[];
  keinEinkommen?: boolean;
}

// ── Einkommens-Block pro Person ───────────────────────────────────────────
function PersonBlock({
  person,
  idx,
  onUpdate,
  onRemove,
  fileRefs,
  addFile,
  removeFile,
  removable,
  fileErrors,
  clearFileError,
}: {
  person: PersonEinkommen;
  idx: number;
  onUpdate: (p: PersonEinkommen) => void;
  onRemove: () => void;
  fileRefs: FileRef[];
  addFile: (ref: FileRef) => void;
  removeFile: (field: string) => void;
  removable: boolean;
  fileErrors: Record<string, string>;
  clearFileError: (field: string) => void;
}) {
  const toggleArt = (art: string) => {
    const exists = person.einkommensarten.find((e) => e.art === art);
    onUpdate({
      ...person,
      keinEinkommen: false,
      einkommensarten: exists
        ? person.einkommensarten.filter((e) => e.art !== art)
        : [...person.einkommensarten, { art, betrag: "", haeufigkeit: "monatlich" }],
    });
  };

  return (
    <div className="border border-neutral-200 rounded-sm p-5 space-y-4">
      <div className="flex justify-between items-center">
        <Input
          label={idx === 0 ? "Name (Antragsteller*in)" : `Name (Person ${idx + 1})`}
          required
          placeholder="Vor- und Nachname"
          value={person.name}
          onChange={(e) => onUpdate({ ...person, name: e.target.value })}
        />
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-4 mt-5 text-sm text-brand-danger hover:underline self-end"
          >
            Entfernen ×
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => onUpdate({ ...person, keinEinkommen: !person.keinEinkommen, einkommensarten: [] })}
        className={`text-sm px-3 py-1.5 rounded-sm border transition-colors font-medium
          ${person.keinEinkommen
            ? "bg-red-600 text-white border-red-600"
            : "border-neutral-300 text-neutral-700 hover:border-neutral-500"}`}
      >
        Kein Einkommen
      </button>

      {person.keinEinkommen ? (
        <p className="text-sm text-neutral-500 italic">Diese Person hat kein Einkommen.</p>
      ) : (
      <>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-neutral-800">Einkommensarten (Mehrfachauswahl)</p>
        <div className="grid grid-cols-2 gap-2">
          {EINKOMMENSARTEN_OPTIONS.map((art) => {
            const selected = person.einkommensarten.some((e) => e.art === art);
            return (
              <label
                key={art}
                className={`flex items-center gap-2.5 p-3 border rounded-sm cursor-pointer transition-colors
                  ${selected ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"}`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleArt(art)}
                  className="accent-brand-accent w-4 h-4"
                />
                <span className="text-sm font-medium">{art}</span>
              </label>
            );
          })}
        </div>
      </div>

      {person.einkommensarten.map((item, eIdx) => {
        const field = `ek_p${idx}_${eIdx}`;
        const ref = fileRefs.find((f: FileRef) => f.field === field);
        const docHint = EINKOMMENSARTEN_DOCS[item.art] ?? "Nachweis hochladen";
        return (
          <div key={item.art} className="border border-neutral-100 rounded-sm p-4 space-y-3 bg-neutral-50">
            <p className="font-semibold text-sm text-neutral-800">{item.art}</p>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Betrag (€)"
                placeholder="0,00"
                inputMode="decimal"
                numericOnly="currency"
                value={item.betrag}
                onChange={(evt) =>
                  onUpdate({
                    ...person,
                    einkommensarten: person.einkommensarten.map((en) =>
                      en.art === item.art ? { ...en, betrag: evt.target.value } : en
                    ),
                  })
                }
              />
              <Select
                label="Häufigkeit"
                options={[
                  { value: "monatlich", label: "Monatlich" },
                  { value: "einmalig", label: "Einmalig" },
                ]}
                value={item.haeufigkeit}
                onChange={(e) =>
                  onUpdate({
                    ...person,
                    einkommensarten: person.einkommensarten.map((en) =>
                      en.art === item.art
                        ? { ...en, haeufigkeit: (e as unknown as React.ChangeEvent<HTMLSelectElement>).target.value as "monatlich" | "einmalig" }
                        : en
                    ),
                  })
                }
              />
            </div>
            <FileUpload
              label="Nachweis hochladen"
              fieldName={field}
              required
              hint={docHint}
              currentFileName={ref?.name}
              error={fileErrors[field]}
              onFileSelect={(file, f, base64) => {
                addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
                clearFileError(f);
              }}
              onFileRemove={removeFile}
            />
          </div>
        );
      })}
      </>
      )}
    </div>
  );
}

// ── Hauptkomponente ───────────────────────────────────────────────────────
export default function Step06Einkommen() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const savedPersonen = (formData.einkommenPersonen as PersonEinkommen[] | undefined) ?? [];
  const [personen, setPersonen] = useState<PersonEinkommen[]>(
    savedPersonen.length > 0
      ? savedPersonen
      : [{ name: ((formData.vorname as string) ?? "") + " " + ((formData.nachname as string) ?? ""), einkommensarten: [] }]
  );

  const { watch, setValue, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(einkommenWbSchema),
    defaultValues: {
      einkommenAenderung: formData.einkommenAenderung as "keine" | "aenderung" | undefined,
    },
  });

  const einkommenAenderung = watch("einkommenAenderung");
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [keinEinkommenKeine, setKeinEinkommenKeine] = useState<boolean>(
    (formData.hatKeinEinkommen as boolean) ?? false
  );

  const nachweiseRef = fileRefs.find((f) => f.field === "ek_nachweise_keine_aenderung");

  const clearFileError = (field: string) =>
    setFileErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });

  const onNext = handleSubmit((data) => {
    const errs: Record<string, string> = {};
    if (data.einkommenAenderung === "keine" && !keinEinkommenKeine && !nachweiseRef)
      errs["ek_nachweise_keine_aenderung"] = "Bitte laden Sie die Einkommensnachweise hoch.";
    if (data.einkommenAenderung === "aenderung") {
      personen.forEach((person, idx) => {
        if (!person.keinEinkommen) {
          person.einkommensarten.forEach((item, eIdx) => {
            const field = `ek_p${idx}_${eIdx}`;
            if (!fileRefs.find((f) => f.field === field))
              errs[field] = `Nachweis für „${item.art}" fehlt.`;
          });
        }
      });
    }
    setFileErrors(errs);
    if (Object.keys(errs).length > 0) return;
    updateFormData({ ...data, einkommenPersonen: personen, hatKeinEinkommen: keinEinkommenKeine });
    nextStep();
  });

  const updatePerson = (idx: number, p: PersonEinkommen) => {
    const updated = [...personen];
    updated[idx] = p;
    setPersonen(updated);
  };

  return (
    <FormStep
      title="Einkommen"
      subtitle="Teilen Sie uns mit, ob sich das Einkommen geändert hat, und reichen Sie die Nachweise ein."
      onNext={onNext}
      onBack={prevStep}
    >
      <RadioGroup
        name="einkommenAenderung"
        legend="Hat sich das Einkommen geändert?"
        required
        value={einkommenAenderung ?? ""}
        onChange={(v) =>
          setValue("einkommenAenderung", v as "keine" | "aenderung", { shouldValidate: true })
        }
        error={errors.einkommenAenderung?.message}
        options={[
          { value: "keine", label: "Keine Änderung" },
          { value: "aenderung", label: "Änderung vorhanden" },
        ]}
      />

      {/* Keine Änderung → einfaches Upload-Feld */}
      {einkommenAenderung === "keine" && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setKeinEinkommenKeine((v) => !v)}
            className={`text-sm px-3 py-1.5 rounded-sm border transition-colors font-medium
              ${keinEinkommenKeine
                ? "bg-red-600 text-white border-red-600"
                : "border-neutral-300 text-neutral-700 hover:border-neutral-500"}`}
          >
            Kein Einkommen
          </button>

          {keinEinkommenKeine ? (
            <p className="text-sm text-neutral-500 italic">Sie haben kein Einkommen – kein Nachweis erforderlich.</p>
          ) : (
            <FileUpload
              label="Einkommensnachweise hochladen"
              fieldName="ek_nachweise_keine_aenderung"
              required
              hint="Alle aktuellen Nachweise: Rentenbescheid, Lohnzettel, Bescheide etc."
              currentFileName={nachweiseRef?.name}
              error={fileErrors["ek_nachweise_keine_aenderung"]}
              onFileSelect={(file, f, base64) => {
                addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
                clearFileError(f);
              }}
              onFileRemove={removeFile}
            />
          )}
        </div>
      )}

      {/* Änderung vorhanden → pro Person: Name + Einkommensarten */}
      {einkommenAenderung === "aenderung" && (
        <div className="space-y-4">

          {personen.map((person, idx) => (
            <PersonBlock
              key={idx}
              person={person}
              idx={idx}
              onUpdate={(p) => updatePerson(idx, p)}
              onRemove={() => setPersonen(personen.filter((_, i) => i !== idx))}
              fileRefs={fileRefs}
              addFile={addFile}
              removeFile={removeFile}
              removable={idx > 0}
              fileErrors={fileErrors}
              clearFileError={clearFileError}
            />
          ))}

          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setPersonen([...personen, { name: "", einkommensarten: [] }])
            }
            className="w-full justify-center"
          >
            + Weitere Person hinzufügen
          </Button>
        </div>
      )}
    </FormStep>
  );
}
