"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leistungsartSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import RadioGroup from "@/components/ui/RadioGroup";
import { useState } from "react";

type FormValues = { leistungsart: "grundsicherung" | "hilfe_zum_lebensunterhalt" };

export default function Step01Leistungsart() {
  const { formData, updateFormData, nextStep } = useFormStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  const { handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(leistungsartSchema),
    defaultValues: { leistungsart: formData.leistungsart as FormValues["leistungsart"] },
  });

  const value = watch("leistungsart");

  const onNext = handleSubmit((data) => {
    updateFormData(data);
    nextStep();
  });

  return (
    <FormStep
      title="Welche Leistung beantragen Sie?"
      subtitle="Wählen Sie die Leistungsart, die auf Ihre Situation zutrifft. Ausklappbare Erläuterungen helfen Ihnen bei der Auswahl."
      onNext={onNext}
      isFirst
    >

      <RadioGroup
        name="leistungsart"
        legend="Leistungsart"
        required
        value={value ?? ""}
        onChange={(v) => setValue("leistungsart", v as FormValues["leistungsart"], { shouldValidate: true })}
        error={errors.leistungsart?.message}
        options={[
          {
            value: "grundsicherung",
            label: "Grundsicherung im Alter und bei Erwerbsminderung (4. Kapitel SGB XII)",
            hint: "Für Personen ab 65 Jahren oder bei dauerhafter voller Erwerbsminderung.",
          },
          {
            value: "hilfe_zum_lebensunterhalt",
            label: "Hilfe zum Lebensunterhalt (3. Kapitel SGB XII)",
            hint: "Für Personen, die ihren Lebensunterhalt nicht aus eigenen Mitteln bestreiten können und vorübergehend erwerbsgemindert sind.",
          },
        ]}
      />

      {/* Expandable help texts */}
      {[
        {
          id: "grundsicherung",
          title: "Was ist Grundsicherung im Alter?",
          body: "Die Grundsicherung im Alter und bei Erwerbsminderung (§§ 41–46b SGB XII) sichert den grundlegenden Lebensunterhalt für ältere und dauerhaft erwerbsgeminderte Menschen, die ihren Bedarf nicht aus eigenem Einkommen und Vermögen decken können.",
        },
        {
          id: "hilfe_zum_lebensunterhalt",
          title: "Was ist Hilfe zum Lebensunterhalt?",
          body: "Die Hilfe zum Lebensunterhalt (§§ 27–40 SGB XII) ist eine Leistung für Personen, die vorübergehend nicht in der Lage sind, ihren Lebensunterhalt zu sichern, und keinen Anspruch auf Bürgergeld haben.",
        },
      ].map((item) => (
        <div key={item.id} className="border border-neutral-200 rounded-sm overflow-hidden">
          <button
            type="button"
            className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium text-brand-text bg-brand-soft hover:bg-brand-warm transition-colors text-left"
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            aria-expanded={expanded === item.id}
          >
            {item.title}
            <span aria-hidden className="ml-2 text-base">{expanded === item.id ? "▲" : "▼"}</span>
          </button>
          {expanded === item.id && (
            <div className="px-4 py-3 text-sm text-neutral-700 leading-relaxed bg-white">
              {item.body}
            </div>
          )}
        </div>
      ))}
    </FormStep>
  );
}
