import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata = { title: "Impressum | Stadt Borken" };

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Startseite", href: "/" }, { label: "Impressum" }]} />
      <main className="max-w-3xl mx-auto px-8 py-14 prose prose-neutral">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Stadt Borken – Kreisstadt<br />
          Im Piepershagen 17<br />
          46325 Borken
        </p>
        <h2>Vertreten durch</h2>
        <p>Bürgermeister Thomas Kerkhoff</p>
        <h2>Kontakt</h2>
        <p>
          Telefon: 0 28 61 / 939-0<br />
          E-Mail: <a href="mailto:rathaus@borken.de">rathaus@borken.de</a>
        </p>
        <h2>Aufsichtsbehörde</h2>
        <p>Bezirksregierung Münster</p>
        <h2>Haftungsausschluss</h2>
        <p>
          Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        </p>
      </main>
      <Footer />
    </>
  );
}
