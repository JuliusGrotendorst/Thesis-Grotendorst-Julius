"use client";

import { useState } from "react";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import RadioGroup from "@/components/ui/RadioGroup";
import Button from "@/components/ui/Button";

// Section I: people who may owe maintenance TO the applicant
interface UnterhaltspflichtigePerson {
  name: string;
  verwandtschaft: string;
  anschrift: string;
  geburtsdatum: string;
  aktenzeichen: string;
}

// Section II: people TO WHOM the applicant owes maintenance
interface UnterhaltsberechtigtePerson {
  name: string;
  verwandtschaft: string;
  anschrift: string;
  geburtsdatum: string;
  aktenzeichen: string;
}

// Section III: children from non-marital relationships
interface NichtehelichesKind {
  kindVorname: string;
  kindNachname: string;
  elternteilName: string;
  elternteilAnschrift: string;
  unterhaltBeantragt: string;
  unterhaltMonatlich: string;
  unterhaltAbWann: string;
  vaterschaftAnerkennungDurch: string;
  vaterschaftAnerkennungAm: string;
  jugendamtName: string;
  jugendamtAnschrift: string;
}

const emptyUnterhaltsperson = (): UnterhaltspflichtigePerson => ({
  name: "",
  verwandtschaft: "",
  anschrift: "",
  geburtsdatum: "",
  aktenzeichen: "",
});

const emptyUnterhaltsberechtigte = (): UnterhaltsberechtigtePerson => ({
  name: "",
  verwandtschaft: "",
  anschrift: "",
  geburtsdatum: "",
  aktenzeichen: "",
});

const emptyKind = (): NichtehelichesKind => ({
  kindVorname: "",
  kindNachname: "",
  elternteilName: "",
  elternteilAnschrift: "",
  unterhaltBeantragt: "",
  unterhaltMonatlich: "",
  unterhaltAbWann: "",
  vaterschaftAnerkennungDurch: "",
  vaterschaftAnerkennungAm: "",
  jugendamtName: "",
  jugendamtAnschrift: "",
});

export default function StepHzL06Unterhalt() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const savedUnterhalt         = (formData.hzlUnterhaltspflichtige as UnterhaltspflichtigePerson[] | undefined) ?? [];
  const savedUnterhaltsber     = (formData.hzlUnterhaltsberechtigte as UnterhaltsberechtigtePerson[] | undefined) ?? [];
  const savedBerufe            = (formData.hzlBerufeElternKinder as { beziehung: string; beruf: string }[] | undefined) ?? [];
  const savedKinder            = (formData.hzlNichtehelicheKinder as NichtehelichesKind[] | undefined) ?? [];

  const [personen,             setPersonen]             = useState<UnterhaltspflichtigePerson[]>(savedUnterhalt);
  const [unterhaltsberechtigte, setUnterhaltsberechtigte] = useState<UnterhaltsberechtigtePerson[]>(savedUnterhaltsber);
  const [berufe,               setBerufe]               = useState<{ beziehung: string; beruf: string }[]>(
    savedBerufe.length > 0 ? savedBerufe : [{ beziehung: "", beruf: "" }, { beziehung: "", beruf: "" }]
  );
  const [kinder,               setKinder]               = useState<NichtehelichesKind[]>(savedKinder);

  const onNext = () => {
    updateFormData({
      hzlUnterhaltspflichtige:  personen,
      hzlUnterhaltsberechtigte: unterhaltsberechtigte,
      hzlBerufeElternKinder:    berufe,
      hzlNichtehelicheKinder:   kinder,
    });
    nextStep();
  };

  const updatePerson = (idx: number, p: UnterhaltspflichtigePerson) => {
    const updated = [...personen];
    updated[idx] = p;
    setPersonen(updated);
  };

  const updateUnterhaltsberechtigte = (idx: number, p: UnterhaltsberechtigtePerson) => {
    const updated = [...unterhaltsberechtigte];
    updated[idx] = p;
    setUnterhaltsberechtigte(updated);
  };

  const updateBeruf = (idx: number, field: "beziehung" | "beruf", value: string) => {
    const updated = [...berufe];
    updated[idx] = { ...updated[idx], [field]: value };
    setBerufe(updated);
  };

  const updateKind = (idx: number, k: NichtehelichesKind) => {
    const updated = [...kinder];
    updated[idx] = k;
    setKinder(updated);
  };

  const showBerufe = personen.length > 0 || unterhaltsberechtigte.length > 0;

  return (
    <FormStep
      title="Unterhaltspflichtige Personen"
      subtitle="Angaben zu Personen, die Ihnen gegenüber unterhaltspflichtig sein könnten."
      onNext={onNext}
      onBack={prevStep}
    >
      {/* Abschnitt I: Unterhaltspflichtige außerhalb des Haushalts */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-neutral-800 border-b border-neutral-200 pb-2">
          I. Personen mit möglicher Unterhaltspflicht außerhalb des Haushalts
        </h3>

        {personen.length === 0 && (
          <p className="text-sm text-neutral-500 italic">Keine Personen eingetragen.</p>
        )}

        {personen.map((p, idx) => (
          <div key={idx} className="border border-neutral-200 rounded-sm p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-neutral-800">Person {idx + 1}</h4>
              <button
                type="button"
                onClick={() => setPersonen(personen.filter((_, i) => i !== idx))}
                className="text-sm text-brand-danger hover:underline"
              >
                Entfernen ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Name"
                optional
                value={p.name}
                onChange={(e) => updatePerson(idx, { ...p, name: e.target.value })}
              />
              <DateInput
                label="Geburtsdatum"
                optional
                value={p.geburtsdatum}
                onChange={(e) => updatePerson(idx, { ...p, geburtsdatum: e.target.value })}
              />
            </div>
            <Input
              label="Verwandtschaftsverhältnis zur antragstellenden Person"
              optional
              placeholder="z. B. Elternteil, volljähriges Kind, Ehegatte/in"
              value={p.verwandtschaft}
              onChange={(e) => updatePerson(idx, { ...p, verwandtschaft: e.target.value })}
            />
            <Input
              label="Anschrift"
              optional
              value={p.anschrift}
              onChange={(e) => updatePerson(idx, { ...p, anschrift: e.target.value })}
            />
            <Input
              label="Aktenzeichen des Unterhaltsverfahrens"
              optional
              value={p.aktenzeichen}
              onChange={(e) => updatePerson(idx, { ...p, aktenzeichen: e.target.value })}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          onClick={() => setPersonen([...personen, emptyUnterhaltsperson()])}
          className="w-full justify-center"
        >
          + Unterhaltspflichtige Person hinzufügen
        </Button>
      </section>

      {/* Abschnitt II: Unterhaltsberechtigte Personen */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-neutral-800 border-b border-neutral-200 pb-2">
          II. Unterhaltsberechtigte Personen außerhalb des Haushalts (denen gegenüber Sie unterhaltspflichtig sind)
        </h3>

        {unterhaltsberechtigte.length === 0 && (
          <p className="text-sm text-neutral-500 italic">Keine Personen eingetragen.</p>
        )}

        {unterhaltsberechtigte.map((p, idx) => (
          <div key={idx} className="border border-neutral-200 rounded-sm p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-neutral-800">Person {idx + 1}</h4>
              <button
                type="button"
                onClick={() => setUnterhaltsberechtigte(unterhaltsberechtigte.filter((_, i) => i !== idx))}
                className="text-sm text-brand-danger hover:underline"
              >
                Entfernen ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Name"
                optional
                value={p.name}
                onChange={(e) => updateUnterhaltsberechtigte(idx, { ...p, name: e.target.value })}
              />
              <DateInput
                label="Geburtsdatum"
                optional
                value={p.geburtsdatum}
                onChange={(e) => updateUnterhaltsberechtigte(idx, { ...p, geburtsdatum: e.target.value })}
              />
            </div>
            <Input
              label="Verwandtschaftsverhältnis zur antragstellenden Person"
              optional
              placeholder="z. B. minderjähriges Kind, Ehegatte/in"
              value={p.verwandtschaft}
              onChange={(e) => updateUnterhaltsberechtigte(idx, { ...p, verwandtschaft: e.target.value })}
            />
            <Input
              label="Anschrift"
              optional
              value={p.anschrift}
              onChange={(e) => updateUnterhaltsberechtigte(idx, { ...p, anschrift: e.target.value })}
            />
            <Input
              label="Aktenzeichen des Unterhaltsverfahrens"
              optional
              value={p.aktenzeichen}
              onChange={(e) => updateUnterhaltsberechtigte(idx, { ...p, aktenzeichen: e.target.value })}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          onClick={() => setUnterhaltsberechtigte([...unterhaltsberechtigte, emptyUnterhaltsberechtigte()])}
          className="w-full justify-center"
        >
          + Unterhaltsberechtigte Person hinzufügen
        </Button>
      </section>

      {/* Berufe der Eltern und Kinder (conditional) */}
      {showBerufe && (
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-neutral-800 border-b border-neutral-200 pb-2 w-full">
            Berufe der Eltern und Kinder
          </legend>
          <p className="text-sm text-neutral-600">
            Welche Berufe werden von Ihren Eltern und (leiblich oder adoptierten) Kindern ausgeübt?
          </p>

          {berufe.map((b, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-4 items-end">
              <Input
                label="Person (Beziehung)"
                optional
                placeholder='z. B. "Vater", "Kind 1"'
                value={b.beziehung}
                onChange={(e) => updateBeruf(idx, "beziehung", e.target.value)}
              />
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input
                    label="Beruf"
                    optional
                    value={b.beruf}
                    onChange={(e) => updateBeruf(idx, "beruf", e.target.value)}
                  />
                </div>
                {berufe.length > 2 && (
                  <button
                    type="button"
                    onClick={() => setBerufe(berufe.filter((_, i) => i !== idx))}
                    className="text-sm text-brand-danger hover:underline pb-2"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            onClick={() => setBerufe([...berufe, { beziehung: "", beruf: "" }])}
            className="w-full justify-center"
          >
            + Weitere Person
          </Button>
        </fieldset>
      )}

      {/* Abschnitt III: Nichteheliche Kinder */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-neutral-800 border-b border-neutral-200 pb-2">
          III. Kinder aus nichtehelichen Verbindungen
        </h3>

        {kinder.length === 0 && (
          <p className="text-sm text-neutral-500 italic">Keine Kinder eingetragen.</p>
        )}

        {kinder.map((k, idx) => (
          <div key={idx} className="border border-neutral-200 rounded-sm p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-neutral-800">Kind {idx + 1}</h4>
              <button
                type="button"
                onClick={() => setKinder(kinder.filter((_, i) => i !== idx))}
                className="text-sm text-brand-danger hover:underline"
              >
                Entfernen ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Vorname Kind"
                optional
                value={k.kindVorname}
                onChange={(e) => updateKind(idx, { ...k, kindVorname: e.target.value })}
              />
              <Input
                label="Nachname Kind"
                optional
                value={k.kindNachname}
                onChange={(e) => updateKind(idx, { ...k, kindNachname: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Name anderes Elternteil"
                optional
                value={k.elternteilName}
                onChange={(e) => updateKind(idx, { ...k, elternteilName: e.target.value })}
              />
              <Input
                label="Anschrift anderes Elternteil"
                optional
                value={k.elternteilAnschrift}
                onChange={(e) => updateKind(idx, { ...k, elternteilAnschrift: e.target.value })}
              />
            </div>
            <RadioGroup
              name={`unterhaltBeantragt_${idx}`}
              legend="Unterhalt beantragt?"
              layout="horizontal"
              value={k.unterhaltBeantragt}
              onChange={(v) => updateKind(idx, { ...k, unterhaltBeantragt: v })}
              options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Höhe des monatlichen Unterhalts (€)"
                optional
                inputMode="decimal"
                numericOnly="currency"
                value={k.unterhaltMonatlich}
                onChange={(e) => updateKind(idx, { ...k, unterhaltMonatlich: e.target.value })}
              />
              <Input
                label="Unterhalt ab wann (MM.JJJJ)"
                optional
                placeholder="z. B. 01.2024"
                value={k.unterhaltAbWann}
                onChange={(e) => updateKind(idx, { ...k, unterhaltAbWann: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Vaterschaft festgestellt durch"
                optional
                value={k.vaterschaftAnerkennungDurch}
                onChange={(e) => updateKind(idx, { ...k, vaterschaftAnerkennungDurch: e.target.value })}
              />
              <DateInput
                label="am"
                optional
                value={k.vaterschaftAnerkennungAm}
                onChange={(e) => updateKind(idx, { ...k, vaterschaftAnerkennungAm: e.target.value })}
              />
            </div>
            <p className="text-sm font-medium text-neutral-700">Bei Unterhaltsbeistandschaft:</p>
            <div className="grid grid-cols-2 gap-4 items-start">
              <Input
                label="Name des Jugendamts"
                optional
                value={k.jugendamtName}
                onChange={(e) => updateKind(idx, { ...k, jugendamtName: e.target.value })}
              />
              <Input
                label="Anschrift des Jugendamts"
                optional
                value={k.jugendamtAnschrift}
                onChange={(e) => updateKind(idx, { ...k, jugendamtAnschrift: e.target.value })}
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          onClick={() => setKinder([...kinder, emptyKind()])}
          className="w-full justify-center"
        >
          + Kind hinzufügen
        </Button>
      </section>
    </FormStep>
  );
}
