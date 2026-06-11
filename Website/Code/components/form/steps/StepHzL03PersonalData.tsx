"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { hzlPersonalDataSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import Select from "@/components/ui/Select";
import RadioGroup from "@/components/ui/RadioGroup";
import FileUpload from "@/components/ui/FileUpload";

type FormValues = z.infer<typeof hzlPersonalDataSchema>;

const FAMILIENSTAND_OPTIONS = ["Ledig", "Verheiratet", "Geschieden", "Verwitwet", "Eingetragene Lebenspartnerschaft", "Getrennt lebend"];
const AUFENTHALTSSTATUS_OPTIONS = [
  { value: "eu",               label: "EU-Ausländer*in" },
  { value: "kriegsfluechtling", label: "Kriegs-/Bürgerkriegsflüchtling" },
  { value: "asyl",             label: "Asylberechtigte*r" },
  { value: "sonstiger",        label: "Sonstige*r Ausländer*in" },
];

export default function StepHzL03PersonalData() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const [hatBetreuung, setHatBetreuung] = useState(((formData.hatBetreuung as string) || "") as "ja" | "nein" | "");
  const [hatBetreuungError, setHatBetreuungError] = useState<string | null>(null);
  const [betreuungVorname, setBetreuungVorname] = useState<string>((formData.betreuungVorname as string) ?? "");
  const [betreuungNachname, setBetreuungNachname] = useState<string>((formData.betreuungNachname as string) ?? "");
  const [betreuungAnschrift, setBetreuungAnschrift] = useState<string>((formData.betreuungAnschrift as string) ?? "");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(hzlPersonalDataSchema),
    defaultValues: {
      anrede:                    (formData.anrede as string) ?? "",
      vorname:                   (formData.vorname as string) ?? "",
      nachname:                  (formData.nachname as string) ?? "",
      geburtsdatum:              (formData.geburtsdatum as string) ?? "",
      geburtsort:                (formData.geburtsort as string) ?? "",
      staatsangehoerigkeit:      (formData.staatsangehoerigkeit as string) ?? "Deutsch",
      aufenthaltsstatusAuslaender: formData.aufenthaltsstatusAuslaender as "eu" | "kriegsfluechtling" | "asyl" | "sonstiger" | undefined,
      familienstand:             (formData.familienstand as string) ?? "",
      familienstandSeit:         (formData.familienstandSeit as string) ?? "",
      strasse:                   (formData.strasse as string) ?? "",
      plz:                       (formData.plz as string) ?? "46325",
      ort:                       (formData.ort as string) ?? "Borken",
      email:                     (formData.email as string) ?? "",
      telefon:                   (formData.telefon as string) ?? "",
      beschaeftigung:            formData.beschaeftigung as "ja" | "nein" | undefined,
      einschraenkungArbeitskraft: formData.einschraenkungArbeitskraft as "ja" | "nein" | undefined,
      volleErwerbsminderung:     formData.volleErwerbsminderung as "ja" | "nein" | undefined,
      schwerbehinderungDatum:    (formData.schwerbehinderungDatum as string) ?? "",
      schwerbehinderungGrad:     (formData.schwerbehinderungGrad as string) ?? "",
      schwerbehinderungAntragGestellt: formData.schwerbehinderungAntragGestellt as "ja" | "nein" | undefined,
      geschiedenUrteilDatum:     (formData.geschiedenUrteilDatum as string) ?? "",
      geschiedenGericht:         (formData.geschiedenGericht as string) ?? "",
      geschiedenGeschaeftszeichen: (formData.geschiedenGeschaeftszeichen as string) ?? "",
      aktenzeichen:              (formData.aktenzeichen as string) ?? "",
      aktenzeichenUnbekannt:     (formData.aktenzeichenUnbekannt as boolean) ?? false,
    },
  });

  const staatsangehoerigkeit = watch("staatsangehoerigkeit");
  const aufenthaltsstatus = watch("aufenthaltsstatusAuslaender");
  const beschaeftigung = watch("beschaeftigung");
  const einschraenkung = watch("einschraenkungArbeitskraft");
  const schwerbehinderungAntrag = watch("schwerbehinderungAntragGestellt");

  const isAuslaender = staatsangehoerigkeit.toLowerCase() !== "deutsch" && staatsangehoerigkeit !== "";

  const onNext = handleSubmit((data) => {
    if (!hatBetreuung) {
      setHatBetreuungError("Bitte treffen Sie eine Auswahl.");
      return;
    }
    setHatBetreuungError(null);
    updateFormData({
      ...data,
      hatBetreuung,
      betreuungVorname,
      betreuungNachname,
      betreuungAnschrift,
    });
    nextStep();
  });

  return (
    <FormStep
      title="Persönliche Daten"
      subtitle="Bitte geben Sie Ihre Stammdaten an. Pflichtfelder sind mit * gekennzeichnet."
      onNext={onNext}
      onBack={prevStep}
    >

      <Select
        label="Anrede"
        placeholder="Bitte wählen (optional)"
        options={["Frau", "Herr", "Divers", "Keine Angabe"]}
        {...register("anrede")}
        error={errors.anrede?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input label="Vorname" required error={errors.vorname?.message} {...register("vorname")} />
        <Input label="Nachname" required error={errors.nachname?.message} {...register("nachname")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DateInput label="Geburtsdatum" required error={errors.geburtsdatum?.message} {...register("geburtsdatum")} />
        <Input label="Geburtsort und -Kreis" required error={errors.geburtsort?.message} {...register("geburtsort")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Staatsangehörigkeit" required error={errors.staatsangehoerigkeit?.message} {...register("staatsangehoerigkeit")} />
        <div className="space-y-1">
          <Select
            label="Familienstand"
            required
            placeholder="Bitte wählen"
            options={FAMILIENSTAND_OPTIONS}
            error={errors.familienstand?.message}
            {...register("familienstand")}
          />
        </div>
      </div>

      <Input label="Familienstand seit" optional placeholder="MM.JJJJ" {...register("familienstandSeit")} />

      {isAuslaender && (
        <RadioGroup
          name="aufenthaltsstatusAuslaender"
          legend="Aufenthaltsrechtlicher Status"
          value={aufenthaltsstatus ?? ""}
          onChange={(v) => setValue("aufenthaltsstatusAuslaender", v as FormValues["aufenthaltsstatusAuslaender"])}
          options={AUFENTHALTSSTATUS_OPTIONS}
        />
      )}

      <fieldset>
        <legend className="text-sm font-semibold text-neutral-800 mb-3">Anschrift</legend>
        <div className="space-y-4">
          <Input label="Straße und Hausnummer" required error={errors.strasse?.message} {...register("strasse")} />
          <div className="grid grid-cols-3 gap-4">
            <Input label="PLZ" required inputMode="numeric" maxLength={5} numericOnly="integer" error={errors.plz?.message} {...register("plz")} />
            <div className="col-span-2">
              <Input label="Ort" required error={errors.ort?.message} {...register("ort")} />
            </div>
          </div>
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-4">
        <Input label="E-Mail-Adresse" required type="email" error={errors.email?.message} {...register("email")} />
        <Input label="Telefon" optional type="tel" {...register("telefon")} />
      </div>

      {/* Beschäftigung / Erwerbssituation (für 15–66-Jährige) */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2">
          Erwerbssituation (für Personen zwischen 15 und 66 Jahren)
        </legend>
        <RadioGroup
          name="beschaeftigung"
          legend="Beschäftigung vorhanden?"
          required
          error={errors.beschaeftigung?.message}
          layout="horizontal"
          value={beschaeftigung ?? ""}
          onChange={(v) => setValue("beschaeftigung", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
        <RadioGroup
          name="einschraenkungArbeitskraft"
          legend="Einschränkung der Arbeitskraft?"
          required
          error={errors.einschraenkungArbeitskraft?.message}
          layout="horizontal"
          value={einschraenkung ?? ""}
          onChange={(v) => setValue("einschraenkungArbeitskraft", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
        <RadioGroup
          name="volleErwerbsminderung"
          legend="Volle Erwerbsminderung?"
          required
          error={errors.volleErwerbsminderung?.message}
          layout="horizontal"
          value={watch("volleErwerbsminderung") ?? ""}
          onChange={(v) => setValue("volleErwerbsminderung", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
      </fieldset>

      {/* Schwerbehinderung */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2">
          Anerkannte Schwerbehinderung
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <DateInput label="Datum der Anerkennung" optional {...register("schwerbehinderungDatum")} />
          <Input label="Grad der Behinderung (%)" optional inputMode="numeric" numericOnly="integer" {...register("schwerbehinderungGrad")} />
        </div>
        <RadioGroup
          name="schwerbehinderungAntragGestellt"
          legend="Antrag gestellt?"
          layout="horizontal"
          value={schwerbehinderungAntrag ?? ""}
          onChange={(v) => setValue("schwerbehinderungAntragGestellt", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
      </fieldset>

      {/* Bei Geschiedenen / Getrennt Lebenden */}
      <fieldset className="space-y-4 pl-4 border-l-2 border-brand-accent/30">
        <legend className="text-sm font-semibold text-neutral-800">Bei geschiedenen oder getrennt lebenden Ehegatten</legend>
        <div className="grid grid-cols-3 gap-4">
          <DateInput label="Urteil vom" optional {...register("geschiedenUrteilDatum")} />
          <Input label="Gericht" optional {...register("geschiedenGericht")} />
          <Input label="Geschäftszeichen" optional {...register("geschiedenGeschaeftszeichen")} />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Ausweisdokument
        </legend>
        <FileUpload
          label="Personalausweis, Reisepass oder Aufenthaltstitel"
          fieldName="hzl_ausweis_antragsteller"
          hint="Vorder- und Rückseite · PDF, JPG oder PNG · max. 10 MB"
          optional
          currentFileName={fileRefs.find((f) => f.field === "hzl_ausweis_antragsteller")?.name}
          onFileSelect={(file, field, base64) => addFile({ field, name: file.name, size: file.size, type: file.type, base64, file })}
          onFileRemove={removeFile}
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Aktenzeichen
        </legend>
        <Input
          label="Aktenzeichen (falls bekannt)"
          optional
          placeholder="z. B. 12345-2024"
          {...register("aktenzeichen")}
          disabled={watch("aktenzeichenUnbekannt") === true}
        />
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            className="accent-brand-accent w-4 h-4"
            {...register("aktenzeichenUnbekannt")}
          />
          <span className="text-sm text-neutral-700">Aktenzeichen ist mir nicht bekannt</span>
        </label>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Betreuung / Vollmacht
        </legend>
        <RadioGroup
          name="hatBetreuung"
          legend="Stehen Sie unter rechtlicher Betreuung oder Vollmacht?"
          required
          error={hatBetreuungError ?? undefined}
          layout="horizontal"
          value={hatBetreuung}
          onChange={(v) => { setHatBetreuung(v as "ja" | "nein"); setHatBetreuungError(null); }}
          options={[{ value: "nein", label: "Nein" }, { value: "ja", label: "Ja" }]}
        />
        {hatBetreuung === "ja" && (
          <div className="space-y-3 pl-4 border-l-2 border-brand-accent/30">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Vorname Betreuer*in"
                optional
                value={betreuungVorname}
                onChange={(e) => setBetreuungVorname(e.target.value)}
              />
              <Input
                label="Nachname Betreuer*in"
                optional
                value={betreuungNachname}
                onChange={(e) => setBetreuungNachname(e.target.value)}
              />
            </div>
            <Input
              label="Anschrift Betreuer*in"
              optional
              value={betreuungAnschrift}
              onChange={(e) => setBetreuungAnschrift(e.target.value)}
            />
            <FileUpload
              label="Betreuerausweis oder Vollmacht"
              fieldName="betreuung_vollmacht"
              hint="PDF, JPG oder PNG · max. 10 MB"
              optional
              currentFileName={fileRefs.find((f) => f.field === "betreuung_vollmacht")?.name}
              onFileSelect={(file, field, base64) => addFile({ field, name: file.name, size: file.size, type: file.type, base64, file })}
              onFileRemove={removeFile}
            />
          </div>
        )}
      </fieldset>
    </FormStep>
  );
}
