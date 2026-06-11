import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  numericOnly?: "integer" | "decimal" | "currency";
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, required, optional, id, numericOnly, onChange, onBlur, className = "", ...props },
  ref
) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (numericOnly === "integer") {
      e.target.value = e.target.value.replace(/\D/g, "");
    } else if (numericOnly === "decimal") {
      e.target.value = e.target.value.replace(/[^\d,.]/g, "");
    } else if (numericOnly === "currency") {
      // Only digits and comma, at most one comma, at most 2 decimal digits
      let val = e.target.value.replace(/[^\d,]/g, "");
      const parts = val.split(",");
      if (parts.length > 2) val = parts[0] + "," + parts.slice(1).join("");
      if (val.includes(",")) {
        const [int, dec] = val.split(",");
        val = int + "," + dec.slice(0, 2);
      }
      e.target.value = val;
    }
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (numericOnly === "currency" && e.target.value.trim() !== "") {
      const val = e.target.value.replace(/[^\d,]/g, "");
      const parts = val.split(",");
      const intPart = parts[0] || "0";
      const decPart = (parts[1] ?? "").padEnd(2, "0").slice(0, 2);
      e.target.value = `${intPart},${decPart}`;
      onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
    }
    onBlur?.(e);
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
        aria-required={required}
        aria-describedby={error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined}
        aria-invalid={!!error}
        className={`form-input ${error ? "form-input-error" : ""} ${className}`}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-neutral-600">
          {hint}
        </p>
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

export default Input;
