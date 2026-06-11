import Link from "next/link";

interface Item { label: string; href?: string }

export default function Breadcrumb({ items }: { items: Item[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-8 py-3">
        <ol className="flex items-center gap-2 text-sm text-brand-subtle flex-wrap">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-brand-text">{item.label}</span>
                ) : (
                  <Link href={item.href ?? "/"} className="hover:text-brand-text transition-colors">
                    {item.label}
                  </Link>
                )}
                {!last && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
