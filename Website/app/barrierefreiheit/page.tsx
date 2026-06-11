import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata = { title: "Barrierefreiheitserklärung | Stadt Borken" };

export default function BarrierefreiheitPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Startseite", href: "/" }, { label: "Barrierefreiheitserklärung" }]} />
      <main className="max-w-3xl mx-auto px-8 py-14 space-y-8 text-neutral-800 leading-relaxed">
        <h1 className="text-3xl font-bold">Barrierefreiheitserklärung</h1>
        <p>
          Die Stadt Borken ist bemüht, ihre Website im Einklang mit dem Behindertengleichstellungsgesetz
          (BGG) und der Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) barrierefrei zugänglich
          zu machen.
        </p>
        <section>
          <h2 className="text-xl font-semibold mb-3">Stand der Vereinbarkeit mit den Anforderungen</h2>
          <p>
            Diese Website ist mit den WCAG 2.1 auf Stufe AA weitgehend vereinbar. Folgende Aspekte
            sind noch nicht vollständig umgesetzt:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Einige ältere PDF-Dokumente sind noch nicht vollständig barrierefrei.</li>
            <li>Einige Videoinhalte verfügen noch nicht über Audiodeskription.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">Feedback und Kontakt</h2>
          <p>
            Wenn Sie Barrieren auf dieser Website feststellen, wenden Sie sich bitte an:<br />
            E-Mail:{" "}
            <a href="mailto:barrierefreiheit@borken.de" className="underline">barrierefreiheit@borken.de</a><br />
            Telefon: 0 28 61 / 939-0
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">Durchsetzungsverfahren</h2>
          <p>
            Bei nicht zufriedenstellenden Antworten können Sie die Ombudsstelle für barrierefreie
            Informationstechnik NRW kontaktieren.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
