"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schwerbehinderungSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import RadioGroup from "@/components/ui/RadioGroup";
import FileUpload from "@/components/ui/FileUpload";

type FormValues = z.infer<typeof schwerbehinderungSchema>;

export default function Step09Schwerbehinderung() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } =
    useFormStore();

  const { watch, setValue, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schwerbehinderungSchema),
    defaultValues: {
      schwerbehinderungAenderung: formData.schwerbehinderungAenderung as "keine" | "aenderung" | undefined,
      merkzeichenGAG: formData.merkzeichenGAG as "ja" | "nein" | undefined,
      ernaehrungAenderung: formData.ernaehrungAenderung as "keine" | "aenderung" | undefined,
      haftpflichtAenderung: formData.haftpflichtAenderung as "keine" | "aenderung" | undefined,
      hausratAenderung: formData.hausratAenderung as "keine" | "aenderung" | undefined,
      weitereVersicherungenAenderung: formData.weitereVersicherungenAenderung as "keine" | "aenderung" | undefined,
    },
  });

  const schwerbehinderungAenderung = watch("schwerbehinderungAenderung");
  const merkzeichenGAG = watch("merkzeichenGAG");
  const ernaehrungAenderung = watch("ernaehrungAenderung");
  const haftpflichtAenderung = watch("haftpflichtAenderung");
  const hausratAenderung = watch("hausratAenderung");
  const weitereVersicherungenAenderung = watch("weitereVersicherungenAenderung");

  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const schwerBescheidRef = fileRefs.find((f) => f.field === "sb_bescheid");
  const ernaehrungRef     = fileRefs.find((f) => f.field === "sb_ernaehrung_nachweis");
  const haftpflichtRef    = fileRefs.find((f) => f.field === "vers_haftpflicht");
  const hausratRef        = fileRefs.find((f) => f.field === "vers_hausrat");
  const weitereVersRef    = fileRefs.find((f) => f.field === "vers_weitere");

  const onNext = handleSubmit((data) => {
    const errs: Record<string, string> = {};
    if (data.schwerbehinderungAenderung === "aenderung" && !schwerBescheidRef)
      errs["sb_bescheid"] = "Bitte laden Sie den Nachweis hoch.";
    if (data.ernaehrungAenderung === "aenderung" && !ernaehrungRef)
      errs["sb_ernaehrung_nachweis"] = "Bitte laden Sie den Nachweis hoch.";
    if (data.haftpflichtAenderung === "aenderung" && !haftpflichtRef)
      errs["vers_haftpflicht"] = "Bitte laden Sie den Nachweis hoch.";
    if (data.hausratAenderung === "aenderung" && !hausratRef)
      errs["vers_hausrat"] = "Bitte laden Sie den Nachweis hoch.";
    if (data.weitereVersicherungenAenderung === "aenderung" && !weitereVersRef)
      errs["vers_weitere"] = "Bitte laden Sie den Nachweis hoch.";

    setFileErrors(errs);
    if (Object.keys(errs).length > 0) return;

    updateFormData(data);
    nextStep();
  });

  return (
    <FormStep
      title="Mehrbedarfe & Versicherungen"
      subtitle="Teilen Sie uns Änderungen bei Schwerbehinderung, Ernährung und Versicherungen mit und reichen Sie Nachweise ein."
      onNext={onNext}
      onBack={prevStep}
    >
      {/* ── Schwerbehindertenausweis ── */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Schwerbehindertenausweis
        </h3>

        <RadioGroup
          name="schwerbehinderungAenderung"
          legend="Hat sich der Status des Schwerbehindertenausweises geändert?"
          required
          value={schwerbehinderungAenderung ?? ""}
          onChange={(v) =>
            setValue("schwerbehinderungAenderung", v as "keine" | "aenderung", { shouldValidate: true })
          }
          error={errors.schwerbehinderungAenderung?.message}
          options={[
            { value: "keine", label: "Keine Änderung" },
            { value: "aenderung", label: "Änderung vorhanden" },
          ]}
        />

        {schwerbehinderungAenderung === "aenderung" && (
          <div className="space-y-4 pl-4 border-l-2 border-brand-accent/30">
            <RadioGroup
              name="merkzeichenGAG"
              legend="Merkzeichen G oder aG vorhanden?"
              layout="horizontal"
              value={merkzeichenGAG ?? ""}
              onChange={(v) => setValue("merkzeichenGAG", v as "ja" | "nein")}
              options={[
                { value: "nein", label: "Nein" },
                { value: "ja", label: "Ja" },
              ]}
            />
            <FileUpload
              label="Schwerbehindertenausweis / Bescheid hochladen"
              fieldName="sb_bescheid"
              required
              hint="Aktueller Schwerbehindertenausweis oder Feststellungsbescheid"
              currentFileName={schwerBescheidRef?.name}
              error={fileErrors["sb_bescheid"]}
              onFileSelect={(file, f, base64) => {
                addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
                setFileErrors((prev) => { const n = { ...prev }; delete n[f]; return n; });
              }}
              onFileRemove={removeFile}
            />
          </div>
        )}
      </div>

      {/* ── Krankheitsbedingte Ernährung ── */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Krankheitsbedingte kostenaufwändigere Ernährung
        </h3>

        <RadioGroup
          name="ernaehrungAenderung"
          legend="Gibt es Änderungen hinsichtlich einer krankheitsbedingt kostenaufwändigeren Ernährung?"
          required
          value={ernaehrungAenderung ?? ""}
          onChange={(v) =>
            setValue("ernaehrungAenderung", v as "keine" | "aenderung", { shouldValidate: true })
          }
          error={errors.ernaehrungAenderung?.message}
          options={[
            { value: "keine", label: "Keine Änderung" },
            { value: "aenderung", label: "Änderung vorhanden" },
          ]}
        />

        {ernaehrungAenderung === "aenderung" && (
          <div className="pl-4 border-l-2 border-brand-accent/30">
            <FileUpload
              label="Ärztlicher Nachweis"
              fieldName="sb_ernaehrung_nachweis"
              required
              hint="Ärztliche Bescheinigung über die krankheitsbedingte Ernährungsnotwendigkeit"
              currentFileName={ernaehrungRef?.name}
              error={fileErrors["sb_ernaehrung_nachweis"]}
              onFileSelect={(file, f, base64) => {
                addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
                setFileErrors((prev) => { const n = { ...prev }; delete n[f]; return n; });
              }}
              onFileRemove={removeFile}
            />
          </div>
        )}
      </div>

      {/* ── Haftpflichtversicherung ── */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Haftpflichtversicherung
        </h3>

        <RadioGroup
          name="haftpflichtAenderung"
          legend="Hat sich die Haftpflichtversicherung geändert?"
          required
          value={haftpflichtAenderung ?? ""}
          onChange={(v) =>
            setValue("haftpflichtAenderung", v as "keine" | "aenderung", { shouldValidate: true })
          }
          error={errors.haftpflichtAenderung?.message}
          options={[
            { value: "keine", label: "Keine Änderung" },
            { value: "aenderung", label: "Änderung vorhanden" },
          ]}
        />

        {haftpflichtAenderung && (
          <FileUpload
            label="Nachweis Haftpflichtversicherung"
            fieldName="vers_haftpflicht"
            required={haftpflichtAenderung === "aenderung"}
            optional={haftpflichtAenderung === "keine"}
            hint="Aktueller Versicherungsnachweis oder Beitragsrechnung"
            currentFileName={haftpflichtRef?.name}
            error={fileErrors["vers_haftpflicht"]}
            onFileSelect={(file, f, base64) => {
              addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
              setFileErrors((prev) => { const n = { ...prev }; delete n[f]; return n; });
            }}
            onFileRemove={removeFile}
          />
        )}
      </div>

      {/* ── Hausratversicherung ── */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Hausratversicherung
        </h3>

        <RadioGroup
          name="hausratAenderung"
          legend="Hat sich die Hausratversicherung geändert?"
          required
          value={hausratAenderung ?? ""}
          onChange={(v) =>
            setValue("hausratAenderung", v as "keine" | "aenderung", { shouldValidate: true })
          }
          error={errors.hausratAenderung?.message}
          options={[
            { value: "keine", label: "Keine Änderung" },
            { value: "aenderung", label: "Änderung vorhanden" },
          ]}
        />

        {hausratAenderung && (
          <FileUpload
            label="Nachweis Hausratversicherung"
            fieldName="vers_hausrat"
            required={hausratAenderung === "aenderung"}
            optional={hausratAenderung === "keine"}
            hint="Aktueller Versicherungsnachweis oder Beitragsrechnung"
            currentFileName={hausratRef?.name}
            error={fileErrors["vers_hausrat"]}
            onFileSelect={(file, f, base64) => {
              addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
              setFileErrors((prev) => { const n = { ...prev }; delete n[f]; return n; });
            }}
            onFileRemove={removeFile}
          />
        )}
      </div>

      {/* ── Weitere Versicherungen ── */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Weitere Versicherungen
        </h3>

        <RadioGroup
          name="weitereVersicherungenAenderung"
          legend="Gibt es Änderungen bei weiteren Versicherungen (z. B. Kfz-Haftpflicht)?"
          required
          value={weitereVersicherungenAenderung ?? ""}
          onChange={(v) =>
            setValue("weitereVersicherungenAenderung", v as "keine" | "aenderung", { shouldValidate: true })
          }
          error={errors.weitereVersicherungenAenderung?.message}
          options={[
            { value: "keine", label: "Keine Änderung" },
            { value: "aenderung", label: "Änderung vorhanden" },
          ]}
        />

        {weitereVersicherungenAenderung && (
          <FileUpload
            label="Nachweis weitere Versicherungen"
            fieldName="vers_weitere"
            required={weitereVersicherungenAenderung === "aenderung"}
            optional={weitereVersicherungenAenderung === "keine"}
            hint="z. B. Kfz-Haftpflicht – aktueller Versicherungsnachweis oder Beitragsrechnung"
            currentFileName={weitereVersRef?.name}
            error={fileErrors["vers_weitere"]}
            onFileSelect={(file, f, base64) => {
              addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
              setFileErrors((prev) => { const n = { ...prev }; delete n[f]; return n; });
            }}
            onFileRemove={removeFile}
          />
        )}
      </div>
    </FormStep>
  );
}
