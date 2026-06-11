import { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[] | readonly string[];
  hint?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, hint, error, required, placeholder, id, ...props },
  ref
) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const normalised = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-semibold text-neutral-800">
        {label}
        {required && <span className="text-brand-danger ml-1" aria-label="Pflichtfeld">*</span>}
      </label>
      <select
        ref={ref}
        id={selectId}
        aria-required={required}
        aria-invalid={!!error}
        className={`form-input ${error ? "form-input-error" : ""} pr-10 appearance-none
          bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'><path d='M1 1l6 6 6-6' stroke='%235A1822' stroke-width='1.7' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>")]
          bg-no-repeat bg-[right_14px_center]`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {normalised.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {hint && !error && <p className="text-xs text-neutral-600">{hint}</p>}
      {error && (
        <p role="alert" className="field-error">
          <svg width={14} height={14} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
            <path d="M10 3 2.5 16h15z" /><path d="M10 8v4m0 2v.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;
