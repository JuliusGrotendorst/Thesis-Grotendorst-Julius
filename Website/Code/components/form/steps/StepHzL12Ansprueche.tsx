"use client";

import { useState } from "react";
import { z } from "zod";
import { hzlHaushaltPersonSchema } from "@/lib/schemas/antragSchema";
import { useFormStore } from "@/lib/store/formStore";
import FormStep from "../FormStep";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import Select from "@/components/ui/Select";
import RadioGroup from "@/components/ui/RadioGroup";
import Button from "@/components/ui/Button";
import InfoBox from "@/components/ui/InfoBox";
import FileUpload from "@/components/ui/FileUpload";
import { HZL_ANSPRUCH_ARTEN } from "@/lib/constants";

type HaushaltPerson = z.infer<typeof hzlHaushaltPersonSchema>;

interface Anspruch {
  art: string;
  betroffenePerson: string;
  versicherungstraeger: string;
  aktenzeichen: string;
  beantragtAm: string;
  abgelehnt: string;
  ablehnungDatum: string;
  widerspruch: string;
  widerspruchDatum: string;
  widerspruchGeschaeftszeichen: string;
  bemerkungen: string;
}

const emptyAnspruch = (): Anspruch => ({
  art: "",
  betroffenePerson: "",
  versicherungstraeger: "",
  aktenzeichen: "",
  beantragtAm: "",
  abgelehnt: "",
  ablehnungDatum: "",
  widerspruch: "",
  widerspruchDatum: "",
  widerspruchGeschaeftszeichen: "",
  bemerkungen: "",
});

export default function StepHzL12Ansprueche() {
  const { formData, updateFormData, nextStep, prevStep, fileRefs, addFile, removeFile } = useFormStore();

  const mainName =
    `${(formData.vorname as string) ?? ""} ${(formData.nachname as string) ?? ""}`.trim() ||
    "Antragsteller*in";
  const hhPersonen = (formData.hzlHaushaltPersonen as HaushaltPerson[] | undefined) ?? [];
  const allPersonNames = [mainName, ...hhPersonen.map((p) => `${p.vorname} ${p.nachname}`.trim())];

  const saved = (formData.hzlAnsprueche as Anspruch[] | undefined) ?? [];
  const [ansprueche, setAnsprueche] = useState<Anspruch[]>(saved);

  const update = (idx: number, patch: Partial<Anspruch>) => {
    const updated = [...ansprueche];
    updated[idx]  = { ...updated[idx], ...patch };
    setAnsprueche(updated);
  };

  const onNext = () => {
    updateFormData({ hzlAnsprueche: ansprueche });
    nextStep();
  };

  return (
    <FormStep
      title="Mögliche Ansprüche"
      subtitle="Geben Sie an, ob Sie Ansprüche auf Leistungen anderer Sozialleistungsträger haben oder hatten."
      onNext={onNext}
      onBack={prevStep}
    >
      <InfoBox>
        Sozialhilfe ist nachrangig gegenüber anderen Sozialleistungen. Falls Sie Ansprüche auf Leistungen anderer Träger
        haben (z. B. Rentenversicherung, Unfallversicherung, SGB II), tragen Sie diese bitte ein.
        Falls keine Ansprüche bestehen, können Sie diesen Abschnitt überspringen.
      </InfoBox>

      {ansprueche.length === 0 && (
        <p className="text-sm text-neutral-500 italic py-3">
          Keine Ansprüche eingetragen. Klicken Sie auf „Anspruch hinzufügen", falls Sie entsprechende Ansprüche haben.
        </p>
      )}

      {ansprueche.map((a, idx) => (
        <div key={idx} className="border border-neutral-200 rounded-sm p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-neutral-800">Anspruch {idx + 1}</h3>
            <button
              type="button"
              onClick={() => setAnsprueche(ansprueche.filter((_, i) => i !== idx))}
              className="text-sm text-brand-danger hover:underline"
            >
              Entfernen ×
            </button>
          </div>

          <Select
            label="Art des Anspruchs"
            placeholder="Bitte wählen"
            options={HZL_ANSPRUCH_ARTEN}
            value={a.art}
            onChange={(e) => update(idx, { art: e.target.value })}
          />

          <Select
            label="Betroffene Person"
            placeholder="Bitte wählen (optional)"
            options={allPersonNames}
            value={a.betroffenePerson}
            onChange={(e) => update(idx, { betroffenePerson: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4 items-start">
            <Input
              label="Versicherungsträger"
              optional
              value={a.versicherungstraeger}
              onChange={(e) => update(idx, { versicherungstraeger: e.target.value })}
            />
            <Input
              label="Aktenzeichen"
              optional
              value={a.aktenzeichen}
              onChange={(e) => update(idx, { aktenzeichen: e.target.value })}
            />
          </div>

          <DateInput
            label="Beantragt am"
            optional
            value={a.beantragtAm}
            onChange={(e) => update(idx, { beantragtAm: e.target.value })}
          />

          <RadioGroup
            name={`abgelehnt_${idx}`}
            legend="Status des Antrags"
            layout="horizontal"
            value={a.abgelehnt}
            onChange={(v) => update(idx, { abgelehnt: v })}
            options={[
              { value: "nein", label: "Offen / in Bearbeitung" },
              { value: "ja",   label: "Abgelehnt" },
            ]}
          />

          {a.abgelehnt === "ja" && (
            <div className="space-y-4 pl-4 border-l-2 border-brand-danger/30">
              <DateInput
                label="Datum des Ablehnungsbescheids"
                optional
                value={a.ablehnungDatum}
                onChange={(e) => update(idx, { ablehnungDatum: e.target.value })}
              />
              <RadioGroup
                name={`widerspruch_${idx}`}
                legend="Widerspruch oder Klage eingelegt?"
                layout="horizontal"
                value={a.widerspruch}
                onChange={(v) => update(idx, { widerspruch: v })}
                options={[
                  { value: "ja",   label: "Ja" },
                  { value: "nein", label: "Nein" },
                ]}
              />
              {a.widerspruch === "ja" && (
                <div className="grid grid-cols-2 gap-4">
                  <DateInput
                    label="Datum des Widerspruchs"
                    optional
                    value={a.widerspruchDatum}
                    onChange={(e) => update(idx, { widerspruchDatum: e.target.value })}
                  />
                  <Input
                    label="Geschäftszeichen Widerspruch"
                    optional
                    value={a.widerspruchGeschaeftszeichen}
                    onChange={(e) => update(idx, { widerspruchGeschaeftszeichen: e.target.value })}
                  />
                </div>
              )}
              <FileUpload
                label="Ablehnungsbescheid hochladen (optional)"
                fieldName={`hzl_ablehnungsbescheid_${idx}`}
                optional
                currentFileName={fileRefs.find((f) => f.field === `hzl_ablehnungsbescheid_${idx}`)?.name}
                onFileSelect={(file, field, base64) =>
                  addFile({ field, name: file.name, size: file.size, type: file.type, base64, file })
                }
                onFileRemove={removeFile}
              />
            </div>
          )}

          <Input
            label="Bemerkungen"
            optional
            value={a.bemerkungen}
            onChange={(e) => update(idx, { bemerkungen: e.target.value })}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() => setAnsprueche([...ansprueche, emptyAnspruch()])}
        className="w-full justify-center"
      >
        + Anspruch hinzufügen
      </Button>
    </FormStep>
  );
}
