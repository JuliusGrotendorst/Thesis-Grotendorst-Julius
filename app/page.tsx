import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

const QUICKLINKS = [
  {
    icon: (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6"/>
      </svg>
    ),
    title: "Personalausweis beantragen", meta: "Information", href: "/",
  },
  {
    icon: (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden>
        <path d="M3 12l9-9 9 9"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
      </svg>
    ),
    title: "Wohnsitz ummelden", meta: "Information", href: "/",
  },
  {
    icon: (
      <span className="text-2xl font-bold leading-none" aria-hidden>€</span>
    ),
    title: "Sozialhilfe beantragen", meta: "Online verfügbar", href: "/sozialhilfe", highlight: true,
  },
  {
    icon: (
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "Kindergeld & Familie", meta: "Information", href: "/",
  },
];

const NEWS = [
  {
    cat: "Soziales",
    date: "02.05.2026",
    title: "Neuer digitaler Antrag für Sozialhilfe ab 6. Mai verfügbar",
    teaser: "Bürger*innen können den Antrag auf Hilfe zum Lebensunterhalt jetzt vollständig online ausfüllen und einreichen.",
    img: "/news-soziales.jpg",
    alt: "Person füllt Formular aus",
  },
  {
    cat: "Stadtleben",
    date: "28.04.2026",
    title: "Bürgerversammlung am 18. Mai im Bürgersaal",
    teaser: "Themen: Verkehrskonzept Innenstadt, Sanierung der Grundschule am Wäldchen, Erweiterung des Stadtbus-Netzes.",
    img: "/news-stadtleben.jpg",
    alt: "Bürgerinnen und Bürger im Gespräch auf dem Stadtplatz",
  },
  {
    cat: "Verwaltung",
    date: "21.04.2026",
    title: "Servicezeiten Bürgerbüro in den Pfingstferien",
    teaser: "Vom 25. bis 29. Mai gelten verkürzte Öffnungszeiten. Termine können weiterhin online gebucht werden.",
    img: "/news-verwaltung.jpg",
    alt: "Uhr – Servicezeiten des Bürgerbüros",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-6">
              <span className="w-7 h-0.5 bg-brand-accent" />
              Kreisstadt Borken
            </div>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-neutral-900 mb-6">
              Digital schnell. Persönlich nah.
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-lg">
              Anträge stellen, Termine buchen, Auskünfte erhalten –
              online rund um die Uhr oder persönlich im Rathaus.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/sozialhilfe">
                <Button>Online-Dienste starten →</Button>
              </Link>
              <Button variant="secondary">Termin vereinbaren</Button>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            {/* Rathaus / Stadtansicht */}
            <img
              src="/hero-rathaus.jpg"
              alt="Tourismus-Info und Rathaus Borken"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quicklinks */}
      <section className="bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Häufig gesucht</h2>
              <p className="text-neutral-500 mt-1.5">Die meistgenutzten Online-Dienste auf einen Klick.</p>
            </div>
            <Link href="/" className="text-sm font-semibold text-neutral-900 border-b border-neutral-900 pb-0.5 hover:border-transparent transition-colors">
              Alle Dienste anzeigen →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {QUICKLINKS.map((q) => (
              <Link key={q.title} href={q.href}
                className={`flex flex-col gap-5 p-7 rounded-lg border min-h-[188px] transition-shadow hover:shadow-md
                  ${q.highlight ? "bg-brand-accent border-brand-accent text-white" : "bg-neutral-50 border-neutral-200 text-neutral-900"}`}
              >
                <span aria-hidden>{q.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-[17px] leading-tight mb-2">{q.title}</p>
                  <p className={`text-xs flex items-center gap-1.5 ${q.highlight ? "text-red-100" : "text-neutral-500"}`}>
                    {q.meta === "Online verfügbar" && <span className="w-1.5 h-1.5 rounded-full bg-brand-success" />}
                    {q.meta}
                  </p>
                </div>
                <p className="text-sm font-semibold">Antrag öffnen →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Aktuelles */}
      <section className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Aktuelles</h2>
              <p className="text-neutral-500 mt-1.5">Mitteilungen aus Verwaltung und Stadtleben.</p>
            </div>
            <Link href="/" className="text-sm font-semibold text-neutral-900 border-b border-neutral-900 pb-0.5">
              Alle Meldungen →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {NEWS.map((n) => (
              <article key={n.title} className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col">
                <div className="h-44 overflow-hidden">
                  <img
                    src={n.img}
                    alt={n.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs mb-3">
                    <span className="font-bold tracking-wide uppercase text-neutral-900">{n.cat}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="text-neutral-500">{n.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-neutral-900 mb-2">{n.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed flex-1">{n.teaser}</p>
                  <Link href="/" className="mt-4 text-sm font-semibold text-neutral-900 flex items-center gap-1.5 hover:underline">
                    Weiterlesen →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="bg-brand-accent text-white rounded-lg px-12 py-10 flex items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Sie kommen nicht weiter?</h3>
              <p className="text-red-100 text-base">
                Unser Bürgertelefon hilft Ihnen werktags von 8 bis 16 Uhr. Auf Wunsch auch in Leichter Sprache.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button variant="secondary">0 28 61 / 939-0</Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">Rückruf vereinbaren</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
