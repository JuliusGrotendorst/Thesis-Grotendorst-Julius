// Weiterbewilligung / Grundsicherung path (13 steps)
export const WB_FORM_STEPS = [
  { n: 1,  label: "Leistungsart" },
  { n: 2,  label: "Antragsart" },
  { n: 3,  label: "Pers. Daten" },
  { n: 4,  label: "Betreuung" },
  { n: 5,  label: "Pers. Verhältnisse" },
  { n: 6,  label: "Wohnkosten" },
  { n: 7,  label: "Einkommen" },
  { n: 8,  label: "Vermögen" },
  { n: 9,  label: "Mehrbedarfe & Versicherungen" },
  { n: 10, label: "Bankverbindung" },
  { n: 11, label: "Weitere Änderungen" },
  { n: 12, label: "Prüfen & Bestätigen" },
  { n: 13, label: "Absenden" },
] as const;

// Hilfe zum Lebensunterhalt path (16 steps)
export const HZL_FORM_STEPS = [
  { n: 1,  label: "Leistungsart" },
  { n: 2,  label: "Antragsart" },
  { n: 3,  label: "Pers. Daten" },
  { n: 4,  label: "Haushaltsangehörige" },
  { n: 5,  label: "Unterhalt" },
  { n: 6,  label: "Aufenthalt" },
  { n: 7,  label: "Krankenvers." },
  { n: 8,  label: "Einkommen" },
  { n: 9,  label: "Absetzb. Betr." },
  { n: 10, label: "Vermögen" },
  { n: 11, label: "Wohnkosten" },
  { n: 12, label: "Mögliche Ansprüche" },
  { n: 13, label: "Dokumente" },
  { n: 14, label: "Begründung" },
  { n: 15, label: "Prüfen" },
  { n: 16, label: "Absenden" },
] as const;

// Alias for backward compatibility
export const FORM_STEPS = WB_FORM_STEPS;

export const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
export const MAX_FILE_SIZE_MB = 10;
export const MAX_TOTAL_SIZE_MB = 50;

export const EINKOMMENSARTEN_OPTIONS = [
  "Rente / Pension",
  "Erwerbstätigkeit",
  "Arbeitslosengeld",
  "Unterhalt",
  "Krankengeld",
  "Wohngeld",
  "Kindergeld",
  "Sonstige",
] as const;

export const EINKOMMENSARTEN_DOCS: Record<string, string> = {
  "Rente / Pension": "Rentenbescheid (bei Erwerbsminderung auch DRV-Feststellung über dauerhafte/befristete Erwerbsunfähigkeit)",
  "Erwerbstätigkeit": "Lohnbescheinigung und/oder Einkommens-/Lohnsteuerbescheid",
  "Arbeitslosengeld": "Aktueller Leistungsbescheid",
  "Unterhalt": "Nachweise über Unterhaltszahlungen (Urteil/Vergleich)",
  "Krankengeld": "Krankengeldbescheinigung",
  "Wohngeld": "Wohngeldbescheid",
  "Kindergeld": "Kindergeldbescheid",
  "Sonstige": "Nachweis über die jeweilige Einkommensart",
};

export const HZL_EINKOMMENSARTEN = [
  "Nichtselbstständige Tätigkeit (Nettolohn/Ausbildungsvergütung)",
  "Krankengeld (inkl. Arbeitgeberzuschuss)",
  "Land- und Forstwirtschaft",
  "Gewerbebetrieb",
  "Sonstige selbstständige Tätigkeit",
  "Kapitalvermögen",
  "Vermietung und Verpachtung",
  "Renten / Pensionen",
  "Leistungen Grundsicherung (SGB XII)",
  "Leistungen nach BVG (z.B. Grundrente, Elternrente)",
  "Leistungen nach Lastenausgleichsgesetz",
  "Leistungen SGB II / III (Grundsicherung f. Arbeitsuchende)",
  "Leistungen nach Wohngeldgesetz (Mietzuschuss)",
  "Leistungen für Kinder (Kindergeld, Erziehungsgeld, Unterhaltsvorschuss)",
  "Ausbildungsförderung",
  "Unterhaltsbeiträge",
  "Leistungen nach Blinden-/Gehörlosengesetz",
  "Leistungen der Pflegekasse",
  "Privatrechtliche geldwerte Ansprüche (z.B. Wohnrecht, Taschengeld)",
  "Leistungen Asylbewerberleistungsgesetz",
  "Steuererstattung",
  "Sonstige Einkünfte",
] as const;

export const HZL_ABSETZBARE_BETRAEGE = [
  "Krankenversicherung",
  "Pflegeversicherung",
  "Rentenversicherung",
  "Altersvorsorgebeiträge",
  "Unfallversicherung",
  "Sterbegeldversicherung",
  "Lebensversicherung",
  "Hausratversicherung",
  "Haftpflichtversicherung",
  "Berufsunfähigkeitsversicherung",
  "Rechtsschutzversicherung",
  "PKW-Haftpflichtversicherung",
  "Aufwendungen für Arbeitsmittel",
  "Beiträge für Berufsverbände",
  "Mehraufwendungen für doppelte Haushaltsführung",
  "Fahrtkosten zur Arbeitsstelle (öffentliche Verkehrsmittel)",
  "Fahrtkosten zur Arbeitsstelle (PKW)",
  "Fahrtkosten zur Arbeitsstelle (Motorrad / Mofa)",
  "Sonstige absetzbare Beträge",
] as const;

export const HZL_VERMOEGEN_ARTEN = [
  "Bargeld",
  "Bank-/Sparguthaben (inkl. VWL)",
  "Wertpapiere",
  "Forderungen",
  "Lebensversicherungen (Rückkaufwert)",
  "Bestattungsvorsorge",
  "Hauseigentum / Wohnungseigentum",
  "Sonstiger Grundbesitz",
  "Kraftfahrzeuge",
  "Sonstiges Vermögen",
  "Staatl. geförderte private Altersvorsorge",
  "Mietkaution / Genossenschaftsanteile",
] as const;

export const HZL_VERHAELTNIS_OPTIONS = [
  "Ehegatte / eingetr. Lebenspartner*in",
  "Partner*in in eheähnlicher Gemeinschaft",
  "Mutter (bei unverheirateten Minderjährigen)",
  "Vater (bei unverheirateten Minderjährigen)",
  "Kind",
  "Elternteil",
  "Geschwister",
  "Sonstige Person",
] as const;

export const HZL_ANSPRUCH_ARTEN = [
  "Rentenversicherung",
  "Krankenversicherung",
  "Pflegeversicherung",
  "Unfallversicherung",
  "Lebens- und Sterbeversicherung",
  "Leistungen SGB II / III",
  "Leistungen nach BVG",
  "Ansprüche auf Sachleistungen",
  "Sonstige Ansprüche",
] as const;

export const VERWANDTSCHAFT_OPTIONS = [
  "Ehepartner*in",
  "eingetragene*r Lebenspartner*in",
  "Kind",
  "Elternteil",
  "Geschwister",
  "Sonstige Person",
] as const;

export const NAV_ITEMS = [
  { label: "Bürgerservice", href: "/" },
  { label: "Soziales", href: "/sozialhilfe" },
  { label: "Bauen & Wohnen", href: "/bauen-wohnen" },
  { label: "Familie", href: "/familie" },
  { label: "Verwaltung", href: "/verwaltung" },
  { label: "Stadt erleben", href: "/stadt-erleben" },
] as const;

export const CONTACT = {
  address: "Im Piepershagen 17, 46325 Borken",
  phone: "0 28 61 / 939-0",
  sozialamt: "0 28 61 / 939-214",
  email: "sozialamt@borken.de",
  terminLink: "https://termine.borken.de",
} as const;
