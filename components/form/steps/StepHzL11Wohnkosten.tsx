"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { hzlWohnkostenSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import RadioGroup from "@/components/ui/RadioGroup";
import FileUpload from "@/components/ui/FileUpload";

type FormValues = z.infer<typeof hzlWohnkostenSchema>;

const HEIZUNGSART_OPTIONS = [
  { value: "zentral", label: "Zentralheizung" },
  { value: "einzel",  label: "Einzelofen / Etagenheizung" },
];

const WARMWASSER_OPTIONS = [
  { value: "ohne", label: "Ohne Warmwasser" },
  { value: "mit",  label: "Mit Warmwasser" },
];

const ENERGIEART_OPTIONS = [
  { value: "Gas",       label: "Gas" },
  { value: "Öl",        label: "Öl" },
  { value: "Strom",     label: "Strom" },
  { value: "Holz",      label: "Holz" },
  { value: "Fernwärme", label: "Fernwärme" },
];

export default function StepHzL11Wohnkosten() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(hzlWohnkostenSchema),
    defaultValues: {
      kaltmiete:                    (formData.hzlKaltmiete as string) ?? "",
      nebenkosten:                  (formData.hzlNebenkosten as string) ?? "",
      wohnungGroesseQm:             (formData.hzlWohnungGroesseQm as string) ?? "",
      wohnungAnzahlRaeume:          (formData.hzlWohnungAnzahlRaeume as string) ?? "",
      untervermietet:               formData.hzlUntervermietet as "ja" | "nein" | undefined,
      untervermieteteRaeume:        (formData.hzlUntervermieteteRaeume as string) ?? "",
      vermieterName:                (formData.hzlVermieterName as string) ?? "",
      vermieterAnschrift:           (formData.hzlVermieterAnschrift as string) ?? "",
      wohngeldBewilligtBis:         (formData.hzlWohngeldBewilligtBis as string) ?? "",
      wohngeldBetrag:               (formData.hzlWohngeldBetrag as string) ?? "",
      heizungsart:                  formData.hzlHeizungsart as "zentral" | "einzel" | undefined,
      energieart:                   (formData.hzlEnergieart as string) ?? "",
      kochfeuerungEnthalten:        formData.hzlKochfeuerungEnthalten as "ja" | "nein" | undefined,
      heizungspauschale:            (formData.hzlHeizungspauschale as string) ?? "",
      heizungspauschaleWarmwasser:  formData.hzlHeizungspauschaleWarmwasser as "ohne" | "mit" | undefined,
      heizungspauschaleZahlenAn:    (formData.hzlHeizungspauschaleZahlenAn as string) ?? "",
      einnahmenUntervermietung:     (formData.hzlEinnahmenUntervermietung as string) ?? "",
      personenImHaushalt:           (formData.hzlPersonenImHaushalt as string) ?? "",
      leerRaeume:                   (formData.hzlLeerRaeume as string) ?? "",
      mobiertRaeume:                (formData.hzlMobiertRaeume as string) ?? "",
      mieterVorname:                (formData.hzlMieterVorname as string) ?? "",
      mieterNachname:               (formData.hzlMieterNachname as string) ?? "",
    },
  });

  const untervermietet = watch("untervermietet");
  const heizungsart    = watch("heizungsart");
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const onNext = handleSubmit((data) => {
    const errs: Record<string, string> = {};
    if (!fileRefs.find((f) => f.field === "hzl_wk_mietbescheinigung"))
      errs["hzl_wk_mietbescheinigung"] = "Bitte laden Sie die Mietbescheinigung hoch.";
    if (Object.keys(errs).length > 0) {
      setFileErrors(errs);
      return;
    }
    updateFormData({
      hzlKaltmiete:                   data.kaltmiete,
      hzlNebenkosten:                 data.nebenkosten,
      hzlWohnungGroesseQm:            data.wohnungGroesseQm,
      hzlWohnungAnzahlRaeume:         data.wohnungAnzahlRaeume,
      hzlUntervermietet:              data.untervermietet,
      hzlUntervermieteteRaeume:       data.untervermieteteRaeume,
      hzlVermieterName:               data.vermieterName,
      hzlVermieterAnschrift:          data.vermieterAnschrift,
      hzlWohngeldBewilligtBis:        data.wohngeldBewilligtBis,
      hzlWohngeldBetrag:              data.wohngeldBetrag,
      hzlHeizungsart:                 data.heizungsart,
      hzlEnergieart:                  data.energieart,
      hzlKochfeuerungEnthalten:       data.kochfeuerungEnthalten,
      hzlHeizungspauschale:           data.heizungspauschale,
      hzlHeizungspauschaleWarmwasser: data.heizungspauschaleWarmwasser,
      hzlHeizungspauschaleZahlenAn:   data.heizungspauschaleZahlenAn,
      hzlEinnahmenUntervermietung:    data.einnahmenUntervermietung,
      hzlPersonenImHaushalt:          data.personenImHaushalt,
      hzlLeerRaeume:                  data.leerRaeume,
      hzlMobiertRaeume:               data.mobiertRaeume,
      hzlMieterVorname:               data.mieterVorname,
      hzlMieterNachname:              data.mieterNachname,
      hzlEnergieartSonstige:          data.energieartSonstige,
    });
    nextStep();
  });

  return (
    <FormStep
      title="Wohnkosten"
      subtitle="Angaben zu Ihrer Wohnsituation und den monatlichen Wohnkosten."
      onNext={onNext}
      onBack={prevStep}
    >
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Mietkosten
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Vorname Mieter*in" optional {...register("mieterVorname")} />
          <Input label="Nachname Mieter*in" optional {...register("mieterNachname")} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Kaltmiete (€/Monat)"
            required
            inputMode="decimal"
            numericOnly="currency"
            error={errors.kaltmiete?.message}
            {...register("kaltmiete")}
          />
          <Input
            label="Nebenkosten (€/Monat)"
            optional
            inputMode="decimal"
            numericOnly="currency"
            {...register("nebenkosten")}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Wohnungsgröße (m²)" optional inputMode="decimal" {...register("wohnungGroesseQm")} />
          <Input label="Anzahl Räume gesamt" optional inputMode="numeric" numericOnly="integer" {...register("wohnungAnzahlRaeume")} />
          <Input label="Personen im Haushalt" optional inputMode="numeric" numericOnly="integer" {...register("personenImHaushalt")} />
        </div>
        <FileUpload
          label="Mietbescheinigung"
          fieldName="hzl_wk_mietbescheinigung"
          required
          currentFileName={fileRefs.find((f) => f.field === "hzl_wk_mietbescheinigung")?.name}
          error={fileErrors["hzl_wk_mietbescheinigung"]}
          onFileSelect={(file, field, base64) => {
            addFile({ field, name: file.name, size: file.size, type: file.type, base64, file });
            setFileErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
          }}
          onFileRemove={removeFile}
        />
        <FileUpload
          label="Letzte Betriebskostenabrechnung"
          fieldName="hzl_wk_betriebskosten"
          optional
          currentFileName={fileRefs.find((f) => f.field === "hzl_wk_betriebskosten")?.name}
          onFileSelect={(file, field, base64) =>
            addFile({ field, name: file.name, size: file.size, type: file.type, base64, file })
          }
          onFileRemove={removeFile}
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Vermieter
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name des Vermieters" optional {...register("vermieterName")} />
          <Input label="Anschrift des Vermieters" optional {...register("vermieterAnschrift")} />
        </div>
      </fieldset>

      <RadioGroup
        name="untervermietet"
        legend="Wird die Wohnung untervermietet?"
        layout="horizontal"
        value={untervermietet ?? ""}
        onChange={(v) => setValue("untervermietet", v as "ja" | "nein")}
        options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
      />

      {untervermietet === "ja" && (
        <div className="space-y-4 pl-4 border-l-2 border-brand-accent/30">
          <Input
            label="Einnahmen Untervermietung (€/Monat)"
            optional
            inputMode="decimal"
            numericOnly="currency"
            {...register("einnahmenUntervermietung")}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Anzahl leer stehende Räume" optional inputMode="numeric" numericOnly="integer" {...register("leerRaeume")} />
            <Input label="Anzahl möblierte Räume" optional inputMode="numeric" numericOnly="integer" {...register("mobiertRaeume")} />
          </div>
        </div>
      )}

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Wohngeld
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <DateInput label="Wohngeld bewilligt bis" optional {...register("wohngeldBewilligtBis")} />
          <Input
            label="Wohngeldbetrag (€/Monat)"
            optional
            inputMode="decimal"
            numericOnly="currency"
            {...register("wohngeldBetrag")}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Heizung
        </legend>
        <RadioGroup
          name="heizungsart"
          legend="Heizungsart"
          layout="horizontal"
          value={heizungsart ?? ""}
          onChange={(v) => setValue("heizungsart", v as "zentral" | "einzel")}
          options={HEIZUNGSART_OPTIONS}
        />
        <RadioGroup
          name="energieart"
          legend="Energieart"
          value={watch("energieart") ?? ""}
          onChange={(v) => setValue("energieart", v)}
          options={ENERGIEART_OPTIONS}
        />
        <RadioGroup
          name="kochfeuerungEnthalten"
          legend="Kochfeuerung in Heizung enthalten?"
          layout="horizontal"
          value={watch("kochfeuerungEnthalten") ?? ""}
          onChange={(v) => setValue("kochfeuerungEnthalten", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Heizungspauschale (€/Monat)"
            optional
            inputMode="decimal"
            numericOnly="currency"
            {...register("heizungspauschale")}
          />
          <Input
            label="Heizungspauschale zahlen an"
            optional
            {...register("heizungspauschaleZahlenAn")}
          />
        </div>
        <RadioGroup
          name="heizungspauschaleWarmwasser"
          legend="Heizungspauschale inkl. Warmwasserversorgung?"
          layout="horizontal"
          value={watch("heizungspauschaleWarmwasser") ?? ""}
          onChange={(v) => setValue("heizungspauschaleWarmwasser", v as "ohne" | "mit")}
          options={WARMWASSER_OPTIONS}
        />
      </fieldset>
    </FormStep>
  );
}
