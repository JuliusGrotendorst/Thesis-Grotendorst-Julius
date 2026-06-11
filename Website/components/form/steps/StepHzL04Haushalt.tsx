"use client";

import { useState } from "react";
import { z } from "zod";
import { hzlHaushaltPersonSchema } from "@/lib/schemas/antragSchema";
import { useFormStore, FileRef } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import Select from "@/components/ui/Select";
import RadioGroup from "@/components/ui/RadioGroup";
import Button from "@/components/ui/Button";
import InfoBox from "@/components/ui/InfoBox";
import FileUpload from "@/components/ui/FileUpload";
import { HZL_VERHAELTNIS_OPTIONS } from "@/lib/constants";

type HaushaltPerson = z.infer<typeof hzlHaushaltPersonSchema>;

const ANREDE_OPTIONS = ["Frau", "Herr", "Divers", "Keine Angabe"];

const FAMILIENSTAND_OPTIONS = [
  "Ledig",
  "Verheiratet",
  "Geschieden",
  "Verwitwet",
  "Eingetragene Lebenspartnerschaft",
  "Getrennt lebend",
];

const AUFENTHALTSSTATUS_OPTIONS = [
  { value: "eu",               label: "EU-Ausländer*in" },
  { value: "kriegsfluechtling", label: "Kriegs-/Bürgerkriegsflüchtling" },
  { value: "asyl",             label: "Asylberechtigte*r" },
  { value: "sonstiger",        label: "Sonstige*r Ausländer*in" },
];

const emptyPerson = (): HaushaltPerson => ({
  verhaeltnis: "",
  vorname: "",
  nachname: "",
  geburtsdatum: "",
  geburtsort: "",
  familienstand: "",
  familienstandSeit: "",
  staatsangehoerigkeit: "",
  aufenthaltsstatusAuslaender: undefined,
  beschaeftigung: undefined,
  einschraenkungArbeitskraft: undefined,
  volleErwerbsminderung: undefined,
  schwerbehinderungDatum: "",
  schwerbehinderungGrad: "",
  schwerbehinderungAntragGestellt: undefined,
  leistungenSelbst: undefined,
  anrede: "",
  strasse: "",
  plz: "",
  ort: "",
  geschiedenUrteilDatum: "",
  geschiedenGericht: "",
  geschiedenGeschaeftszeichen: "",
  hatBetreuung: undefined,
  betreuungVorname: "",
  betreuungNachname: "",
  betreuungAnschrift: "",
});

function PersonBlock({
  person,
  idx,
  onUpdate,
  onRemove,
  fileRefs,
  addFile,
  removeFile,
}: {
  person: HaushaltPerson;
  idx: number;
  onUpdate: (p: HaushaltPerson) => void;
  onRemove: () => void;
  fileRefs: FileRef[];
  addFile: (ref: FileRef) => void;
  removeFile: (field: string) => void;
}) {
  const isAuslaender =
    (person.staatsangehoerigkeit ?? "").trim() !== "" &&
    (person.staatsangehoerigkeit ?? "").toLowerCase() !== "deutsch";

  const set = <K extends keyof HaushaltPerson>(key: K, value: HaushaltPerson[K]) =>
    onUpdate({ ...person, [key]: value });

  return (
    <div className="border border-neutral-200 rounded-sm p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-neutral-800">Person {idx + 1}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-brand-danger hover:underline"
        >
          Entfernen ×
        </button>
      </div>

      <Select
        label="Verhältnis zur antragstellenden Person"
        required
        placeholder="Bitte wählen"
        options={HZL_VERHAELTNIS_OPTIONS}
        value={person.verhaeltnis}
        onChange={(e) => set("verhaeltnis", e.target.value)}
      />

      <Select
        label="Anrede"
        placeholder="Bitte wählen (optional)"
        options={ANREDE_OPTIONS}
        value={person.anrede ?? ""}
        onChange={(e) => set("anrede", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Vorname"
          required
          value={person.vorname}
          onChange={(e) => set("vorname", e.target.value)}
        />
        <Input
          label="Nachname"
          required
          value={person.nachname}
          onChange={(e) => set("nachname", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DateInput
          label="Geburtsdatum"
          required
          value={person.geburtsdatum}
          onChange={(e) => set("geburtsdatum", e.target.value)}
        />
        <Input
          label="Geburtsort"
          optional
          value={person.geburtsort ?? ""}
          onChange={(e) => set("geburtsort", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Staatsangehörigkeit"
          optional
          value={person.staatsangehoerigkeit ?? ""}
          onChange={(e) => set("staatsangehoerigkeit", e.target.value)}
        />
        <Select
          label="Familienstand"
          placeholder="Bitte wählen (optional)"
          options={FAMILIENSTAND_OPTIONS}
          value={person.familienstand ?? ""}
          onChange={(e) => set("familienstand", e.target.value)}
        />
      </div>

      <Input
        label="Familienstand seit"
        optional
        placeholder="MM.JJJJ"
        value={person.familienstandSeit ?? ""}
        onChange={(e) => set("familienstandSeit", e.target.value)}
      />

      <fieldset>
        <legend className="text-sm font-semibold text-neutral-800 mb-3">Anschrift</legend>
        <div className="space-y-4">
          <Input
            label="Straße und Hausnummer"
            optional
            value={person.strasse ?? ""}
            onChange={(e) => set("strasse", e.target.value)}
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="PLZ"
              optional
              inputMode="numeric"
              maxLength={5}
              numericOnly="integer"
              value={person.plz ?? ""}
              onChange={(e) => set("plz", e.target.value)}
            />
            <div className="col-span-2">
              <Input
                label="Ort"
                optional
                value={person.ort ?? ""}
                onChange={(e) => set("ort", e.target.value)}
              />
            </div>
          </div>
        </div>
      </fieldset>

      {isAuslaender && (
        <RadioGroup
          name={`aufenthalt_${idx}`}
          legend="Aufenthaltsrechtlicher Status"
          value={person.aufenthaltsstatusAuslaender ?? ""}
          onChange={(v) => set("aufenthaltsstatusAuslaender", v)}
          options={AUFENTHALTSSTATUS_OPTIONS}
        />
      )}

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Erwerbssituation (für Personen zwischen 15 und 66 Jahren)
        </legend>
        <RadioGroup
          name={`beschaeftigung_${idx}`}
          legend="Beschäftigung vorhanden?"
          layout="horizontal"
          value={person.beschaeftigung ?? ""}
          onChange={(v) => set("beschaeftigung", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
        <RadioGroup
          name={`einschraenkung_${idx}`}
          legend="Einschränkung der Arbeitskraft?"
          layout="horizontal"
          value={person.einschraenkungArbeitskraft ?? ""}
          onChange={(v) => set("einschraenkungArbeitskraft", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
        <RadioGroup
          name={`erwerbsminderung_${idx}`}
          legend="Volle Erwerbsminderung?"
          layout="horizontal"
          value={person.volleErwerbsminderung ?? ""}
          onChange={(v) => set("volleErwerbsminderung", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Anerkannte Schwerbehinderung
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <DateInput
            label="Datum der Anerkennung"
            optional
            value={person.schwerbehinderungDatum ?? ""}
            onChange={(e) => set("schwerbehinderungDatum", e.target.value)}
          />
          <Input
            label="Grad der Behinderung (%)"
            optional
            inputMode="numeric"
            numericOnly="integer"
            value={person.schwerbehinderungGrad ?? ""}
            onChange={(e) => set("schwerbehinderungGrad", e.target.value)}
          />
        </div>
        <RadioGroup
          name={`schwerb_antrag_${idx}`}
          legend="Antrag auf Schwerbehindertenausweis gestellt?"
          layout="horizontal"
          value={person.schwerbehinderungAntragGestellt ?? ""}
          onChange={(v) => set("schwerbehinderungAntragGestellt", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
      </fieldset>

      <RadioGroup
        name={`leistungen_selbst_${idx}`}
        legend="Bestreitet den Lebensunterhalt selbst?"
        layout="horizontal"
        value={person.leistungenSelbst ?? ""}
        onChange={(v) => set("leistungenSelbst", v as "ja" | "nein")}
        options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
      />

      <fieldset className="space-y-3 pl-4 border-l-2 border-brand-accent/30">
        <legend className="text-sm font-semibold text-neutral-800">Bei geschiedenen oder getrennt lebenden Ehegatten</legend>
        <div className="grid grid-cols-3 gap-4">
          <DateInput
            label="Urteil vom"
            optional
            value={person.geschiedenUrteilDatum ?? ""}
            onChange={(e) => set("geschiedenUrteilDatum", e.target.value)}
          />
          <Input
            label="Gericht"
            optional
            value={person.geschiedenGericht ?? ""}
            onChange={(e) => set("geschiedenGericht", e.target.value)}
          />
          <Input
            label="Geschäftszeichen"
            optional
            value={person.geschiedenGeschaeftszeichen ?? ""}
            onChange={(e) => set("geschiedenGeschaeftszeichen", e.target.value)}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          Betreuung / Vollmacht / Vormund
        </legend>
        <RadioGroup
          name={`hatBetreuung_${idx}`}
          legend="Steht diese Person unter rechtlicher Betreuung oder Vollmacht?"
          layout="horizontal"
          value={person.hatBetreuung ?? ""}
          onChange={(v) => set("hatBetreuung", v as "ja" | "nein")}
          options={[{ value: "nein", label: "Nein" }, { value: "ja", label: "Ja" }]}
        />
        {person.hatBetreuung === "ja" && (
          <div className="space-y-3 pl-4 border-l-2 border-brand-accent/30">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Vorname Betreuer*in"
                optional
                value={person.betreuungVorname ?? ""}
                onChange={(e) => set("betreuungVorname", e.target.value)}
              />
              <Input
                label="Nachname Betreuer*in"
                optional
                value={person.betreuungNachname ?? ""}
                onChange={(e) => set("betreuungNachname", e.target.value)}
              />
            </div>
            <Input
              label="Anschrift Betreuer*in"
              optional
              value={person.betreuungAnschrift ?? ""}
              onChange={(e) => set("betreuungAnschrift", e.target.value)}
            />
            <FileUpload
              label="Betreuerausweis oder Vollmacht"
              fieldName={`hzl_betreuung_dok_${idx}`}
              hint="PDF, JPG oder PNG · max. 10 MB"
              optional
              currentFileName={fileRefs.find((f) => f.field === `hzl_betreuung_dok_${idx}`)?.name}
              onFileSelect={(file, field, base64) => addFile({ field, name: file.name, size: file.size, type: file.type, base64, file })}
              onFileRemove={removeFile}
            />
          </div>
        )}
      </fieldset>

      <FileUpload
        label="Personalausweis, Reisepass oder Aufenthaltstitel"
        fieldName={`hzl_ausweis_person_${idx}`}
        hint="Vorder- und Rückseite · PDF, JPG oder PNG · max. 10 MB"
        optional
        currentFileName={fileRefs.find((f) => f.field === `hzl_ausweis_person_${idx}`)?.name}
        onFileSelect={(file, field, base64) => addFile({ field, name: file.name, size: file.size, type: file.type, base64, file })}
        onFileRemove={removeFile}
      />
    </div>
  );
}

export default function StepHzL04Haushalt() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const saved = (formData.hzlHaushaltPersonen as HaushaltPerson[] | undefined) ?? [];
  const [personen, setPersonen] = useState<HaushaltPerson[]>(saved);

  const onNext = () => {
    updateFormData({
      hzlHaushaltPersonen: personen,
    });
    nextStep();
  };

  const updatePerson = (idx: number, p: HaushaltPerson) => {
    const updated = [...personen];
    updated[idx] = p;
    setPersonen(updated);
  };

  return (
    <FormStep
      title="Haushaltsmitglieder"
      subtitle="Geben Sie alle Personen an, die mit Ihnen in einem gemeinsamen Haushalt leben."
      onNext={onNext}
      onBack={prevStep}
    >
      <InfoBox>
        Erfassen Sie alle im Haushalt lebenden Personen (Ehegatte/in, Kinder, weitere Angehörige).
        Die antragstellende Person selbst wird hier nicht eingetragen.
      </InfoBox>

      {personen.length === 0 && (
        <p className="text-sm text-neutral-500 italic py-3">
          Keine weiteren Personen eingetragen. Klicken Sie unten auf „Person hinzufügen" oder fahren Sie fort, wenn Sie allein leben.
        </p>
      )}

      {personen.map((person, idx) => (
        <PersonBlock
          key={idx}
          person={person}
          idx={idx}
          onUpdate={(p) => updatePerson(idx, p)}
          onRemove={() => setPersonen(personen.filter((_, i) => i !== idx))}
          fileRefs={fileRefs}
          addFile={addFile}
          removeFile={removeFile}
        />
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() => setPersonen([...personen, emptyPerson()])}
        className="w-full justify-center"
      >
        + Person hinzufügen
      </Button>
    </FormStep>
  );
}
