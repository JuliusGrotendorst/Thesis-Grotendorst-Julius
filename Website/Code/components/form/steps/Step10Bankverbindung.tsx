"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bankverbindungSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import RadioGroup from "@/components/ui/RadioGroup";
import Input from "@/components/ui/Input";

type FormValues = z.infer<typeof bankverbindungSchema>;

export default function Step10Bankverbindung() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(bankverbindungSchema),
    defaultValues: {
      bankverbindungAenderung:
        formData.bankverbindungAenderung as "keine" | "aenderung" | undefined,
      kontoinhaber: formData.kontoinhaber as string | undefined,
      iban: formData.iban as string | undefined,
      bic: formData.bic as string | undefined,
      geldinstitut: formData.geldinstitut as string | undefined,
      bankHatPfaendungsschutzkonto:
        formData.bankHatPfaendungsschutzkonto as "ja" | "nein" | undefined,
    },
  });

  const formatIban = (v: string) =>
    v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 22).replace(/(.{4})(?=.)/g, "$1 ");

  const bankverbindungAenderung = watch("bankverbindungAenderung");
  const bankPfaendung = watch("bankHatPfaendungsschutzkonto");

  const onNext = handleSubmit((data) => {
    updateFormData(data);
    nextStep();
  });

  return (
    <FormStep
      title="Bankverbindung"
      subtitle="Teilen Sie uns mit, ob sich die Bankverbindung geändert hat, auf die Ihre Leistungen überwiesen werden sollen."
      onNext={onNext}
      onBack={prevStep}
    >
      <RadioGroup
        name="bankverbindungAenderung"
        legend="Hat sich Ihre Bankverbindung geändert?"
        required
        value={bankverbindungAenderung ?? ""}
        onChange={(v) =>
          setValue("bankverbindungAenderung", v as "keine" | "aenderung", {
            shouldValidate: true,
          })
        }
        error={errors.bankverbindungAenderung?.message}
        options={[
          { value: "keine", label: "Keine Änderung" },
          { value: "aenderung", label: "Neue Bankverbindung mitteilen" },
        ]}
      />

      {bankverbindungAenderung === "aenderung" && (
        <div className="space-y-4">

          <Input
            label="Name und Vorname des Kontoinhabers"
            required
            error={errors.kontoinhaber?.message}
            {...register("kontoinhaber")}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="IBAN"
              required
              placeholder="DE00 0000 0000 0000 0000 00"
              hint="22 Zeichen, beginnend mit DE"
              error={errors.iban?.message}
              value={watch("iban") ?? ""}
              onChange={(e) => setValue("iban", formatIban(e.target.value), { shouldValidate: true })}
            />
            <Input
              label="BIC"
              optional
              placeholder="XXXXXXXX"
              error={errors.bic?.message}
              {...register("bic")}
            />
          </div>

          <Input
            label="Name und Sitz des Geldinstituts"
            required
            placeholder="z. B. Sparkasse Westmünsterland, Borken"
            error={errors.geldinstitut?.message}
            {...register("geldinstitut")}
          />

          <RadioGroup
            name="bankHatPfaendungsschutzkonto"
            legend="Handelt es sich um ein Pfändungsschutzkonto (P-Konto)?"
            layout="horizontal"
            value={bankPfaendung ?? ""}
            onChange={(v) => setValue("bankHatPfaendungsschutzkonto", v as "ja" | "nein")}
            options={[
              { value: "nein", label: "Nein" },
              { value: "ja", label: "Ja" },
            ]}
          />
        </div>
      )}
    </FormStep>
  );
}
