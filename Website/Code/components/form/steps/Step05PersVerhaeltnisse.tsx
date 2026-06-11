"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { persoenlicheVerhaeltnisseSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import RadioGroup from "@/components/ui/RadioGroup";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import { z } from "zod";

type FormValues = z.infer<typeof persoenlicheVerhaeltnisseSchema>;

export default function Step05PersVerhaeltnisse() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const { watch, setValue, handleSubmit, register, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(persoenlicheVerhaeltnisseSchema),
    defaultValues: {
      familienstandAenderung: formData.familienstandAenderung as "keine" | "aenderung" | undefined,
      neuerFamilienstand: formData.neuerFamilienstand as string | undefined,
      haushaltGroesseAenderung: formData.haushaltGroesseAenderung as "keine" | "aenderung" | undefined,
      anzahlPersonen: formData.anzahlPersonen as string | undefined,
    },
  });

  const familienstandAenderung = watch("familienstandAenderung");
  const neuerFamilienstand = watch("neuerFamilienstand");
  const haushaltGroesseAenderung = watch("haushaltGroesseAenderung");

  const isTrennungScheidung =
    neuerFamilienstand === "Getrennt lebend" || neuerFamilienstand === "Geschieden";

  const onNext = handleSubmit((data) => {
    updateFormData(data);
    nextStep();
  });

  const scheidungsRef = fileRefs.find((f) => f.field === "pv_scheidungsurteil");
  const unterhaltsRef = fileRefs.find((f) => f.field === "pv_unterhaltsnachweis");
  const jugendamtRef = fileRefs.find((f) => f.field === "pv_jugendamt");

  return (
    <FormStep
      title="Persönliche Verhältnisse"
      subtitle="Teilen Sie uns mit, ob sich Ihr Familienstand oder die Zahl der in Ihrer Wohnung lebenden Personen geändert hat."
      onNext={onNext}
      onBack={prevStep}
    >
      {/* ── Familienstand ── */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900 border-b border-neutral-200 pb-2">Familienstand</h3>
        <RadioGroup
          name="familienstandAenderung"
          legend="Hat sich Ihr Familienstand geändert?"
          required
          value={familienstandAenderung ?? ""}
          onChange={(v) =>
            setValue("familienstandAenderung", v as "keine" | "aenderung", { shouldValidate: true })
          }
          error={errors.familienstandAenderung?.message}
          options={[
            { value: "keine", label: "Keine Änderung" },
            { value: "aenderung", label: "Änderung vorhanden" },
          ]}
        />

        {familienstandAenderung === "aenderung" && (
          <div className="space-y-4 pl-4 border-l-2 border-brand-accent/30">
            <Select
              label="Neuer Familienstand"
              required
              placeholder="Bitte wählen"
              options={[
                "Ledig",
                "Verheiratet",
                "Geschieden",
                "Verwitwet",
                "Eingetragene Lebenspartnerschaft",
                "Getrennt lebend",
              ]}
              error={errors.neuerFamilienstand?.message}
              {...register("neuerFamilienstand")}
            />

            {isTrennungScheidung && (
              <div className="space-y-4">
                <FileUpload
                  label="Scheidungsurteil / Trennungsnachweis"
                  fieldName="pv_scheidungsurteil"
                  optional
                  hint="Scheidungsurteil oder Schriftwechsel in der Trennungs- und Unterhaltsangelegenheit"
                  currentFileName={scheidungsRef?.name}
                  onFileSelect={(file, f, base64) =>
                    addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })
                  }
                  onFileRemove={removeFile}
                />
                <FileUpload
                  label="Urteil / Vergleich über Unterhalt & Unterhaltsnachweise"
                  fieldName="pv_unterhaltsnachweis"
                  optional
                  hint="Unterhaltsurteil oder -vergleich sowie Nachweise über tatsächliche Unterhaltszahlungen"
                  currentFileName={unterhaltsRef?.name}
                  onFileSelect={(file, f, base64) =>
                    addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })
                  }
                  onFileRemove={removeFile}
                />
                <FileUpload
                  label="Bescheid Jugendamt über Unterhaltsvorschuss"
                  fieldName="pv_jugendamt"
                  optional
                  hint="Bescheid des Jugendamtes über die Gewährung von Unterhaltsvorschusszahlungen"
                  currentFileName={jugendamtRef?.name}
                  onFileSelect={(file, f, base64) =>
                    addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file })
                  }
                  onFileRemove={removeFile}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Haushaltsgröße ── */}
      <div className="space-y-4">
        <h3 className="font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Zahl der Personen in Ihrer Wohnung
        </h3>
        <RadioGroup
          name="haushaltGroesseAenderung"
          legend="Hat sich die Zahl der in Ihrer Wohnung lebenden Personen geändert?"
          required
          value={haushaltGroesseAenderung ?? ""}
          onChange={(v) =>
            setValue("haushaltGroesseAenderung", v as "keine" | "aenderung", { shouldValidate: true })
          }
          error={errors.haushaltGroesseAenderung?.message}
          options={[
            { value: "keine", label: "Keine Änderung" },
            { value: "aenderung", label: "Änderung vorhanden" },
          ]}
        />

        {haushaltGroesseAenderung === "aenderung" && (
          <div className="pl-4 border-l-2 border-brand-accent/30">
            <Input
              label="Aktuelle Anzahl der Personen in der Wohnung (einschließlich Ihrer Person)"
              required
              placeholder="z. B. 2"
              inputMode="numeric"
              numericOnly="integer"
              error={errors.anzahlPersonen?.message}
              {...register("anzahlPersonen")}
            />
          </div>
        )}
      </div>

    </FormStep>
  );
}
