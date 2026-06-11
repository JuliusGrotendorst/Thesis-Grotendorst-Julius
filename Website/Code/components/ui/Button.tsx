import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-accent text-white hover:bg-red-700 disabled:opacity-60",
  secondary:
    "bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50 disabled:opacity-60",
  ghost:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 disabled:opacity-60",
  danger:
    "bg-brand-danger text-white hover:bg-red-800 disabled:opacity-60",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", loading, children, className = "", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      {...props}
      disabled={props.disabled || loading}
      className={`inline-flex items-center gap-2.5 px-5 py-3 text-base font-semibold rounded-sm
        transition-colors cursor-pointer disabled:cursor-not-allowed
        ${variants[variant]} ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

export default Button;
