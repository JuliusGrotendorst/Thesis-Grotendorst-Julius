interface InfoBoxProps {
  children: React.ReactNode;
  variant?: "info" | "warning" | "success";
}

const styles = {
  info:    "bg-blue-50 border-blue-200 border-l-blue-600 text-blue-900",
  warning: "bg-amber-50 border-amber-200 border-l-amber-500 text-amber-900",
  success: "bg-green-50 border-green-200 border-l-green-600 text-green-900",
};

export default function InfoBox({ children, variant = "info" }: InfoBoxProps) {
  return (
    <div
      role="note"
      className={`flex gap-3 p-4 border border-l-4 rounded-sm text-sm leading-relaxed ${styles[variant]}`}
    >
      <svg width={18} height={18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" className="flex-shrink-0 mt-0.5" aria-hidden>
        <circle cx={10} cy={10} r={7.5} />
        <path d="M10 9v5m0-7.5v.01" />
      </svg>
      <div>{children}</div>
    </div>
  );
}
