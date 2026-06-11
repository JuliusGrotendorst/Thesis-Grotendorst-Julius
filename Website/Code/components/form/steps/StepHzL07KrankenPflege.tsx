"use client";

import { useState } from "react";
import { z } from "zod";
import { hzlHaushaltPersonSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import Select from "@/components/ui/Select";
import InfoBox from "@/components/ui/InfoBox";

type HaushaltPerson = z.infer<typeof hzlHaushaltPersonSchema>;

const VERSICHERUNGSART_OPTIONS = [
  { value: "keine",            label: "Nicht versichert" },
  { value: "pflicht",          label: "Pflichtversicherung (gesetzlich)" },
  { value: "freiwillig",       label: "Freiwillige Versicherung (gesetzlich)" },
  { value: "familienversichert", label: "Familienversichert" },
  { value: "privat",           label: "Private Krankenversicherung" },
];

interface PersonVersicherung {
  personName: string;
  krankenversicherung: string;
  krankenKasse: string;
  krankenVersicherungsnummer: string;
  krankenVon: string;
  krankenBis: string;
  pflegeversicherung: string;
  pflegeKasse: string;
  pflegeVersicherungsnummer: string;
  pflegeVon: string;
  pflegeBis: string;
}

const buildDefault = (name: string): PersonVersicherung => ({
  personName: name,
  krankenversicherung: "",
  krankenKasse: "",
  krankenVersicherungsnummer: "",
  krankenVon: "",
  krankenBis: "",
  pflegeversicherung: "",
  pflegeKasse: "",
  pflegeVersicherungsnummer: "",
  pflegeVon: "",
  pflegeBis: "",
});

export default function StepHzL07KrankenPflege() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const mainName =
    `${(formData.vorname as string) ?? ""} ${(formData.nachname as string) ?? ""}`.trim() ||
    "Antragsteller*in";
  const hhPersonen = (formData.hzlHaushaltPersonen as HaushaltPerson[] | undefined) ?? [];
  const allNames   = [mainName, ...hhPersonen.map((p) => `${p.vorname} ${p.nachname}`.trim())];

  const saved      = (formData.hzlKrankenPflege as PersonVersicherung[] | undefined) ?? [];
  const initData   = () =>
    allNames.map((name) => saved.find((s) => s.personName === name) ?? buildDefault(name));

  const [data, setData] = useState<PersonVersicherung[]>(initData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (idx: number, patch: Partial<PersonVersicherung>) => {
    const updated = [...data];
    updated[idx]  = { ...updated[idx], ...patch };
    setData(updated);
    // Fehler entfernen, sobald die Person eine Auswahl trifft
    setErrors((prev) => {
      const next = { ...prev };
      if (patch.krankenversicherung) delete next[`kv_${idx}`];
      if (patch.pflegeversicherung)  delete next[`pv_${idx}`];
      return next;
    });
  };

  const onNext = () => {
    const errs: Record<string, string> = {};
    data.forEach((p, idx) => {
      if (!p.krankenversicherung) errs[`kv_${idx}`] = "Bitte Krankenversicherungsart wählen.";
      if (!p.pflegeversicherung)  errs[`pv_${idx}`] = "Bitte Pflegeversicherungsart wählen.";
    });
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    updateFormData({ hzlKrankenPflege: data });
    nextStep();
  };

  return (
    <FormStep
      title="Kranken- und Pflegeversicherung"
      subtitle="Angaben zur Kranken- und Pflegeversicherung aller Haushaltsmitglieder."
      onNext={onNext}
      onBack={prevStep}
    >
      <InfoBox>
        Bitte machen Sie Angaben zur Versicherung für alle im Haushalt lebenden Personen, einschließlich der
        antragstellenden Person.
      </InfoBox>

      {data.map((entry, idx) => (
        <fieldset key={idx} className="border border-neutral-200 rounded-sm p-5 space-y-5">
          <legend className="text-sm font-semibold text-neutral-800 px-1">
            {idx === 0 ? `${entry.personName} (Antragsteller*in)` : entry.personName}
          </legend>

          <div className="space-y-3">
            <p className="text-sm font-medium text-neutral-700 border-b border-neutral-100 pb-1">
              Krankenversicherung
            </p>
            <Select
              label="Versicherungsart"
              required
              placeholder="Bitte wählen"
              options={VERSICHERUNGSART_OPTIONS}
              error={errors[`kv_${idx}`]}
              value={entry.krankenversicherung}
              onChange={(e) => update(idx, { krankenversicherung: e.target.value })}
            />
            {entry.krankenversicherung && entry.krankenversicherung !== "keine" && (
              <>
                <Input
                  label="Krankenkasse / Versicherungsträger"
                  optional
                  value={entry.krankenKasse}
                  onChange={(e) => update(idx, { krankenKasse: e.target.value })}
                />
                <Input
                  label="Versicherungsnummer / Mitgliedsnummer"
                  optional
                  value={entry.krankenVersicherungsnummer}
                  onChange={(e) => update(idx, { krankenVersicherungsnummer: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <DateInput
                    label="Versichert von"
                    optional
                    value={entry.krankenVon}
                    onChange={(e) => update(idx, { krankenVon: e.target.value })}
                  />
                  <DateInput
                    label="Versichert bis"
                    optional
                    value={entry.krankenBis}
                    onChange={(e) => update(idx, { krankenBis: e.target.value })}
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-neutral-700 border-b border-neutral-100 pb-1">
              Pflegeversicherung
            </p>
            <Select
              label="Versicherungsart"
              required
              placeholder="Bitte wählen"
              options={VERSICHERUNGSART_OPTIONS}
              error={errors[`pv_${idx}`]}
              value={entry.pflegeversicherung}
              onChange={(e) => update(idx, { pflegeversicherung: e.target.value })}
            />
            {entry.pflegeversicherung && entry.pflegeversicherung !== "keine" && (
              <>
                <Input
                  label="Pflegekasse / Versicherungsträger"
                  optional
                  value={entry.pflegeKasse}
                  onChange={(e) => update(idx, { pflegeKasse: e.target.value })}
                />
                <Input
                  label="Versicherungsnummer / Mitgliedsnummer"
                  optional
                  value={entry.pflegeVersicherungsnummer}
                  onChange={(e) => update(idx, { pflegeVersicherungsnummer: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <DateInput
                    label="Mitgliedschaft von"
                    optional
                    value={entry.pflegeVon}
                    onChange={(e) => update(idx, { pflegeVon: e.target.value })}
                  />
                  <DateInput
                    label="Mitgliedschaft bis"
                    optional
                    value={entry.pflegeBis}
                    onChange={(e) => update(idx, { pflegeBis: e.target.value })}
                  />
                </div>
              </>
            )}
          </div>
        </fieldset>
      ))}
    </FormStep>
  );
}
