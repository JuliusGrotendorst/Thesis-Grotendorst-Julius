"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { personalDataSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import InfoBox from "@/components/ui/InfoBox";
import FileUpload from "@/components/ui/FileUpload";
import { useState } from "react";

type FormValues = z.infer<typeof personalDataSchema>;

export default function Step03PersonalData() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: {
      anrede: (formData.anrede as string) ?? "",
      vorname: (formData.vorname as string) ?? "",
      nachname: (formData.nachname as string) ?? "",
      geburtsdatum: (formData.geburtsdatum as string) ?? "",
      geburtsort: (formData.geburtsort as string) ?? "",
      staatsangehoerigkeit: (formData.staatsangehoerigkeit as string) ?? "Deutsch",
      familienstand: (formData.familienstand as string) ?? "",
      strasse: (formData.strasse as string) ?? "",
      plz: (formData.plz as string) ?? "46325",
      ort: (formData.ort as string) ?? "Borken",
      email: (formData.email as string) ?? "",
      telefon: (formData.telefon as string) ?? "",
      aktenzeichenUnbekannt: (formData.aktenzeichenUnbekannt as boolean) ?? false,
      aktenzeichen: (formData.aktenzeichen as string) ?? "",
    },
  });

  const aktenzeichenUnbekannt = watch("aktenzeichenUnbekannt");
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const ausweisRef = fileRefs.find((f) => f.field === "ausweisdokument");

  const onNext = handleSubmit((data) => {
    const errs: Record<string, string> = {};
    if (!ausweisRef)
      errs["ausweisdokument"] = "Bitte laden Sie Ihren Personalausweis oder Aufenthaltstitel hoch.";
    setFileErrors(errs);
    if (Object.keys(errs).length > 0) return;
    updateFormData(data);
    nextStep();
  });

  return (
    <FormStep
      title="Persönliche Daten und Kontakt"
      subtitle="Bitte geben Sie Ihre Stammdaten an. Pflichtfelder sind mit * gekennzeichnet."
      onNext={onNext}
      onBack={prevStep}
    >
      <InfoBox>
        Ihre Daten werden ausschließlich zur Bearbeitung Ihres Antrags verwendet und nach
        Abschluss des Verfahrens gemäß den gesetzlichen Aufbewahrungsfristen gelöscht.
        Die Verarbeitung erfolgt über den Auftragsverarbeiter Make.com (AVV gem. Art. 28 DSGVO).
      </InfoBox>

      {/* Anrede */}
      <Select
        label="Anrede"
        placeholder="Bitte wählen (optional)"
        options={["Frau", "Herr", "Divers", "Keine Angabe"]}
        {...register("anrede")}
        error={errors.anrede?.message}
      />

      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <Input label="Vorname" required error={errors.vorname?.message} {...register("vorname")} />
        <Input label="Nachname" required error={errors.nachname?.message} {...register("nachname")} />
      </div>

      {/* Geburt */}
      <div className="grid grid-cols-2 gap-4">
        <DateInput
          label="Geburtsdatum"
          required
          error={errors.geburtsdatum?.message}
          {...register("geburtsdatum")}
        />
        <Input label="Geburtsort" required error={errors.geburtsort?.message} {...register("geburtsort")} />
      </div>

      {/* Staatsangehörigkeit & Familienstand */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Staatsangehörigkeit"
          required
          error={errors.staatsangehoerigkeit?.message}
          {...register("staatsangehoerigkeit")}
        />
        <Select
          label="Familienstand"
          required
          placeholder="Bitte wählen"
          options={["Ledig", "Verheiratet", "Geschieden", "Verwitwet", "Eingetragene Lebenspartnerschaft", "Getrennt lebend"]}
          error={errors.familienstand?.message}
          {...register("familienstand")}
        />
      </div>

      {/* Adresse */}
      <fieldset>
        <legend className="text-sm font-semibold text-neutral-800 mb-3">Anschrift</legend>
        <div className="space-y-4">
          <Input label="Straße und Hausnummer" required error={errors.strasse?.message} {...register("strasse")} />
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="PLZ"
              required
              hint="5 Ziffern"
              inputMode="numeric"
              maxLength={5}
              numericOnly="integer"
              error={errors.plz?.message}
              {...register("plz")}
            />
            <div className="col-span-2">
              <Input label="Ort" required error={errors.ort?.message} {...register("ort")} />
            </div>
          </div>
        </div>
      </fieldset>

      {/* Kontakt */}
      <fieldset>
        <legend className="text-sm font-semibold text-neutral-800 mb-3">Kontaktdaten</legend>
        <div className="space-y-4">
          <Input
            label="E-Mail-Adresse"
            required
            type="email"
            hint="Für die Eingangsbestätigung"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Telefon"
            optional
            type="tel"
            error={errors.telefon?.message}
            {...register("telefon")}
          />
        </div>
      </fieldset>

      {/* Aktenzeichen */}
      <fieldset>
        <legend className="text-sm font-semibold text-neutral-800 mb-3">Aktenzeichen</legend>
        <div className="space-y-3">
          {!aktenzeichenUnbekannt && (
            <Input
              label="Aktenzeichen (Bewilligungsbescheid)"
              required
              hint="Steht oben rechts auf Ihrem letzten Bescheid"
              error={errors.aktenzeichen?.message}
              {...register("aktenzeichen")}
            />
          )}
          <Checkbox
            label="Aktenzeichen ist mir nicht bekannt"
            {...register("aktenzeichenUnbekannt")}
            checked={aktenzeichenUnbekannt ?? false}
            onChange={(e) => setValue("aktenzeichenUnbekannt", e.target.checked)}
          />
        </div>
      </fieldset>

      {/* Personalausweis */}
      <fieldset>
        <legend className="text-sm font-semibold text-neutral-800 mb-3">Personalausweis / Aufenthaltstitel</legend>
        <FileUpload
          label="Personalausweis und/oder aktueller Aufenthaltstitel"
          fieldName="ausweisdokument"
          required
          hint="Vorder- und Rückseite des Personalausweises oder aktuellen Aufenthaltstitels"
          currentFileName={ausweisRef?.name}
          error={fileErrors["ausweisdokument"]}
          onFileSelect={(file, f, base64) => {
            addFile({ field: f, name: file.name, size: file.size, type: file.type, base64, file });
            setFileErrors((prev) => { const n = { ...prev }; delete n[f]; return n; });
          }}
          onFileRemove={removeFile}
        />
      </fieldset>
    </FormStep>
  );
}
