import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata = { title: "Datenschutz | Stadt Borken" };

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Startseite", href: "/" }, { label: "Datenschutz" }]} />
      <main className="max-w-3xl mx-auto px-8 py-14 space-y-8 text-neutral-800 leading-relaxed">
        <h1 className="text-3xl font-bold">Datenschutzerklärung</h1>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Verantwortliche Stelle</h2>
          <p>
            Stadt Borken, Im Piepershagen 17, 46325 Borken<br />
            E-Mail: <a href="mailto:datenschutz@borken.de" className="underline">datenschutz@borken.de</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Auftragsverarbeitung (Make.com)</h2>
          <p>
            Für die Übermittlung und Weiterverarbeitung der Antragsdaten nutzen wir den Dienst
            <strong> Make.com</strong> (Celonis SE, Neumarkter Str. 39, 81673 München). Die Verarbeitung
            erfolgt auf Grundlage eines Auftragsverarbeitungsvertrags (AVV) gemäß Art. 28 DSGVO.
          </p>
          <p className="mt-2">
            Wir empfehlen die Nutzung der EU-Region (EU1/EU2) innerhalb von Make.com, um eine
            Datenübertragung in Drittstaaten zu vermeiden. Weitere Informationen finden Sie unter{" "}
            <a href="https://www.make.com/en/privacy-notice" className="underline" target="_blank" rel="noopener noreferrer">
              make.com/privacy-notice
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Zweck der Datenverarbeitung</h2>
          <p>
            Die von Ihnen im Online-Antrag eingegebenen Daten werden ausschließlich zur Bearbeitung
            Ihres Antrags auf Sozialhilfe nach SGB XII verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. e
            DSGVO i. V. m. § 67 SGB X.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Lokale Zwischenspeicherung</h2>
          <p>
            Ihre Formulareingaben werden im <code>localStorage</code> Ihres Browsers gespeichert. Diese
            Daten verlassen Ihr Gerät nicht, solange Sie den Antrag nicht absenden. Sie können die
            Daten jederzeit durch Löschen des Browser-Caches entfernen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO),
            Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und
            Datenübertragbarkeit (Art. 20 DSGVO). Zur Ausübung Ihrer Rechte wenden Sie sich an
            unseren Datenschutzbeauftragten.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Beschwerderecht</h2>
          <p>
            Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren:
            Landesbeauftragte für Datenschutz und Informationsfreiheit NRW,
            Kavalleriestr. 2–4, 40213 Düsseldorf.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
