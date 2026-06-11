"use client";

import { useState } from "react";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface SonderDokument {
  field: string;
  beschreibung: string;
}

export default function StepHzL14Dokumente() {
  const { nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const [slots, setSlots] = useState<SonderDokument[]>([
    { field: "hzl_sonder_dok_0", beschreibung: "" },
  ]);

  const updateBeschreibung = (idx: number, value: string) => {
    const updated = [...slots];
    updated[idx] = { ...updated[idx], beschreibung: value };
    setSlots(updated);
  };

  const addSlot = () => {
    setSlots([...slots, { field: `hzl_sonder_dok_${slots.length}`, beschreibung: "" }]);
  };

  const removeSlot = (idx: number) => {
    removeFile(slots[idx].field);
    setSlots(slots.filter((_, i) => i !== idx));
  };

  return (
    <FormStep
      title="Besondere Unterlagen"
      subtitle="Hier können Sie Dokumente hochladen, die in den vorherigen Schritten nicht abgefragt wurden."
      onNext={nextStep}
      onBack={prevStep}
    >

      <div className="space-y-4">
        {slots.map((slot, idx) => (
          <div key={slot.field} className="border border-neutral-200 rounded-sm p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-neutral-700">Unterlage {idx + 1}</p>
              {slots.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSlot(idx)}
                  className="text-sm text-brand-danger hover:underline"
                >
                  Entfernen ×
                </button>
              )}
            </div>
            <Input
              label="Kurze Beschreibung"
              optional
              placeholder="z. B. Schwerbehindertenausweis, Betreuungsurkunde …"
              value={slot.beschreibung}
              onChange={(e) => updateBeschreibung(idx, e.target.value)}
            />
            <FileUpload
              label="Datei hochladen"
              fieldName={slot.field}
              hint="PDF, JPG oder PNG · max. 10 MB"
              optional
              currentFileName={fileRefs.find((f) => f.field === slot.field)?.name}
              onFileSelect={(file, field, base64) =>
                addFile({ field, name: file.name, size: file.size, type: file.type, base64, file })
              }
              onFileRemove={removeFile}
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="secondary"
        onClick={addSlot}
        className="w-full justify-center"
      >
        + Weitere Unterlage hinzufügen
      </Button>
    </FormStep>
  );
}
