"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { betreuungSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import RadioGroup from "@/components/ui/RadioGroup";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";

type FormValues = z.infer<typeof betreuungSchema>;

export default function Step04Betreuung() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(betreuungSchema),
    defaultValues: {
      hatBetreuung: formData.hatBetreuung as FormValues["hatBetreuung"],
      betreuungVorname: (formData.betreuungVorname as string) ?? "",
      betreuungNachname: (formData.betreuungNachname as string) ?? "",
      betreuungTelefon: (formData.betreuungTelefon as string) ?? "",
      betreuungEmail: (formData.betreuungEmail as string) ?? "",
      betreuungArt: formData.betreuungArt as "betreuung" | "vollmacht" | "vormund" | undefined,
    },
  });

  const hatBetreuung = watch("hatBetreuung");
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const onNext = handleSubmit((data) => {
    const errs: Record<string, string> = {};
    if (data.hatBetreuung === "ja" && !fileRefs.find((f) => f.field === "betreuung_vollmacht")) {
      errs["betreuung_vollmacht"] = "Bitte laden Sie den Betreuerausweis oder die Vollmacht hoch.";
    }
    setFileErrors(errs);
    if (Object.keys(errs).length > 0) return;
    updateFormData(data);
    nextStep();
  });

  const vollmachtRef = fileRefs.find((f) => f.field === "betreuung_vollmacht");

  return (
    <FormStep
      title="Betreuung und Bevollmächtigung"
      subtitle="Werden Sie rechtlich betreut oder durch eine bevollmächtigte Person vertreten?"
      onNext={onNext}
      onBack={prevStep}
    >
      <RadioGroup
        name="hatBetreuung"
        legend="Rechtliche Betreuung oder Vollmacht"
        required
        value={hatBetreuung ?? ""}
        onChange={(v) => setValue("hatBetreuung", v as "ja" | "nein", { shouldValidate: true })}
        error={errors.hatBetreuung?.message}
        layout="horizontal"
        options={[
          { value: "nein", label: "Nein" },
          { value: "ja", label: "Ja" },
        ]}
      />

      {hatBetreuung === "ja" && (
        <fieldset className="space-y-4 p-4 bg-brand-soft border border-brand-border rounded-sm">
          <legend className="text-sm font-semibold text-brand-text px-1">
            Angaben zur betreuenden / bevollmächtigten Person
          </legend>
          <RadioGroup
            name="betreuungArt"
            legend="Art der Vertretung"
            required
            layout="horizontal"
            value={watch("betreuungArt") ?? ""}
            onChange={(v) => setValue("betreuungArt", v as "betreuung" | "vollmacht" | "vormund", { shouldValidate: true })}
            error={errors.betreuungArt?.message}
            options={[
              { value: "betreuung", label: "Rechtliche Betreuung" },
              { value: "vollmacht", label: "Vollmacht" },
              { value: "vormund", label: "Vormund" },
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Vorname" required error={errors.betreuungVorname?.message} {...register("betreuungVorname")} />
            <Input label="Nachname" required error={errors.betreuungNachname?.message} {...register("betreuungNachname")} />
          </div>
          <Input label="Telefon" optional error={errors.betreuungTelefon?.message} {...register("betreuungTelefon")} />
          <Input label="E-Mail" optional type="email" error={errors.betreuungEmail?.message} {...register("betreuungEmail")} />

          <FileUpload
            label="Betreuerausweis oder Vollmacht"
            fieldName="betreuung_vollmacht"
            required
            hint="PDF, JPG oder PNG · max. 10 MB"
            currentFileName={vollmachtRef?.name}
            error={fileErrors["betreuung_vollmacht"]}
            onFileSelect={(file, field, base64) => {
              addFile({ field, name: file.name, size: file.size, type: file.type, base64, file });
              setFileErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
            }}
            onFileRemove={removeFile}
          />
        </fieldset>
      )}
    </FormStep>
  );
}
