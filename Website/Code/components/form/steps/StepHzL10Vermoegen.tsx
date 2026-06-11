"use client";

import { useState } from "react";
import { z } from "zod";
import { hzlHaushaltPersonSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import RadioGroup from "@/components/ui/RadioGroup";
import FileUpload from "@/components/ui/FileUpload";
import { HZL_VERMOEGEN_ARTEN } from "@/lib/constants";

type HaushaltPerson = z.infer<typeof hzlHaushaltPersonSchema>;

interface VermoegenItem {
  art: string;
  betrag: string;
  beschreibung: string;
}

interface PersonVermoegen {
  personName: string;
  items: VermoegenItem[];
}

interface VermoegenUebertragung {
  uebertragen: string;
  uebertragen10Jahre: string;
  datum: string;
  art: string;
  wert: string;
  empfaengerName: string;
  empfaengerAnschrift: string;
}

function PersonBlock({
  entry,
  label,
  onUpdate,
}: {
  entry: PersonVermoegen;
  label: string;
  onUpdate: (e: PersonVermoegen) => void;
}) {
  const toggle = (art: string) => {
    const exists = entry.items.find((i) => i.art === art);
    onUpdate({
      ...entry,
      items: exists
        ? entry.items.filter((i) => i.art !== art)
        : [...entry.items, { art, betrag: "", beschreibung: "" }],
    });
  };

  const setField = (art: string, field: "betrag" | "beschreibung", value: string) =>
    onUpdate({
      ...entry,
      items: entry.items.map((i) => (i.art === art ? { ...i, [field]: value } : i)),
    });

  return (
    <fieldset className="border border-neutral-200 rounded-sm p-5 space-y-4">
      <legend className="text-sm font-semibold text-neutral-800 px-1">{label}</legend>

      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-700">Vermögensarten (Mehrfachauswahl möglich)</p>
        <div className="grid grid-cols-1 gap-1.5">
          {HZL_VERMOEGEN_ARTEN.map((art) => {
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
        <div key={item.art} className="border border-neutral-100 rounded-sm p-4 bg-neutral-50 space-y-3">
          <p className="text-sm font-semibold text-neutral-800">{item.art}</p>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Wert / Betrag (€)"
              optional
              placeholder="0,00"
              inputMode="decimal"
              numericOnly="currency"
              value={item.betrag}
              onChange={(e) => setField(item.art, "betrag", e.target.value)}
            />
            <Input
              label="Nähere Beschreibung"
              optional
              value={item.beschreibung}
              onChange={(e) => setField(item.art, "beschreibung", e.target.value)}
            />
          </div>
        </div>
      ))}
    </fieldset>
  );
}

export default function StepHzL10Vermoegen() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const mainName =
    `${(formData.vorname as string) ?? ""} ${(formData.nachname as string) ?? ""}`.trim() ||
    "Antragsteller*in";
  const hhPersonen = (formData.hzlHaushaltPersonen as HaushaltPerson[] | undefined) ?? [];
  const allNames   = [mainName, ...hhPersonen.map((p) => `${p.vorname} ${p.nachname}`.trim())];

  const saved    = (formData.hzlVermoegen as PersonVermoegen[] | undefined) ?? [];
  const initData = () =>
    allNames.map((name) => saved.find((s) => s.personName === name) ?? { personName: name, items: [] });

  const [data, setData] = useState<PersonVermoegen[]>(initData);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const savedUebertragung = (formData.hzlVermoegenUebertragung as VermoegenUebertragung | undefined);
  const [uebertragung, setUebertragung] = useState<VermoegenUebertragung>(
    savedUebertragung ?? {
      uebertragen: "",
      uebertragen10Jahre: "",
      datum: "",
      art: "",
      wert: "",
      empfaengerName: "",
      empfaengerAnschrift: "",
    }
  );

  const onNext = () => {
    const errs: Record<string, string> = {};
    if (!fileRefs.find((f) => f.field === "hzl_kontoauszuege"))
      errs["hzl_kontoauszuege"] = "Bitte laden Sie die Kontoauszüge der letzten drei Monate hoch.";
    if (Object.keys(errs).length > 0) {
      setFileErrors(errs);
      return;
    }
    updateFormData({ hzlVermoegen: data, hzlVermoegenUebertragung: uebertragung });
    nextStep();
  };

  return (
    <FormStep
      title="Vermögen"
      subtitle="Geben Sie das Vermögen aller Haushaltsmitglieder an."
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
        />
      ))}

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Kontonachweise
        </legend>
        <FileUpload
          label="Kontoauszüge (letzte 3 Monate)"
          fieldName="hzl_kontoauszuege"
          hint="Alle Konten aller Haushaltsmitglieder · PDF, JPG oder PNG · max. 10 MB"
          required
          currentFileName={fileRefs.find((f) => f.field === "hzl_kontoauszuege")?.name}
          error={fileErrors["hzl_kontoauszuege"]}
          onFileSelect={(file, field, base64) => {
            addFile({ field, name: file.name, size: file.size, type: file.type, base64, file });
            setFileErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
          }}
          onFileRemove={removeFile}
        />
      </fieldset>

      <fieldset className="border border-neutral-200 rounded-sm p-5 space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 px-1">Vermögensübertragungen</legend>
        <RadioGroup
          name="hzlVermoegenUebertragen"
          legend="Haben Sie oder ein Haushaltsmitglied in den letzten 10 Jahren Vermögen übertragen oder verschenkt?"
          layout="horizontal"
          value={uebertragung.uebertragen}
          onChange={(v) => setUebertragung({ ...uebertragung, uebertragen: v })}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />

        {uebertragung.uebertragen === "nein" && (
          <RadioGroup
            name="hzlVermoegenUebertragen10Jahre"
            legend="Hat eine Übertragung vor mehr als 10 Jahren stattgefunden?"
            layout="horizontal"
            value={uebertragung.uebertragen10Jahre}
            onChange={(v) => setUebertragung({ ...uebertragung, uebertragen10Jahre: v })}
            options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
          />
        )}

        {uebertragung.uebertragen === "ja" && (
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-brand-accent/30 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <DateInput
                  label="Datum der Übertragung"
                  optional
                  value={uebertragung.datum}
                  onChange={(e) => setUebertragung({ ...uebertragung, datum: e.target.value })}
                />
                <Input
                  label="Art des übertragenen Vermögens"
                  optional
                  value={uebertragung.art}
                  onChange={(e) => setUebertragung({ ...uebertragung, art: e.target.value })}
                />
              </div>
              <Input
                label="Wert (€)"
                optional
                inputMode="decimal"
                numericOnly="currency"
                value={uebertragung.wert}
                onChange={(e) => setUebertragung({ ...uebertragung, wert: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Name des Empfängers / der Empfängerin"
                  optional
                  value={uebertragung.empfaengerName}
                  onChange={(e) => setUebertragung({ ...uebertragung, empfaengerName: e.target.value })}
                />
                <Input
                  label="Anschrift des Empfängers / der Empfängerin"
                  optional
                  value={uebertragung.empfaengerAnschrift}
                  onChange={(e) => setUebertragung({ ...uebertragung, empfaengerAnschrift: e.target.value })}
                />
              </div>
              <FileUpload
                label="Gesonderte Aufstellung / Nachweis (optional)"
                fieldName="hzl_vermoegen_uebertragung"
                optional
                currentFileName={fileRefs.find((f) => f.field === "hzl_vermoegen_uebertragung")?.name}
                onFileSelect={(file, field, base64) =>
                  addFile({ field, name: file.name, size: file.size, type: file.type, base64, file })
                }
                onFileRemove={removeFile}
              />
            </div>
          </div>
        )}
      </fieldset>
    </FormStep>
  );
}
