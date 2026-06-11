"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { vermoegenWbSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import RadioGroup from "@/components/ui/RadioGroup";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import InfoBox from "@/components/ui/InfoBox";

type FormValues = z.infer<typeof vermoegenWbSchema>;

export default function Step07Vermoegen() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(vermoegenWbSchema),
    defaultValues: {
      vermoegenAenderung: formData.vermoegenAenderung as "keine" | "aenderung" | undefined,
      bankguthaben:        (formData.bankguthaben as string) ?? "",
      bargeld:             (formData.bargeld as string) ?? "",
      wertpapiere:         (formData.wertpapiere as string) ?? "",
      sonstigesVermoegen:  (formData.sonstigesVermoegen as string) ?? "",
      hatPfaendungsschutzkonto: formData.hatPfaendungsschutzkonto as "ja" | "nein" | undefined,
    },
  });

  const vermoegenAenderung = watch("vermoegenAenderung");
  const pfaendung = watch("hatPfaendungsschutzkonto");

  const kontoauszugRef = fileRefs.find((f) => f.field === "verm_kontoauszug");
  const sparbuchRef    = fileRefs.find((f) => f.field === "verm_sparbuch");
  const pkwRef         = fileRefs.find((f) => f.field === "verm_pkw");
  const sonstigesRef   = fileRefs.find((f) => f.field === "verm_sonstiges_nachweis");

  const onNext = handleSubmit((data) => {
    const errs: Record<string, string> = {};
    if (!kontoauszugRef)
      errs["verm_kontoauszug"] = "Bitte laden Sie die Kontoauszüge der letzten drei Monate hoch (zusammengefasst als ein PDF).";
    setFileErrors(errs);
    if (Object.keys(errs).length > 0) return;
    updateFormData(data);
    nextStep();
  });

  return (
    <FormStep
      title="Vermögen"
      subtitle="Teilen Sie uns mit, ob sich Ihr Vermögen geändert hat, und reichen Sie die Kontoauszüge ein."
      onNext={onNext}
      onBack={prevStep}
    >
      <RadioGroup
        name="vermoegenAenderung"
        legend="Hat sich Ihr Vermögen geändert?"
        required
        value={vermoegenAenderung ?? ""}
        onChange={(v) =>
          setValue("vermoegenAenderung", v as "keine" | "aenderung", { shouldValidate: true })
        }
        options={[
          { value: "keine", label: "Keine Änderung" },
          { value: "aenderung", label: "Änderung vorhanden" },
        ]}
      />

      {/* Keine Änderung → nur Standarddokumente */}
      {vermoegenAenderung === "keine" && (
        <div className="space-y-4">
          <InfoBox>
            Bitte reichen Sie auch bei unverändertem Vermögen die aktuellen
            Kontoauszüge der letzten drei Monate als ein zusammengefasstes PDF ein.
          </InfoBox>
          <FileUpload
            label="Kontoauszüge der letzten drei Monate"
            fieldName="verm_kontoauszug"
            required
            hint="Ein PDF mit allen drei Monatsauszügen"
            currentFileName={kontoauszugRef?.name}
            error={fileErrors["verm_kontoauszug"]}
            onFileSelect={(file, f, base64) => {
              addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
              setFileErrors((prev) => { const n = { ...prev }; delete n[f]; return n; });
            }}
            onFileRemove={removeFile}
          />
          <FileUpload
            label="Sparbücher / Sparkonten"
            fieldName="verm_sparbuch"
            optional
            hint="Aktueller Kontoauszug oder Sparbuchkopie"
            currentFileName={sparbuchRef?.name}
            onFileSelect={(file, f, base64) =>
              addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })
            }
            onFileRemove={removeFile}
          />
        </div>
      )}

      {/* Änderung vorhanden → Vermögenswerte + alle Dokumente */}
      {vermoegenAenderung === "aenderung" && (
        <div className="space-y-6">
          <InfoBox>
            Bitte geben Sie Ihren aktuellen Vermögensstand an. Auch geringe Beträge sind anzugeben.
          </InfoBox>

          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-neutral-800 mb-2">
              Vermögenswerte (in €)
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Bankguthaben"
                optional
                placeholder="0,00"
                inputMode="decimal"
                numericOnly="currency"
                {...register("bankguthaben")}
              />
              <Input
                label="Bargeld"
                optional
                placeholder="0,00"
                inputMode="decimal"
                numericOnly="currency"
                {...register("bargeld")}
              />
              <Input
                label="Wertpapiere / Aktien"
                optional
                placeholder="0,00"
                inputMode="decimal"
                numericOnly="currency"
                {...register("wertpapiere")}
              />
              <Input
                label="Sonstiges Vermögen"
                optional
                placeholder="0,00"
                inputMode="decimal"
                numericOnly="currency"
                {...register("sonstigesVermoegen")}
              />
            </div>
          </fieldset>

          <RadioGroup
            name="hatPfaendungsschutzkonto"
            legend="Haben Sie ein Pfändungsschutzkonto (P-Konto)?"
            layout="horizontal"
            value={pfaendung ?? ""}
            onChange={(v) => setValue("hatPfaendungsschutzkonto", v as "ja" | "nein")}
            options={[
              { value: "nein", label: "Nein" },
              { value: "ja", label: "Ja" },
            ]}
          />

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2">
              Nachweise
            </h4>
            <FileUpload
              label="Kontoauszüge der letzten drei Monate"
              fieldName="verm_kontoauszug"
              required
              hint="Ein PDF mit allen drei Monatsauszügen"
              currentFileName={kontoauszugRef?.name}
              error={fileErrors["verm_kontoauszug"]}
              onFileSelect={(file, f, base64) => {
                addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
                setFileErrors((prev) => { const n = { ...prev }; delete n[f]; return n; });
              }}
              onFileRemove={removeFile}
            />
            <FileUpload
              label="Sparbücher / Sparkonten"
              fieldName="verm_sparbuch"
              optional
              hint="Aktueller Kontoauszug oder Sparbuchkopie"
              currentFileName={sparbuchRef?.name}
              onFileSelect={(file, f, base64) =>
                addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })
              }
              onFileRemove={removeFile}
            />
            <FileUpload
              label="Nachweis über PKW-Haltung"
              fieldName="verm_pkw"
              optional
              hint="Versicherungsnachweis oder Kfz-Steuerbescheid"
              currentFileName={pkwRef?.name}
              onFileSelect={(file, f, base64) =>
                addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })
              }
              onFileRemove={removeFile}
            />
            <FileUpload
              label="Nachweis über sonstiges Vermögen"
              fieldName="verm_sonstiges_nachweis"
              optional
              hint="z. B. Übertragsverträge, Rückkaufwerte von Lebensversicherungen, Grundstücke"
              currentFileName={sonstigesRef?.name}
              onFileSelect={(file, f, base64) =>
                addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })
              }
              onFileRemove={removeFile}
            />
          </div>
        </div>
      )}
    </FormStep>
  );
}
