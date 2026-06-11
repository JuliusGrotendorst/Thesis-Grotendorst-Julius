export const TEST_FORM_DATA: Record<string, unknown> = {
  leistungsart: "grundsicherung",
  antragsart: "weiterbewilligung",
  anrede: "Herr",
  vorname: "Hans",
  nachname: "Müller",
  geburtsdatum: "14.03.1952",
  geburtsort: "Münster",
  staatsangehoerigkeit: "Deutsch",
  familienstand: "Verheiratet",
  strasse: "Jahnstraße 3",
  plz: "46325",
  ort: "Borken",
  email: "test@example.com",
  telefon: "02861 123456",
  aktenzeichen: "SGA-2023-004817",
  aktenzeichenUnbekannt: false,
  hatBetreuung: "ja",
  betreuungVorname: "Klaus",
  betreuungNachname: "Hoffmann",
  betreuungTelefon: "02861 987654",
  betreuungEmail: "betreuer@example.com",
  haushaltPersonen: [
    { vorname: "Maria", nachname: "Müller", geburtsdatum: "22.07.1955", verwandtschaft: "Ehepartner*in" },
  ],
  hatKeinEinkommen: false,
  einkommensarten: [
    { art: "Rente / Pension", betrag: "780,00", haeufigkeit: "monatlich" },
    { art: "Wohngeld", betrag: "95,00", haeufigkeit: "monatlich" },
  ],
  bankguthaben: "2413,12",
  bargeld: "120,00",
  wertpapiere: "0,00",
  sonstigesVermoegen: "0,00",
  hatPfaendungsschutzkonto: "nein",
  kaltmiete: "520,00",
  nebenkosten: "130,00",
  heizkosten: "95,00",
  betriebskostenabrechnungVorhanden: true,
  veraenderungen:
    "Seit dem letzten Antrag hat sich der Rentenbetrag von Frau Müller aufgrund der jährlichen Rentenanpassung um 18,00 € erhöht. Ansonsten haben sich keine wesentlichen Änderungen ergeben.",
  richtigkeit: true,
  datenschutz: true,
};

export const TEST_HAUSHALT_EINKOMMEN = [
  {
    hatKeinEinkommen: false,
    einkommensarten: [{ art: "Rente / Pension", betrag: "420,00", haeufigkeit: "monatlich" as const }],
  },
];

export const TEST_HAUSHALT_VERMOEGEN = [
  { bankguthaben: "2540,00", bargeld: "50,00", wertpapiere: "0,00", sonstigesVermoegen: "0,00" },
];
