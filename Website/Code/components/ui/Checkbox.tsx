import { forwardRef } from "react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  hint?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hint, error, id, className, ...props },
  ref
) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-").slice(0, 40);
  return (
    <div>
      <label
        htmlFor={inputId}
        className={`flex items-start gap-3 p-3.5 border rounded-sm cursor-pointer transition-colors
          ${error ? "border-brand-danger" : props.checked ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 bg-white hover:border-neutral-400"}`}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-err` : undefined}
          className="mt-0.5 accent-brand-dark w-4 h-4 flex-shrink-0"
          {...props}
        />
        <div>
          <span className="text-base font-medium text-neutral-900 leading-snug">{label}</span>
          {hint && <p className="text-sm text-neutral-600 mt-1">{hint}</p>}
        </div>
      </label>
      {error && (
        <p id={`${inputId}-err`} role="alert" className="field-error mt-1.5">
          <svg width={14} height={14} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
            <path d="M10 3 2.5 16h15z" /><path d="M10 8v4m0 2v.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

export default Checkbox;
