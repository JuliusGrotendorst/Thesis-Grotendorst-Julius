"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { veraenderungenSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import FileUpload from "@/components/ui/FileUpload";

type FormValues = z.infer<typeof veraenderungenSchema>;

export default function Step08Veraenderungen() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(veraenderungenSchema),
    defaultValues: { veraenderungen: (formData.veraenderungen as string) ?? "" },
  });

  const onNext = handleSubmit((data) => {
    updateFormData(data);
    nextStep();
  });

  const belegRef = fileRefs.find((f) => f.field === "veraenderungen_belege");

  return (
    <FormStep
      title="Veränderte Verhältnisse"
      subtitle="Teilen Sie uns mit, falls sich seit dem letzten Bescheid etwas geändert hat."
      onNext={onNext}
      onBack={prevStep}
    >

      <div className="flex flex-col gap-1.5">
        <label htmlFor="veraenderungen" className="text-sm font-semibold text-neutral-800">
          Beschreibung der Änderungen{" "}
          <span className="text-neutral-400 font-normal text-xs">(optional)</span>
        </label>
        <textarea
          id="veraenderungen"
          rows={6}
          placeholder="Beschreiben Sie hier die Änderungen Ihrer persönlichen, wirtschaftlichen oder familiären Verhältnisse…"
          className="w-full px-3.5 py-3 text-base border border-neutral-400 rounded-sm bg-white text-neutral-800 font-sans resize-y
            focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-brand-accent/20"
          {...register("veraenderungen")}
        />
      </div>

      <FileUpload
        label="Belege hochladen"
        fieldName="veraenderungen_belege"
        hint="z. B. neuer Mietvertrag, Kündigung, Bescheid (optional)"
        currentFileName={belegRef?.name}
        onFileSelect={(file, f, base64) => addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })}
        onFileRemove={removeFile}
      />
    </FormStep>
  );
}
