"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FileRef {
  field: string;
  name: string;
  size: number;
  type: string;
  base64?: string;
  file?: File;
}

export interface HaushaltMitgliedEinkommen {
  hatKeinEinkommen: boolean;
  einkommensarten: { art: string; betrag?: string; haeufigkeit?: "monatlich" | "einmalig" }[];
}

export interface HaushaltMitgliedVermoegen {
  bankguthaben?: string;
  bargeld?: string;
  wertpapiere?: string;
  sonstigesVermoegen?: string;
}

type FormData = Record<string, unknown>;

interface FormStore {
  currentStep: number;
  formData: FormData;
  fileRefs: FileRef[];
  vorgangsnummer: string | null;
  haushaltMitgliederEinkommen: HaushaltMitgliedEinkommen[];
  haushaltMitgliederVermoegen: HaushaltMitgliedVermoegen[];

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (patch: FormData) => void;
  updateHaushaltEinkommen: (idx: number, data: HaushaltMitgliedEinkommen) => void;
  updateHaushaltVermoegen: (idx: number, data: HaushaltMitgliedVermoegen) => void;
  addFile: (ref: FileRef) => void;
  removeFile: (field: string) => void;
  setVorgangsnummer: (v: string) => void;
  reset: () => void;
  loadTestCase: (state: {
    currentStep?: number;
    formData?: FormData;
    fileRefs?: Omit<FileRef, "file">[];
    haushaltMitgliederEinkommen?: HaushaltMitgliedEinkommen[];
    haushaltMitgliederVermoegen?: HaushaltMitgliedVermoegen[];
  }) => void;
}

const WB_TOTAL_STEPS = 13;
const HZL_TOTAL_STEPS = 16;
const getTotalSteps = (leistungsart?: unknown) =>
  leistungsart === "hilfe_zum_lebensunterhalt" ? HZL_TOTAL_STEPS : WB_TOTAL_STEPS;

const initialData: FormData = {
  haushaltPersonen: [],
  einkommensarten: [],
  hatKeinEinkommen: false,
  aktenzeichenUnbekannt: false,
  betriebskostenabrechnungVorhanden: false,
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: initialData,
      fileRefs: [],
      vorgangsnummer: null,
      haushaltMitgliederEinkommen: [],
      haushaltMitgliederVermoegen: [],

      setStep: (step) =>
        set((s) => ({ currentStep: Math.max(1, Math.min(getTotalSteps(s.formData.leistungsart), step)) })),

      nextStep: () =>
        set((s) => ({ currentStep: Math.min(getTotalSteps(s.formData.leistungsart), s.currentStep + 1) })),

      prevStep: () =>
        set((s) => ({ currentStep: Math.max(1, s.currentStep - 1) })),

      updateFormData: (patch) =>
        set((s) => ({ formData: { ...s.formData, ...patch } })),

      updateHaushaltEinkommen: (idx, data) =>
        set((s) => {
          const arr = [...s.haushaltMitgliederEinkommen];
          arr[idx] = data;
          return { haushaltMitgliederEinkommen: arr };
        }),

      updateHaushaltVermoegen: (idx, data) =>
        set((s) => {
          const arr = [...s.haushaltMitgliederVermoegen];
          arr[idx] = data;
          return { haushaltMitgliederVermoegen: arr };
        }),

      addFile: (ref) =>
        set((s) => ({
          fileRefs: [...s.fileRefs.filter((f) => f.field !== ref.field), ref],
        })),

      removeFile: (field) =>
        set((s) => ({ fileRefs: s.fileRefs.filter((f) => f.field !== field) })),

      setVorgangsnummer: (v) => set({ vorgangsnummer: v }),

      reset: () =>
        set({
          currentStep: 1,
          formData: initialData,
          fileRefs: [],
          vorgangsnummer: null,
          haushaltMitgliederEinkommen: [],
          haushaltMitgliederVermoegen: [],
        }),

      loadTestCase: (data) =>
        set({
          currentStep: data.currentStep ?? 1,
          formData: data.formData ?? initialData,
          fileRefs: (data.fileRefs ?? []) as FileRef[],
          vorgangsnummer: null,
          haushaltMitgliederEinkommen: data.haushaltMitgliederEinkommen ?? [],
          haushaltMitgliederVermoegen: data.haushaltMitgliederVermoegen ?? [],
        }),
    }),
    {
      name: "sgb12-antrag-v1",
      partialize: (s) => ({
        currentStep: s.currentStep,
        formData: s.formData,
        fileRefs: s.fileRefs.map(({ file: _f, ...rest }) => rest), // base64 is kept, file object is dropped
        vorgangsnummer: s.vorgangsnummer,
        haushaltMitgliederEinkommen: s.haushaltMitgliederEinkommen,
        haushaltMitgliederVermoegen: s.haushaltMitgliederVermoegen,
      }),
    }
  )
);
