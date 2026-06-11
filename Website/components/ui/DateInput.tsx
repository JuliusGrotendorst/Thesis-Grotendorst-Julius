"use client";

import { forwardRef } from "react";

interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
}

function applyMask(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
  { label, hint, error, required, optional, id, onChange, ...props },
  ref
) {
  const inputId = id ?? `date-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = applyMask(e.target.value);
    onChange?.(e);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-semibold text-neutral-800">
        {label}
        {required && <span className="text-brand-danger ml-1" aria-label="Pflichtfeld">*</span>}
        {optional && <span className="text-neutral-400 font-normal ml-1.5 text-xs">(optional)</span>}
      </label>
      <input
        ref={ref}
        id={inputId}
        type="text"
        inputMode="numeric"
        placeholder="TT.MM.JJJJ"
        maxLength={10}
        autoComplete="off"
        aria-required={required}
        aria-describedby={error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined}
        aria-invalid={!!error}
        className={`form-input ${error ? "form-input-error" : ""}`}
        onChange={handleChange}
        {...props}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-neutral-600">{hint}</p>
      )}
      {error && (
        <p id={`${inputId}-err`} role="alert" className="field-error">
          <svg width={14} height={14} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
            <path d="M10 3 2.5 16h15z" /><path d="M10 8v4m0 2v.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

export default DateInput;
