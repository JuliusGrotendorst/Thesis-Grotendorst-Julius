export default function ServiceBar() {
  return (
    <div
      className="bg-white border-b border-neutral-100 text-neutral-500 text-xs"
      role="navigation"
      aria-label="Barrierefreiheit"
    >
      <div className="max-w-7xl mx-auto px-8 py-2 flex justify-end items-center gap-0.5">
        {[
          { label: "Vorlesen" },
          { label: "Schrift" },
          { label: "Kontrast" },
          { label: "Leichte Sprache" },
        ].map((item) => (
          <button
            key={item.label}
            className="px-3 py-1 rounded hover:bg-neutral-100 hover:text-neutral-700 transition-colors font-medium"
          >
            {item.label}
          </button>
        ))}
        <div className="w-px h-4 bg-neutral-200 mx-1" aria-hidden />
        <button className="px-3 py-1 rounded hover:bg-neutral-100 hover:text-neutral-700 transition-colors font-semibold text-brand-accent">
          DE
        </button>
      </div>
    </div>
  );
}
