"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { haushaltSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { VERWANDTSCHAFT_OPTIONS } from "@/lib/constants";

type FormValues = z.infer<typeof haushaltSchema>;

const emptyPerson = { vorname: "", nachname: "", geburtsdatum: "", verwandtschaft: "" };

export default function Step05Haushalt() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(haushaltSchema),
    defaultValues: {
      haushaltPersonen: Array.isArray(formData.haushaltPersonen) && formData.haushaltPersonen.length
        ? (formData.haushaltPersonen as FormValues["haushaltPersonen"])
        : [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "haushaltPersonen" });

  const onNext = handleSubmit((data) => {
    updateFormData(data);
    nextStep();
  });

  return (
    <FormStep
      title="Weitere Personen im Haushalt"
      subtitle="Fügen Sie alle weiteren Personen hinzu, die mit Ihnen in einem Haushalt leben. Wenn Sie allein wohnen, klicken Sie einfach auf 'Weiter'."
      onNext={onNext}
      onBack={prevStep}
    >
      {fields.map((field, idx) => {
        return (
          <div key={field.id} className="border border-neutral-200 rounded-sm p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-neutral-900">Person {idx + 1}</h3>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-sm text-brand-danger hover:underline"
                aria-label={`Person ${idx + 1} entfernen`}
              >
                Entfernen ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Vorname"
                required
                error={(errors.haushaltPersonen?.[idx]?.vorname as { message?: string } | undefined)?.message}
                {...register(`haushaltPersonen.${idx}.vorname`)}
              />
              <Input
                label="Nachname"
                required
                error={(errors.haushaltPersonen?.[idx]?.nachname as { message?: string } | undefined)?.message}
                {...register(`haushaltPersonen.${idx}.nachname`)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DateInput
                label="Geburtsdatum"
                required
                error={(errors.haushaltPersonen?.[idx]?.geburtsdatum as { message?: string } | undefined)?.message}
                {...register(`haushaltPersonen.${idx}.geburtsdatum`)}
              />
              <Select
                label="Verwandtschaftsverhältnis"
                required
                placeholder="Bitte wählen"
                options={[...VERWANDTSCHAFT_OPTIONS]}
                error={(errors.haushaltPersonen?.[idx]?.verwandtschaft as { message?: string } | undefined)?.message}
                {...register(`haushaltPersonen.${idx}.verwandtschaft`)}
              />
            </div>
          </div>
        );
      })}

      <Button
        type="button"
        variant="secondary"
        onClick={() => append(emptyPerson)}
        className="w-full justify-center"
      >
        + Person hinzufügen
      </Button>

      {fields.length === 0 && (
        <p className="text-sm text-neutral-500 text-center py-2">
          Keine weiteren Personen hinzugefügt. Klicken Sie auf 'Weiter', wenn Sie allein leben.
        </p>
      )}
    </FormStep>
  );
}
