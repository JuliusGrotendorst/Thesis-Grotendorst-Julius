interface Option { value: string; label: string; hint?: string }

interface RadioGroupProps {
  name: string;
  legend: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  layout?: "horizontal" | "vertical";
}

export default function RadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  required,
  layout = "vertical",
}: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-neutral-800 mb-3">
        {legend}
        {required && <span className="text-brand-danger ml-1" aria-label="Pflichtfeld">*</span>}
      </legend>
      <div className={`flex gap-3 ${layout === "horizontal" ? "flex-row flex-wrap" : "flex-col"}`}>
        {options.map((opt) => {
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex items-start gap-3 p-3.5 border rounded-sm cursor-pointer transition-colors
                ${checked ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 bg-white hover:border-neutral-400"}`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => onChange(opt.value)}
                className="mt-0.5 accent-brand-dark w-4 h-4 flex-shrink-0"
                aria-required={required}
              />
              <div>
                <span className="text-base font-medium text-neutral-900 leading-tight">{opt.label}</span>
                {opt.hint && <p className="text-sm text-neutral-600 mt-1">{opt.hint}</p>}
              </div>
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="field-error mt-2">
          <svg width={14} height={14} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
            <path d="M10 3 2.5 16h15z" /><path d="M10 8v4m0 2v.01" />
          </svg>
          {error}
        </p>
      )}
    </fieldset>
  );
}
