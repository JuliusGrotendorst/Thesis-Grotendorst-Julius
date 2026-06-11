import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

interface FormStepProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  isFirst?: boolean;
  isLast?: boolean;
  loading?: boolean;
}

export default function FormStep({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextLabel = "Weiter",
  isFirst,
  isLast,
  loading,
}: FormStepProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 pb-20">
      {/* Step header */}
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-base text-neutral-600 mt-2 leading-relaxed">{subtitle}</p>
        )}
      </header>

      {/* Step content */}
      <div className="space-y-6">{children}</div>

      {/* Navigation */}
      <div className="mt-10 pt-6 border-t border-neutral-200 flex items-center justify-between gap-4">
        <div>
          {!isFirst && (
            <Button type="button" variant="secondary" onClick={onBack}>
              ← Zurück
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xs text-neutral-500 hidden sm:block">
            Telefonische Hilfe:{" "}
            <a href={`tel:${CONTACT.sozialamt.replace(/\s/g, "")}`} className="underline hover:text-brand-text">
              {CONTACT.sozialamt}
            </a>
          </p>
          {onNext && (
            <Button type="button" onClick={onNext} loading={loading}>
              {isLast ? "Antrag absenden" : `${nextLabel} →`}
            </Button>
          )}
        </div>
      </div>

      {/* Persistence note */}
      <p className="mt-4 text-xs text-neutral-400 text-center">
        Ihre Eingaben werden lokal in Ihrem Browser zwischengespeichert. Sie können den Antrag später fortsetzen.
      </p>
    </div>
  );
}
