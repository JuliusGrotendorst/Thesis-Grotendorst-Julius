import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { CONTACT } from "@/lib/constants";

export const metadata = { title: "Kontakt | Stadt Borken" };

export default function KontaktPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Startseite", href: "/" }, { label: "Kontakt" }]} />
      <main className="max-w-4xl mx-auto px-8 py-14">
        <h1 className="text-3xl font-bold mb-10">Kontakt</h1>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-brand-soft border border-brand-border rounded-sm p-7 space-y-4">
            <h2 className="font-semibold text-lg">Sozialamt Borken</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Zimmer 214<br />{CONTACT.address}
            </p>
            <p className="text-sm">
              Tel.: <a href={`tel:${CONTACT.sozialamt.replace(/\s/g, "")}`} className="underline">{CONTACT.sozialamt}</a>
            </p>
            <p className="text-sm">
              E-Mail: <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>
            </p>
            <table className="text-sm text-neutral-600 w-full mt-2">
              <caption className="text-left font-semibold text-neutral-800 mb-2">Sprechzeiten</caption>
              <tbody>
                {[["Mo, Di, Do", "08:00–12:00"], ["Mittwoch", "geschlossen"], ["Donnerstag", "14:00–18:00"], ["Freitag", "08:00–12:00"]].map(([d, h]) => (
                  <tr key={d}>
                    <td className="py-1">{d}</td>
                    <td className="py-1 text-right">{h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-brand-soft border border-brand-border rounded-sm p-7 space-y-4">
            <h2 className="font-semibold text-lg">Allgemeines Bürgertelefon</h2>
            <p className="text-sm text-neutral-600">Werktags 8–16 Uhr · auch in Leichter Sprache</p>
            <p className="text-2xl font-bold text-brand-text">
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a>
            </p>
            <p className="text-sm text-neutral-600">
              Rathaus Borken<br />{CONTACT.address}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
