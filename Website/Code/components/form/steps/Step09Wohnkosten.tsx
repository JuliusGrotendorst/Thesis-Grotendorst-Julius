"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wohnkostenWbSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import RadioGroup from "@/components/ui/RadioGroup";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import { z } from "zod";

type FormValues = z.infer<typeof wohnkostenWbSchema>;

export default function Step09Wohnkosten() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const { watch, setValue, handleSubmit, register, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(wohnkostenWbSchema),
    defaultValues: {
      wohnkostenAenderung: formData.wohnkostenAenderung as "keine" | "aenderung" | undefined,
      wohnart: formData.wohnart as "miete" | "eigentum" | undefined,
      kaltmiete: formData.kaltmiete as string | undefined,
      nebenkosten: formData.nebenkosten as string | undefined,
      heizkosten: formData.heizkosten as string | undefined,
    },
  });

  const wohnkostenAenderung = watch("wohnkostenAenderung");
  const wohnart = watch("wohnart");
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const mietbeschRef    = fileRefs.find((f) => f.field === "wk_mietbescheinigung");
  const hauskostenRef   = fileRefs.find((f) => f.field === "wk_hauskosten");

  const onNext = handleSubmit((data) => {
    const errs: Record<string, string> = {};
    if ((data.wohnkostenAenderung === "keine" || (data.wohnkostenAenderung === "aenderung" && data.wohnart === "miete")) && !mietbeschRef)
      errs["wk_mietbescheinigung"] = "Bitte laden Sie die Mietbescheinigung hoch.";
    if (data.wohnkostenAenderung === "aenderung" && data.wohnart === "eigentum" && !hauskostenRef)
      errs["wk_hauskosten"] = "Bitte laden Sie Nachweise über laufende Hauskosten hoch.";
    setFileErrors(errs);
    if (Object.keys(errs).length > 0) return;
    updateFormData(data);
    nextStep();
  });
  const nebenkostenRef  = fileRefs.find((f) => f.field === "wk_nebenkostenabrechnung");
  const heizkostenRef   = fileRefs.find((f) => f.field === "wk_heizkostennachweis");
  const mietvertragRef  = fileRefs.find((f) => f.field === "wk_mietvertrag");
  const darlehenRef     = fileRefs.find((f) => f.field === "wk_darlehen_zinsen");
  const abgabenRef      = fileRefs.find((f) => f.field === "wk_abgabenbescheid");
  const heizkostenEigRef = fileRefs.find((f) => f.field === "wk_heizkostennachweis_eigentum");

  return (
    <FormStep
      title="Unterkunfts- und Heizkosten"
      subtitle="Bitte reichen Sie die Unterlagen zu Ihren Wohnkosten ein und teilen Sie uns Änderungen mit."
      onNext={onNext}
      onBack={prevStep}
    >
      <RadioGroup
        name="wohnkostenAenderung"
        legend="Haben sich Ihre Unterkunfts- oder Heizkosten geändert?"
        required
        value={wohnkostenAenderung ?? ""}
        onChange={(v) =>
          setValue("wohnkostenAenderung", v as "keine" | "aenderung", { shouldValidate: true })
        }
        error={errors.wohnkostenAenderung?.message}
        options={[
          { value: "keine", label: "Keine Änderung" },
          { value: "aenderung", label: "Änderung vorhanden" },
        ]}
      />

      {/* Kostenfelder + Wohnart-Auswahl nur bei Änderung */}
      {wohnkostenAenderung === "aenderung" && (
        <div className="space-y-4 pl-4 border-l-2 border-brand-accent/30">
          <RadioGroup
            name="wohnart"
            legend="Wohnform"
            required
            value={wohnart ?? ""}
            onChange={(v) => setValue("wohnart", v as "miete" | "eigentum", { shouldValidate: true })}
            error={errors.wohnart?.message}
            options={[
              { value: "miete", label: "Ich wohne zur Miete" },
              { value: "eigentum", label: "Ich bewohne Wohneigentum" },
            ]}
          />

          {wohnart && (
            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-neutral-800 mb-2">
                Neue monatliche Kosten (in €)
              </legend>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label={wohnart === "miete" ? "Kaltmiete" : "Lfd. Hauskosten"}
                  required
                  placeholder="0,00"
                  inputMode="decimal"
                  numericOnly="currency"
                  error={errors.kaltmiete?.message}
                  {...register("kaltmiete")}
                />
                <Input
                  label="Nebenkosten"
                  optional
                  placeholder="0,00"
                  inputMode="decimal"
                  numericOnly="currency"
                  {...register("nebenkosten")}
                />
                <Input
                  label="Heizkosten"
                  optional
                  placeholder="0,00"
                  inputMode="decimal"
                  numericOnly="currency"
                  {...register("heizkosten")}
                />
              </div>
            </fieldset>
          )}

          {/* Zusätzliche Eigentum-Dokumente */}
          {wohnart === "eigentum" && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-neutral-800">Zusätzliche Unterlagen – Wohneigentum</p>
              <FileUpload
                label="Nachweise über laufende Hauskosten"
                fieldName="wk_hauskosten"
                required
                hint="Hausgeldabrechnung, Betriebskostenaufstellung o. Ä."
                currentFileName={hauskostenRef?.name}
                error={fileErrors["wk_hauskosten"]}
                onFileSelect={(file, f, base64) => {
                  addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
                  setFileErrors((prev) => { const n = { ...prev }; delete n[f]; return n; });
                }}
                onFileRemove={removeFile}
              />
              <FileUpload
                label="Darlehen – Zinsnachweise"
                fieldName="wk_darlehen_zinsen"
                optional
                hint="Kontoauszug oder Jahresabrechnung der finanzierenden Bank"
                currentFileName={darlehenRef?.name}
                onFileSelect={(file, f, base64) => addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })}
                onFileRemove={removeFile}
              />
              <FileUpload
                label="Abgabenbescheid des laufenden Jahres"
                fieldName="wk_abgabenbescheid"
                optional
                hint="Grundsteuer- oder sonstiger Abgabenbescheid"
                currentFileName={abgabenRef?.name}
                onFileSelect={(file, f, base64) => addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })}
                onFileRemove={removeFile}
              />
              <FileUpload
                label="Heizkostennachweis"
                fieldName="wk_heizkostennachweis_eigentum"
                optional
                hint="z. B. Abschlagsrechnung der Stadtwerke"
                currentFileName={heizkostenEigRef?.name}
                onFileSelect={(file, f, base64) => addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })}
                onFileRemove={removeFile}
              />
            </div>
          )}
        </div>
      )}

      {/* Unterlagen – immer sichtbar (Mietwohnung Standard) */}
      {(wohnkostenAenderung === "keine" || (wohnkostenAenderung === "aenderung" && wohnart !== "eigentum")) && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2">
            Unterlagen einreichen
          </h4>

          <FileUpload
            label="Mietbescheinigung"
            fieldName="wk_mietbescheinigung"
            required
            hint="Formular erhältlich beim Sozialamt Borken"
            currentFileName={mietbeschRef?.name}
            error={fileErrors["wk_mietbescheinigung"]}
            onFileSelect={(file, f, base64) => {
              addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
              setFileErrors((prev) => { const n = { ...prev }; delete n[f]; return n; });
            }}
            onFileRemove={removeFile}
          />

          <FileUpload
            label="Letzte Nebenkostenabrechnung"
            fieldName="wk_nebenkostenabrechnung"
            optional
            hint="Sofern vorhanden – aktuelle Betriebskosten- oder Nebenkostenabrechnung"
            currentFileName={nebenkostenRef?.name}
            onFileSelect={(file, f, base64) => addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })}
            onFileRemove={removeFile}
          />

          <FileUpload
            label="Heizkostennachweis"
            fieldName="wk_heizkostennachweis"
            optional
            hint="z. B. Abschlagsrechnung der Stadtwerke oder Heizkostenabrechnung"
            currentFileName={heizkostenRef?.name}
            onFileSelect={(file, f, base64) => addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })}
            onFileRemove={removeFile}
          />

          <FileUpload
            label="Mietvertrag"
            fieldName="wk_mietvertrag"
            optional
            hint="Nicht zwingend erforderlich – nur bei neuer Mietsituation"
            currentFileName={mietvertragRef?.name}
            onFileSelect={(file, f, base64) => addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })}
            onFileRemove={removeFile}
          />
        </div>
      )}
    </FormStep>
  );
}
