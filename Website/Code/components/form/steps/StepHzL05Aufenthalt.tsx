"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { hzlAufenthaltSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import RadioGroup from "@/components/ui/RadioGroup";
import Button from "@/components/ui/Button";

type FormValues = z.infer<typeof hzlAufenthaltSchema>;

interface UebertrittEntry {
  person: string;
  datum: string;
  ort: string;
  geborenaAusserhalb: string;
  einreiseDatum: string;
  beduerftigkeitErsterMonat: string;
  auslaendischeLeistungen: string;
  auslaendischeLeistungenDetails: string;
}

export default function StepHzL05Aufenthalt() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(hzlAufenthaltSchema),
    defaultValues: {
      zugezogenAm:                   (formData.zugezogenAm as string) ?? "",
      frueherAnschrift:              (formData.frueherAnschrift as string) ?? "",
      fruehereSozialhilfe:           formData.fruehereSozialhilfe as "ja" | "nein" | undefined,
      fruehereSozialhilfeVon:        (formData.fruehereSozialhilfeVon as string) ?? "",
      fruehereSozialhilfeBis:        (formData.fruehereSozialhilfeBis as string) ?? "",
      fruehereSozialhilfeWo:         (formData.fruehereSozialhilfeWo as string) ?? "",
      einrichtungsaufenthaltVorhanden: formData.einrichtungsaufenthaltVorhanden as "ja" | "nein" | undefined,
      kriegsereignisseAngehoerige:   formData.kriegsereignisseAngehoerige as "ja" | "nein" | undefined,
      ddrEntscheidungen:             formData.ddrEntscheidungen as "ja" | "nein" | undefined,
    },
  });

  const fruehereSozialhilfe = watch("fruehereSozialhilfe");
  const einrichtungVorhanden = watch("einrichtungsaufenthaltVorhanden");
  const kriegsereignisse    = watch("kriegsereignisseAngehoerige");
  const ddrEntscheidungen   = watch("ddrEntscheidungen");

  // Einrichtungsaufenthalte local state
  const [einrichtungVon, setEinrichtungVon] = useState<string>((formData.einrichtungVon as string) ?? "");
  const [einrichtungBis, setEinrichtungBis] = useState<string>((formData.einrichtungBis as string) ?? "");
  const [einrichtungIn, setEinrichtungIn] = useState<string>((formData.einrichtungIn as string) ?? "");
  const [einrichtungStationaer, setEinrichtungStationaer] = useState<boolean>((formData.einrichtungStationaer as boolean) ?? false);
  const [einrichtungUebergang, setEinrichtungUebergang] = useState<boolean>((formData.einrichtungUebergang as boolean) ?? false);
  const [einrichtungKostentraeger, setEinrichtungKostentraeger] = useState<string>((formData.einrichtungKostentraeger as string) ?? "");
  const [einrichtungEntlassung, setEinrichtungEntlassung] = useState<string>((formData.einrichtungEntlassung as string) ?? "");

  // Übertritt entries local state
  const savedUebertritt = (formData.hzlUebertrittEntries as UebertrittEntry[] | undefined) ?? [];
  const [uebertritteEntries, setUebertritteEntries] = useState<UebertrittEntry[]>(savedUebertritt);

  // Kriegsereignisse Angehörige local state
  const savedKriegsAngehoerige = (formData.kriegsAngehoerige as {familienname:string;vorname:string;geburtsdatum:string;verwandtschaft:string;letzterFamilienstand:string}[] | undefined) ?? [];
  const [kriegsAngehoerige, setKriegsAngehoerige] = useState(savedKriegsAngehoerige);

  // DDR Angehörige local state
  const savedDdrAngehoerige = (formData.ddrAngehoerige as {familienname:string;vorname:string;geburtsdatum:string;verwandtschaft:string;letzterFamilienstand:string}[] | undefined) ?? [];
  const [ddrAngehoerige, setDdrAngehoerige] = useState(savedDdrAngehoerige);

  const onNext = handleSubmit((data) => {
    // Einrichtungsdetails nur speichern, wenn Ja markiert
    const einrichtungFelder = data.einrichtungsaufenthaltVorhanden === "ja"
      ? { einrichtungVon, einrichtungBis, einrichtungIn, einrichtungStationaer, einrichtungUebergang, einrichtungKostentraeger, einrichtungEntlassung }
      : { einrichtungVon: "", einrichtungBis: "", einrichtungIn: "", einrichtungStationaer: false, einrichtungUebergang: false, einrichtungKostentraeger: "", einrichtungEntlassung: "" };
    updateFormData({ ...data, ...einrichtungFelder, hzlUebertrittEntries: uebertritteEntries, kriegsAngehoerige, ddrAngehoerige });
    nextStep();
  });

  return (
    <FormStep
      title="Aufenthaltsverhältnisse"
      subtitle="Angaben zu Ihrem Aufenthalt in Borken und früheren Sozialleistungen."
      onNext={onNext}
      onBack={prevStep}
    >
      {/* Abschnitt III: Aufenthaltsverhältnisse */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          III. Aufenthaltsverhältnisse
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <DateInput label="Zugezogen nach Borken am" optional {...register("zugezogenAm")} />
          <Input label="Frühere Anschrift" optional placeholder="Straße, PLZ Ort" {...register("frueherAnschrift")} />
        </div>

        <RadioGroup
          name="fruehereSozialhilfe"
          legend="Frühere Sozialhilfe bezogen?"
          required
          error={errors.fruehereSozialhilfe?.message}
          layout="horizontal"
          value={fruehereSozialhilfe ?? ""}
          onChange={(v) => setValue("fruehereSozialhilfe", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />

        {fruehereSozialhilfe === "ja" && (
          <div className="space-y-4 pl-4 border-l-2 border-brand-accent/30">
            <div className="grid grid-cols-2 gap-4">
              <DateInput label="Von" optional {...register("fruehereSozialhilfeVon")} />
              <DateInput label="Bis" optional {...register("fruehereSozialhilfeBis")} />
            </div>
            <Input label="Bei welcher Stelle / Gemeinde?" optional {...register("fruehereSozialhilfeWo")} />
          </div>
        )}

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
            Einrichtungsaufenthalte in den letzten 2 Monaten
          </legend>
          <RadioGroup
            name="einrichtungsaufenthaltVorhanden"
            legend="Hatten Sie in den letzten 2 Monaten einen Einrichtungsaufenthalt?"
            required
            error={errors.einrichtungsaufenthaltVorhanden?.message}
            layout="horizontal"
            value={einrichtungVorhanden ?? ""}
            onChange={(v) => setValue("einrichtungsaufenthaltVorhanden", v as "ja" | "nein")}
            options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
          />
          {einrichtungVorhanden === "ja" && (
            <div className="space-y-4 pl-4 border-l-2 border-brand-accent/30">
              <div className="grid grid-cols-2 gap-4">
                <DateInput label="Von" optional value={einrichtungVon} onChange={(e) => setEinrichtungVon(e.target.value)} />
                <DateInput label="Bis" optional value={einrichtungBis} onChange={(e) => setEinrichtungBis(e.target.value)} />
              </div>
              <Input
                label="In (Zeiten, Orte ggf. mit Kreiszugehörigkeit, lückenlos angeben)"
                optional
                value={einrichtungIn}
                onChange={(e) => setEinrichtungIn(e.target.value)}
              />
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input type="checkbox" className="accent-brand-accent w-4 h-4" checked={einrichtungStationaer} onChange={(e) => setEinrichtungStationaer(e.target.checked)} />
                  Stationäre Einrichtung
                </label>
                <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input type="checkbox" className="accent-brand-accent w-4 h-4" checked={einrichtungUebergang} onChange={(e) => setEinrichtungUebergang(e.target.checked)} />
                  Übergangseinrichtung
                </label>
              </div>
              <Input
                label="Kostenträger des letzten Aufenthaltes in einer Einrichtung"
                optional
                value={einrichtungKostentraeger}
                onChange={(e) => setEinrichtungKostentraeger(e.target.value)}
              />
              <DateInput
                label="Tag der Entlassung aus der Einrichtung (falls bereits entlassen)"
                optional
                value={einrichtungEntlassung}
                onChange={(e) => setEinrichtungEntlassung(e.target.value)}
              />
            </div>
          )}
        </fieldset>
      </fieldset>

      {/* Abschnitt IV: Übertritt aus dem Ausland */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          IV. Übertritt aus dem Ausland innerhalb des letzten Monats
        </legend>

        {uebertritteEntries.length === 0 && (
          <p className="text-sm text-neutral-500 italic">Kein Übertritt eingetragen.</p>
        )}

        {uebertritteEntries.map((entry, idx) => (
          <div key={idx} className="border border-neutral-200 rounded-sm p-4 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-neutral-700">Person {idx + 1}</p>
              <button type="button" onClick={() => setUebertritteEntries(uebertritteEntries.filter((_, i) => i !== idx))} className="text-sm text-brand-danger hover:underline">Entfernen ×</button>
            </div>
            <Input label="Person (Name)" optional value={entry.person} onChange={(e) => { const u = [...uebertritteEntries]; u[idx] = {...u[idx], person: e.target.value}; setUebertritteEntries(u); }} />
            <div className="grid grid-cols-2 gap-4">
              <DateInput label="Datum des Übertritts" optional value={entry.datum} onChange={(e) => { const u = [...uebertritteEntries]; u[idx] = {...u[idx], datum: e.target.value}; setUebertritteEntries(u); }} />
              <Input label="Ort des Übertritts" optional value={entry.ort} onChange={(e) => { const u = [...uebertritteEntries]; u[idx] = {...u[idx], ort: e.target.value}; setUebertritteEntries(u); }} />
            </div>
            <RadioGroup name={`geborenaAusserhalb_${idx}`} legend="Außerhalb Deutschlands geboren?" layout="horizontal" value={entry.geborenaAusserhalb} onChange={(v) => { const u = [...uebertritteEntries]; u[idx] = {...u[idx], geborenaAusserhalb: v}; setUebertritteEntries(u); }} options={[{value:"ja",label:"Ja"},{value:"nein",label:"Nein"}]} />
            {entry.geborenaAusserhalb === "ja" && (
              <DateInput label="Einreisedatum nach Deutschland" optional value={entry.einreiseDatum} onChange={(e) => { const u = [...uebertritteEntries]; u[idx] = {...u[idx], einreiseDatum: e.target.value}; setUebertritteEntries(u); }} />
            )}
            <RadioGroup name={`beduerftigkeitErsterMonat_${idx}`} legend="Bedürftigkeit bereits im ersten Monat nach Einreise?" layout="horizontal" value={entry.beduerftigkeitErsterMonat} onChange={(v) => { const u = [...uebertritteEntries]; u[idx] = {...u[idx], beduerftigkeitErsterMonat: v}; setUebertritteEntries(u); }} options={[{value:"ja",label:"Ja"},{value:"nein",label:"Nein"}]} />
            <RadioGroup name={`auslaendischeLeistungen_${idx}`} legend="Leistungen vom Herkunftsstaat oder internationaler Organisation?" layout="horizontal" value={entry.auslaendischeLeistungen} onChange={(v) => { const u = [...uebertritteEntries]; u[idx] = {...u[idx], auslaendischeLeistungen: v}; setUebertritteEntries(u); }} options={[{value:"ja",label:"Ja"},{value:"nein",label:"Nein"}]} />
            {entry.auslaendischeLeistungen === "ja" && (
              <Input label="Welche Leistungen?" optional value={entry.auslaendischeLeistungenDetails} onChange={(e) => { const u = [...uebertritteEntries]; u[idx] = {...u[idx], auslaendischeLeistungenDetails: e.target.value}; setUebertritteEntries(u); }} />
            )}
          </div>
        ))}

        <Button type="button" variant="secondary" onClick={() => setUebertritteEntries([...uebertritteEntries, {person:"",datum:"",ort:"",geborenaAusserhalb:"",einreiseDatum:"",beduerftigkeitErsterMonat:"",auslaendischeLeistungen:"",auslaendischeLeistungenDetails:""}])} className="w-full justify-center">
          + Person hinzufügen
        </Button>
      </fieldset>

      {/* Abschnitt V: Kriegsereignisse / DDR */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
          V. Kriegsereignisse und DDR-Entscheidungen
        </legend>
        <RadioGroup
          name="kriegsereignisseAngehoerige"
          legend="Sind Angehörige durch Kriegsereignisse gefallen, vermisst bzw. verstorben oder in Ausübung des Wehr-/Zivildienstes, durch Gewalttaten, durch Impfschäden geschädigt bzw. verstorben?"
          required
          error={errors.kriegsereignisseAngehoerige?.message}
          layout="horizontal"
          value={kriegsereignisse ?? ""}
          onChange={(v) => setValue("kriegsereignisseAngehoerige", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
        {kriegsereignisse === "ja" && (
          <div className="space-y-4 pl-4 border-l-2 border-brand-accent/30">
            {kriegsAngehoerige.map((a, i) => (
              <div key={i} className="border border-neutral-200 rounded-sm p-4 space-y-3">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold">Angehörige*r {i+1}</p>
                  <button type="button" onClick={() => setKriegsAngehoerige(kriegsAngehoerige.filter((_,j)=>j!==i))} className="text-sm text-brand-danger hover:underline">Entfernen ×</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Familienname" optional value={a.familienname} onChange={(e) => { const u=[...kriegsAngehoerige]; u[i]={...u[i],familienname:e.target.value}; setKriegsAngehoerige(u); }} />
                  <Input label="Vorname" optional value={a.vorname} onChange={(e) => { const u=[...kriegsAngehoerige]; u[i]={...u[i],vorname:e.target.value}; setKriegsAngehoerige(u); }} />
                  <DateInput label="Geburtsdatum" optional value={a.geburtsdatum} onChange={(e) => { const u=[...kriegsAngehoerige]; u[i]={...u[i],geburtsdatum:e.target.value}; setKriegsAngehoerige(u); }} />
                  <Input label="Verwandtschaftsverhältnis" optional value={a.verwandtschaft} onChange={(e) => { const u=[...kriegsAngehoerige]; u[i]={...u[i],verwandtschaft:e.target.value}; setKriegsAngehoerige(u); }} />
                </div>
                <Input label="Letzter Familienstand" optional value={a.letzterFamilienstand} onChange={(e) => { const u=[...kriegsAngehoerige]; u[i]={...u[i],letzterFamilienstand:e.target.value}; setKriegsAngehoerige(u); }} />
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={() => setKriegsAngehoerige([...kriegsAngehoerige, {familienname:"",vorname:"",geburtsdatum:"",verwandtschaft:"",letzterFamilienstand:""}])} className="w-full justify-center">+ Person hinzufügen</Button>
          </div>
        )}

        <RadioGroup
          name="ddrEntscheidungen"
          legend="Sind Angehörige von rechtsstaatswidrigen Entscheidungen der ehemaligen DDR betroffen?"
          required
          error={errors.ddrEntscheidungen?.message}
          layout="horizontal"
          value={ddrEntscheidungen ?? ""}
          onChange={(v) => setValue("ddrEntscheidungen", v as "ja" | "nein")}
          options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
        />
        {ddrEntscheidungen === "ja" && (
          <div className="space-y-4 pl-4 border-l-2 border-brand-accent/30">
            {ddrAngehoerige.map((a, i) => (
              <div key={i} className="border border-neutral-200 rounded-sm p-4 space-y-3">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold">Angehörige*r {i+1}</p>
                  <button type="button" onClick={() => setDdrAngehoerige(ddrAngehoerige.filter((_,j)=>j!==i))} className="text-sm text-brand-danger hover:underline">Entfernen ×</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Familienname" optional value={a.familienname} onChange={(e) => { const u=[...ddrAngehoerige]; u[i]={...u[i],familienname:e.target.value}; setDdrAngehoerige(u); }} />
                  <Input label="Vorname" optional value={a.vorname} onChange={(e) => { const u=[...ddrAngehoerige]; u[i]={...u[i],vorname:e.target.value}; setDdrAngehoerige(u); }} />
                  <DateInput label="Geburtsdatum" optional value={a.geburtsdatum} onChange={(e) => { const u=[...ddrAngehoerige]; u[i]={...u[i],geburtsdatum:e.target.value}; setDdrAngehoerige(u); }} />
                  <Input label="Verwandtschaftsverhältnis" optional value={a.verwandtschaft} onChange={(e) => { const u=[...ddrAngehoerige]; u[i]={...u[i],verwandtschaft:e.target.value}; setDdrAngehoerige(u); }} />
                </div>
                <Input label="Letzter Familienstand" optional value={a.letzterFamilienstand} onChange={(e) => { const u=[...ddrAngehoerige]; u[i]={...u[i],letzterFamilienstand:e.target.value}; setDdrAngehoerige(u); }} />
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={() => setDdrAngehoerige([...ddrAngehoerige, {familienname:"",vorname:"",geburtsdatum:"",verwandtschaft:"",letzterFamilienstand:""}])} className="w-full justify-center">+ Person hinzufügen</Button>
          </div>
        )}
      </fieldset>
    </FormStep>
  );
}
