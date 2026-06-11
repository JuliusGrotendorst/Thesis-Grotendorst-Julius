import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Button from "@/components/ui/Button";
import InfoBox from "@/components/ui/InfoBox";
import { CONTACT } from "@/lib/constants";

const SUBPAGES = [
  { title: "Hilfe zum Lebensunterhalt", desc: "Laufende Unterstützung bei nicht ausreichendem Einkommen.", online: true },
  { title: "Grundsicherung im Alter", desc: "Für Personen ab 65 Jahren oder bei dauerhafter Erwerbsminderung.", online: true },
  { title: "Hilfen zur Gesundheit", desc: "Übernahme medizinisch notwendiger Leistungen.", online: false },
  { title: "Eingliederungshilfe", desc: "Teilhabe für Menschen mit Behinderung.", online: false },
  { title: "Hilfe zur Pflege", desc: "Unterstützung bei pflegerischem Bedarf.", online: true },
  { title: "Wohngeld & Mietzuschuss", desc: "Zuschuss zu den Wohnkosten.", online: true },
];

const ABLAUF = [
  { n: 1, title: "Voraussetzungen prüfen", text: "Nutzen Sie unseren Online-Schnelltest, um in wenigen Minuten zu sehen, ob ein Anspruch besteht." },
  { n: 2, title: "Unterlagen zusammenstellen", text: "Eine vollständige Liste aller benötigten Nachweise finden Sie weiter unten." },
  { n: 3, title: "Antrag online ausfüllen", text: "Der Antrag ist in Schritte gegliedert. Ihre Eingaben werden lokal zwischengespeichert." },
  { n: 4, title: "Bestätigung erhalten", text: "Sie erhalten innerhalb von zwei Wochen eine schriftliche Rückmeldung." },
];

export default function SozialhilfePage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Startseite", href: "/" }, { label: "Soziales", href: "/sozialhilfe" }, { label: "Sozialhilfe" }]} />

      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-[260px_1fr] gap-16 items-start">
        {/* Sidebar */}
        <aside className="sticky top-28">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-subtle mb-4">In diesem Bereich</p>
          <ul className="space-y-0">
            {["Sozialhilfe", "Wohngeld", "Bildung & Teilhabe", "Schuldnerberatung", "Kinder- und Jugendhilfe", "Senioren", "Inklusion"].map((item, i) => (
              <li key={item}>
                <Link href={i === 0 ? "/sozialhilfe" : "/"} className={`block py-2.5 text-sm border-b border-neutral-100 transition-colors
                  ${i === 0 ? "font-semibold text-brand-text" : "text-neutral-500 hover:text-brand-text"}`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <main>
          <div className="mb-10">
            <div className="flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-brand-subtle mb-4">
              <span className="w-6 h-0.5 bg-brand-accent" />
              Soziales
            </div>
            <h1 className="text-4xl font-bold leading-tight text-neutral-900 mb-5">
              Sozialhilfe – finanzielle Hilfe in Notlagen
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
              Wenn Sie Ihren Lebensunterhalt nicht aus eigenen Mitteln bestreiten können und keinen Anspruch
              auf Bürgergeld haben, kann die Stadt Borken Ihnen weiterhelfen.
            </p>
          </div>

          <InfoBox>
            Diese Seite ist auch in Leichter Sprache verfügbar. Den Link finden Sie im Footer.
          </InfoBox>

          {/* CTA */}
          <div className="mt-10 mb-14 bg-brand-accent text-white rounded-lg p-9 grid grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-red-200 mb-2">Online-Antrag</p>
              <h2 className="text-2xl font-bold mb-3">Antrag auf Leistungen nach dem 3. und 4. Kapitel des SGB XII</h2>
              <div className="flex flex-wrap gap-5 text-sm text-red-100">
                <span>ca. 15 Min.</span>
              </div>
            </div>
            <Link href="/antrag/sozialhilfe">
              <Button variant="secondary">
                Antrag starten →
              </Button>
            </Link>
          </div>

          {/* Voraussetzungen */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-neutral-900 mb-5">Wer kann Sozialhilfe erhalten?</h2>
            <ul className="space-y-3">
              {[
                "Sie können Ihren notwendigen Lebensunterhalt nicht aus eigenem Einkommen oder Vermögen bestreiten.",
                "Sie sind dauerhaft voll erwerbsgemindert oder haben das Renteneintrittsalter erreicht (für Grundsicherung).",
                "Sie haben keinen oder keinen ausreichenden Anspruch auf vorrangige Sozialleistungen wie Bürgergeld oder Rente.",
                "Ihr gewöhnlicher Aufenthalt liegt im Stadtgebiet Borken.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-base text-neutral-800">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center mt-0.5">
                    <svg width={12} height={12} viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
                      <path d="m4 10 4 4 8-8" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* Ablauf */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">So läuft die Antragstellung ab</h2>
            <div className="grid grid-cols-2 gap-4">
              {ABLAUF.map((s) => (
                <div key={s.n} className="border border-neutral-200 rounded-sm p-6">
                  <p className="text-xs font-bold text-neutral-400 tracking-widest mb-3">0{s.n}</p>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Weitere Leistungen */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-neutral-900 mb-5">Weitere soziale Leistungen</h2>
            <div className="border-t border-neutral-200">
              {SUBPAGES.map((p) => (
                <Link key={p.title} href="/" className="grid grid-cols-[1fr_140px_20px] gap-6 py-5 border-b border-neutral-100 items-center hover:bg-neutral-50 transition-colors">
                  <div>
                    <p className="font-semibold text-neutral-900">{p.title}</p>
                    <p className="text-sm text-neutral-500 mt-0.5">{p.desc}</p>
                  </div>
                  <span className={`text-xs font-medium flex items-center gap-1.5 ${p.online ? "text-brand-success" : "text-neutral-400"}`}>
                    {p.online && <span className="w-1.5 h-1.5 rounded-full bg-brand-success" />}
                    {p.online ? "Online verfügbar" : "Im Bürgerbüro"}
                  </span>
                  <svg width={16} height={16} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" className="text-neutral-400">
                    <path d="m7 5 5 5-5 5" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>

          {/* Kontakt */}
          <section className="bg-neutral-50 rounded-sm p-8 grid grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Persönliche Beratung</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Sozialamt · Zimmer 214<br />{CONTACT.address}
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p><a href={`tel:${CONTACT.sozialamt.replace(/\s/g, "")}`} className="underline hover:text-brand-text">{CONTACT.sozialamt}</a></p>
                <p><a href={`mailto:${CONTACT.email}`} className="underline hover:text-brand-text">{CONTACT.email}</a></p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Sprechzeiten</h3>
              <table className="text-sm text-neutral-600 w-full">
                <tbody>
                  {[["Mo, Di, Do", "08:00–12:00"], ["Mittwoch", "geschlossen"], ["Donnerstag", "14:00–18:00"], ["Freitag", "08:00–12:00"]].map(([d, h]) => (
                    <tr key={d}><td className="py-1.5">{d}</td><td className="py-1.5 text-right text-neutral-900">{h}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
