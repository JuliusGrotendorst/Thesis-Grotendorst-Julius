"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { hzlBegruendungSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";

type FormValues = z.infer<typeof hzlBegruendungSchema>;

export default function StepHzL13Begruendung() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const formatIban = (v: string) =>
    v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 22).replace(/(.{4})(?=.)/g, "$1 ");

  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(hzlBegruendungSchema),
    defaultValues: {
      antragBegruendung:   (formData.antragBegruendung as string) ?? "",
      sonstigeAnmerkungen: (formData.sonstigeAnmerkungen as string) ?? "",
      hzlIban:             (formData.hzlIban as string) ?? "",
      hzlBankInstitut:     (formData.hzlBankInstitut as string) ?? "",
    },
  });

  const onNext = handleSubmit((data) => {
    updateFormData(data);
    nextStep();
  });

  return (
    <FormStep
      title="Begründung und Bankverbindung"
      subtitle="Begründen Sie Ihren Antrag und geben Sie Ihre Bankverbindung für Auszahlungen an."
      onNext={onNext}
      onBack={prevStep}
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-neutral-800">
          Begründung des Antrags
          <span className="text-neutral-400 font-normal ml-1.5 text-xs">(optional)</span>
        </label>
        <textarea
          rows={5}
          className="form-input resize-none"
          placeholder="Bitte beschreiben Sie kurz, warum Sie den Antrag auf Hilfe zum Lebensunterhalt stellen (z. B. Einkommensausfall, besondere Lebensumstände)."
          {...register("antragBegruendung")}
        />
      </div>


      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Bankverbindung für Auszahlungen
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="IBAN"
            optional
            placeholder="DE00 0000 0000 0000 0000 00"
            value={watch("hzlIban") ?? ""}
            onChange={(e) => setValue("hzlIban", formatIban(e.target.value))}
          />
          <Input
            label="Geldinstitut"
            optional
            {...register("hzlBankInstitut")}
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-neutral-800">
          Sonstige Anmerkungen
          <span className="text-neutral-400 font-normal ml-1.5 text-xs">(optional)</span>
        </label>
        <textarea
          rows={4}
          className="form-input resize-none"
          placeholder="Weitere Hinweise, die für die Bearbeitung Ihres Antrags relevant sein könnten."
          {...register("sonstigeAnmerkungen")}
        />
      </div>
    </FormStep>
  );
}
