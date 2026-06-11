"use client";

import { useFormStore } from "@/lib/store/formStore";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProgressBar from "@/components/ui/ProgressBar";

import Step01Leistungsart from "@/components/form/steps/Step01Leistungsart";
import Step02Antragsart from "@/components/form/steps/Step02Antragsart";
import Step03PersonalData from "@/components/form/steps/Step03PersonalData";
import Step04Betreuung from "@/components/form/steps/Step04Betreuung";
import Step05PersVerhaeltnisse from "@/components/form/steps/Step05PersVerhaeltnisse";
import Step09Wohnkosten from "@/components/form/steps/Step09Wohnkosten";
import Step06Einkommen from "@/components/form/steps/Step06Einkommen";
import Step07Vermoegen from "@/components/form/steps/Step07Vermoegen";
import Step09Schwerbehinderung from "@/components/form/steps/Step09Schwerbehinderung";
import Step10Bankverbindung from "@/components/form/steps/Step10Bankverbindung";
import Step11Veraenderungen from "@/components/form/steps/Step11Veraenderungen";
import Step10Versicherung from "@/components/form/steps/Step10Versicherung";
import Step11Absenden from "@/components/form/steps/Step11Absenden";

import StepHzL03PersonalData from "@/components/form/steps/StepHzL03PersonalData";
import StepHzL04Haushalt from "@/components/form/steps/StepHzL04Haushalt";
import StepHzL05Aufenthalt from "@/components/form/steps/StepHzL05Aufenthalt";
import StepHzL06Unterhalt from "@/components/form/steps/StepHzL06Unterhalt";
import StepHzL07KrankenPflege from "@/components/form/steps/StepHzL07KrankenPflege";
import StepHzL08Einkommen from "@/components/form/steps/StepHzL08Einkommen";
import StepHzL09Absetzbar from "@/components/form/steps/StepHzL09Absetzbar";
import StepHzL10Vermoegen from "@/components/form/steps/StepHzL10Vermoegen";
import StepHzL11Wohnkosten from "@/components/form/steps/StepHzL11Wohnkosten";
import StepHzL12Ansprueche from "@/components/form/steps/StepHzL12Ansprueche";
import StepHzL13Begruendung from "@/components/form/steps/StepHzL13Begruendung";
import StepHzL14Dokumente from "@/components/form/steps/StepHzL14Dokumente";
import StepHzL14Pruefen from "@/components/form/steps/StepHzL14Pruefen";

import dynamic from "next/dynamic";

const DevTestFill = process.env.NODE_ENV === "development"
  ? dynamic(() => import("@/components/dev/DevTestFill"))
  : () => null;

// Weiterbewilligung / Grundsicherung (13 Schritte)
const WB_STEPS: Record<number, React.ComponentType> = {
  1:  Step01Leistungsart,
  2:  Step02Antragsart,
  3:  Step03PersonalData,
  4:  Step04Betreuung,
  5:  Step05PersVerhaeltnisse,
  6:  Step09Wohnkosten,
  7:  Step06Einkommen,
  8:  Step07Vermoegen,
  9:  Step09Schwerbehinderung,
  10: Step10Bankverbindung,
  11: Step11Veraenderungen,
  12: Step10Versicherung,
  13: Step11Absenden,
};

// Hilfe zum Lebensunterhalt (16 Schritte)
const HZL_STEPS: Record<number, React.ComponentType> = {
  1:  Step01Leistungsart,
  2:  Step02Antragsart,
  3:  StepHzL03PersonalData,
  4:  StepHzL04Haushalt,
  5:  StepHzL06Unterhalt,
  6:  StepHzL05Aufenthalt,
  7:  StepHzL07KrankenPflege,
  8:  StepHzL08Einkommen,
  9:  StepHzL09Absetzbar,
  10: StepHzL10Vermoegen,
  11: StepHzL11Wohnkosten,
  12: StepHzL12Ansprueche,
  13: StepHzL14Dokumente,
  14: StepHzL13Begruendung,
  15: StepHzL14Pruefen,
  16: Step11Absenden,
};

export default function AntragPage() {
  const currentStep = useFormStore((s) => s.currentStep);
  const leistungsart = useFormStore((s) => s.formData.leistungsart as string | undefined);

  const isHzL = leistungsart === "hilfe_zum_lebensunterhalt";
  const activeSteps = isHzL ? HZL_STEPS : WB_STEPS;
  const StepComponent = activeSteps[currentStep] ?? Step01Leistungsart;

  const pageTitle = isHzL ? "Antrag auf Sozialhilfe" : "Weiterbewilligungsantrag";
  const pageSubtitle = isHzL
    ? "Hilfe zum Lebensunterhalt (3. Kapitel SGB XII)"
    : "Grundsicherung und Hilfe zum Lebensunterhalt nach SGB XII";

  return (
    <>
      <Header />
      <Breadcrumb
        items={[
          { label: "Startseite", href: "/" },
          { label: "Soziales", href: "/sozialhilfe" },
          { label: "Sozialhilfe", href: "/sozialhilfe" },
          { label: "Online-Antrag" },
        ]}
      />
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <div className="text-xs font-semibold tracking-widest uppercase text-brand-subtle mb-2">
            Online-Antrag · Sozialhilfe
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 leading-tight">
            {pageTitle}
            <span className="block text-lg font-normal text-neutral-500 mt-1">
              {pageSubtitle}
            </span>
          </h1>
        </div>
      </div>

      <ProgressBar current={currentStep} />

      <main id="main-content" tabIndex={-1}>
        <StepComponent />
      </main>

      <Footer />
      <DevTestFill />
    </>
  );
}
