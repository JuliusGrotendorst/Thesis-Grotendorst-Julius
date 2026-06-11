"use client";

import { useEffect, useRef } from "react";
import { WB_FORM_STEPS, HZL_FORM_STEPS } from "@/lib/constants";
import { useFormStore } from "@/lib/store/formStore";

interface ProgressBarProps {
  current: number;
}

export default function ProgressBar({ current }: ProgressBarProps) {
  const setStep = useFormStore((s) => s.setStep);
  const leistungsart = useFormStore((s) => s.formData.leistungsart as string | undefined);
  const activeRef = useRef<HTMLLIElement>(null);

  const steps = leistungsart === "hilfe_zum_lebensunterhalt" ? HZL_FORM_STEPS : WB_FORM_STEPS;

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  return (
    <nav aria-label="Antragsfortschritt" className="bg-white border-b border-neutral-100 sticky top-[85px] z-40 shadow-sm">
      <div className="max-w-5xl mx-auto px-8 py-4 overflow-x-auto">
        <ol className="flex gap-1 min-w-max">
          {steps.map((step, i) => {
            const done = step.n < current;
            const active = step.n === current;
            return (
              <li key={step.n} ref={active ? activeRef : undefined} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setStep(step.n)}
                  className="flex flex-col items-center gap-1.5 group"
                  aria-current={active ? "step" : undefined}
                >
                  <div
                    className={`h-0.5 w-full mb-1 rounded transition-colors ${
                      done ? "bg-brand-success" : active ? "bg-brand-warning" : "bg-neutral-200"
                    }`}
                    style={{ minWidth: "60px" }}
                  />
                  <div className="flex items-center gap-2 rounded-full px-2 py-1 transition-colors group-hover:bg-neutral-100">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                        done
                          ? "bg-brand-success text-white"
                          : active
                          ? "bg-brand-warning text-white"
                          : "bg-white border border-neutral-200 text-neutral-400"
                      }`}
                    >
                      {done ? (
                        <svg width={12} height={12} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
                          <path d="m4 10 4 4 8-8" />
                        </svg>
                      ) : (
                        step.n
                      )}
                    </div>
                    <span
                      className={`text-xs whitespace-nowrap ${
                        active ? "font-semibold text-neutral-900" : done ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </button>
                {i < steps.length - 1 && (
                  <div className="w-4 flex-shrink-0" aria-hidden />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
