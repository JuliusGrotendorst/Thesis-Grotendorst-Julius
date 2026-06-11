import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 mt-24">
      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <FooterCol title="Anschrift">
          <p className="text-neutral-600 text-sm leading-relaxed">
            Stadt Borken<br />
            Im Piepershagen 17<br />
            46325 Borken
          </p>
        </FooterCol>
        <FooterCol title="Kontakt">
          <FooterLink href="tel:028619390">0 28 61 / 939-0</FooterLink>
          <FooterLink href="mailto:rathaus@borken.de">rathaus@borken.de</FooterLink>
          <FooterLink href="/">Servicezeiten</FooterLink>
          <FooterLink href="/">Anfahrt & Parken</FooterLink>
        </FooterCol>
        <FooterCol title="Schnellzugriff">
          <FooterLink href="/">Online-Dienste</FooterLink>
          <FooterLink href="/">Stellenangebote</FooterLink>
          <FooterLink href="/">Ausschreibungen</FooterLink>
          <FooterLink href="/">Sitzungen & Beschlüsse</FooterLink>
        </FooterCol>
        <FooterCol title="Rechtliches">
          <FooterLink href="/impressum">Impressum</FooterLink>
          <FooterLink href="/datenschutz">Datenschutz</FooterLink>
          <FooterLink href="/barrierefreiheit">Barrierefreiheitserklärung</FooterLink>
          <FooterLink href="/">Leichte Sprache</FooterLink>
        </FooterCol>
      </div>

      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-neutral-400">
          <span>© 2026 Stadt Borken. Alle Rechte vorbehalten.</span>
          <span>Diese Website erfüllt WCAG 2.1 AA.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-neutral-900 font-semibold text-sm mb-3">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-neutral-600 text-sm hover:text-brand-accent transition-colors"
    >
      {children}
    </Link>
  );
}
