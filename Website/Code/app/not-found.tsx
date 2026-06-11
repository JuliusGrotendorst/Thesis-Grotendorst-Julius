import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-8 py-24 text-center">
        <p className="text-6xl font-bold text-brand-accent mb-4">404</p>
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          Seite nicht gefunden
        </h1>
        <p className="text-neutral-600 mb-8">
          Die gesuchte Seite existiert nicht oder wurde verschoben. Hier sind einige hilfreiche Links:
        </p>
        <div className="flex flex-col gap-3 items-center">
          <Link href="/"><Button>Zur Startseite</Button></Link>
          <Link href="/sozialhilfe"><Button variant="secondary">Sozialhilfe-Übersicht</Button></Link>
          <Link href="/antrag/sozialhilfe"><Button variant="secondary">Online-Antrag starten</Button></Link>
          <Link href="/kontakt"><Button variant="ghost">Kontakt aufnehmen</Button></Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
