"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { antragsartSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import RadioGroup from "@/components/ui/RadioGroup";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

type FormValues = { antragsart: "neuantrag" | "weiterbewilligung" };

export default function Step02Antragsart() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();
  const isHzL = formData.leistungsart === "hilfe_zum_lebensunterhalt";

  const { handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(antragsartSchema),
    defaultValues: { antragsart: formData.antragsart as FormValues["antragsart"] },
  });

  const value = watch("antragsart");
  const [showVisitRequired, setShowVisitRequired] = useState(false);

  const onNext = handleSubmit((data) => {
    if (data.antragsart === "neuantrag") {
      setShowVisitRequired(true);
      return;
    }
    updateFormData(data);
    nextStep();
  });

  // Grundsicherung WB: Neuantrag → Vorsprache erforderlich (nur nach Klick auf "Weiter")
  if (showVisitRequired) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900">Neuantrag – Persönliche Vorsprache erforderlich</h2>
        </header>

        <div className="mt-6 p-6 bg-brand-soft border border-brand-border rounded-sm space-y-3 text-sm">
          <p className="font-semibold text-brand-text">Sozialamt Borken · Zimmer 214</p>
          <p>{CONTACT.address}</p>
          <p>Tel.: <a href={`tel:${CONTACT.sozialamt.replace(/\s/g, "")}`} className="underline">{CONTACT.sozialamt}</a></p>
          <p>E-Mail: <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a></p>
          <p className="mt-2 text-brand-subtle">Öffnungszeiten: Mo, Di, Do 8–12 Uhr · Do 14–18 Uhr · Fr 8–12 Uhr</p>
        </div>

        <div className="mt-8 flex gap-3">
          <Button variant="secondary" type="button" onClick={() => setShowVisitRequired(false)}>← Zurück</Button>
          <Button type="button" onClick={() => window.open(CONTACT.terminLink, "_blank")}>
            Termin online buchen →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormStep
      title="Art des Antrags"
      subtitle={
        isHzL
          ? "Handelt es sich um einen Neuantrag oder um eine wirtschaftliche Überprüfung?"
          : "Handelt es sich um einen Neuantrag oder um eine Weiterbewilligung?"
      }
      onNext={onNext}
      onBack={prevStep}
    >
      <RadioGroup
        name="antragsart"
        legend="Antragsart"
        required
        value={value ?? ""}
        onChange={(v) => setValue("antragsart", v as FormValues["antragsart"], { shouldValidate: true })}
        error={errors.antragsart?.message}
        options={
          isHzL
            ? [
                { value: "neuantrag", label: "Neuantrag", hint: "Erstmalige Beantragung von Hilfe zum Lebensunterhalt." },
                { value: "weiterbewilligung", label: "Wirtschaftliche Überprüfung", hint: "Verlängerung oder Fortführung einer bereits bewilligten Leistung." },
              ]
            : [
                {
                  value: "weiterbewilligung",
                  label: "Weiterbewilligungsantrag / Mitteilung veränderter Verhältnisse",
                  hint: "Sie beziehen bereits Leistungen und möchten diese fortführen oder Änderungen mitteilen.",
                },
                {
                  value: "neuantrag",
                  label: "Neuantrag",
                  hint: "Sie stellen zum ersten Mal einen Antrag auf diese Leistung.",
                },
              ]
        }
      />
    </FormStep>
  );
}
