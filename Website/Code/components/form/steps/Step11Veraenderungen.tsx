"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { auslandsaufenthaltSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import RadioGroup from "@/components/ui/RadioGroup";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import InfoBox from "@/components/ui/InfoBox";

type FormValues = z.infer<typeof auslandsaufenthaltSchema>;

export default function Step11Veraenderungen() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } =
    useFormStore();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(auslandsaufenthaltSchema),
    defaultValues: {
      auslandsaufenthaltGeplant:
        formData.auslandsaufenthaltGeplant as "ja" | "nein" | undefined,
      auslandsaufenthaltAbWann: formData.auslandsaufenthaltAbWann as string | undefined,
      auslandsaufenthaltDauer: formData.auslandsaufenthaltDauer as string | undefined,
      weitereVeraenderungen: formData.weitereVeraenderungen as "ja" | "nein" | undefined,
      veraenderungenBeschreibung: formData.veraenderungenBeschreibung as string | undefined,
    },
  });

  const auslandsaufenthaltGeplant = watch("auslandsaufenthaltGeplant");
  const weitereVeraenderungen = watch("weitereVeraenderungen");
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const belegeRef = fileRefs.find((f) => f.field === "veraenderungen_belege");

  const onNext = handleSubmit((data) => {
    updateFormData(data);
    nextStep();
  });

  return (
    <FormStep
      title="Auslandsaufenthalt & Weitere Änderungen"
      subtitle="Planen Sie einen längeren Auslandsaufenthalt? Haben sich weitere Verhältnisse geändert?"
      onNext={onNext}
      onBack={prevStep}
    >
      {/* ── Auslandsaufenthalt ── */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Auslandsaufenthalt
        </h3>

        <InfoBox variant="warning">
          Ein geplanter Auslandsaufenthalt ist frühzeitig mitzuteilen. Leistungen werden nur
          für die ersten vier aufeinanderfolgenden Wochen gewährt; danach entfällt der
          Leistungsanspruch (§ 41a SGB XII).
        </InfoBox>

        <RadioGroup
          name="auslandsaufenthaltGeplant"
          legend="Planen Sie in den kommenden 12 Monaten einen Auslandsaufenthalt von vier aufeinanderfolgenden Wochen oder länger?"
          required
          value={auslandsaufenthaltGeplant ?? ""}
          onChange={(v) =>
            setValue("auslandsaufenthaltGeplant", v as "ja" | "nein", { shouldValidate: true })
          }
          error={errors.auslandsaufenthaltGeplant?.message}
          options={[
            { value: "nein", label: "Nein" },
            { value: "ja", label: "Ja" },
          ]}
        />

        {auslandsaufenthaltGeplant === "ja" && (
          <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-brand-accent/30">
            <Input
              label="Ab wann?"
              required
              placeholder="z. B. 01.08.2025"
              hint="Geplantes Abreisedatum"
              error={errors.auslandsaufenthaltAbWann?.message}
              {...register("auslandsaufenthaltAbWann")}
            />
            <Input
              label="Wie lange?"
              required
              placeholder="z. B. 6 Wochen"
              hint="Voraussichtliche Aufenthaltsdauer"
              error={errors.auslandsaufenthaltDauer?.message}
              {...register("auslandsaufenthaltDauer")}
            />
          </div>
        )}
      </div>

      {/* ── Weitere Änderungen ── */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Weitere Veränderungen
        </h3>

        <RadioGroup
          name="weitereVeraenderungen"
          legend="Haben sich seit Ihrer letzten Erklärung außerdem weitere Veränderungen ergeben?"
          required
          value={weitereVeraenderungen ?? ""}
          onChange={(v) =>
            setValue("weitereVeraenderungen", v as "ja" | "nein", { shouldValidate: true })
          }
          error={errors.weitereVeraenderungen?.message}
          options={[
            { value: "nein", label: "Nein" },
            { value: "ja", label: "Ja – bitte erläutern und nachweisen" },
          ]}
        />

        {weitereVeraenderungen === "ja" && (
          <div className="space-y-4 pl-4 border-l-2 border-brand-accent/30">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="veraenderungenBeschreibung"
                className="text-sm font-semibold text-neutral-800"
              >
                Beschreibung der Veränderungen{" "}
                <span className="text-brand-danger">*</span>
              </label>
              <textarea
                id="veraenderungenBeschreibung"
                rows={5}
                placeholder="Bitte beschreiben Sie alle weiteren Änderungen Ihrer persönlichen, wirtschaftlichen oder familiären Verhältnisse…"
                className={`w-full px-3.5 py-3 text-base border rounded-sm bg-white text-neutral-800 font-sans resize-y
                  focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-brand-accent/20
                  ${errors.veraenderungenBeschreibung ? "border-brand-danger" : "border-neutral-400"}`}
                {...register("veraenderungenBeschreibung")}
              />
              {errors.veraenderungenBeschreibung && (
                <p role="alert" className="field-error">
                  <svg width={14} height={14} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
                    <path d="M10 3 2.5 16h15z" /><path d="M10 8v4m0 2v.01" />
                  </svg>
                  {errors.veraenderungenBeschreibung.message}
                </p>
              )}
            </div>

            <FileUpload
              label="Belege hochladen"
              fieldName="veraenderungen_belege"
              optional
              hint="z. B. neuer Mietvertrag, Kündigung, Bescheide, sonstige Nachweise"
              currentFileName={belegeRef?.name}
              onFileSelect={(file, f, base64) =>
                addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })
              }
              onFileRemove={removeFile}
            />
          </div>
        )}
      </div>
    </FormStep>
  );
}
