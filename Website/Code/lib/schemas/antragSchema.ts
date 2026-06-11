import { z } from "zod";

// ── Step 1: Leistungsart ──────────────────────────────────────────────────
export const leistungsartSchema = z.object({
  leistungsart: z.enum(["grundsicherung", "hilfe_zum_lebensunterhalt"], {
    required_error: "Bitte wählen Sie eine Leistungsart.",
  }),
});

// ── Step 2: Antragsart ────────────────────────────────────────────────────
export const antragsartSchema = z.object({
  antragsart: z.enum(["neuantrag", "weiterbewilligung"], {
    required_error: "Bitte wählen Sie eine Antragsart.",
  }),
});

// ── Step 3: Persönliche Daten ─────────────────────────────────────────────
export const personalDataSchema = z.object({
  anrede: z.string().optional(),
  vorname: z.string().min(1, "Bitte geben Sie Ihren Vornamen an."),
  nachname: z.string().min(1, "Bitte geben Sie Ihren Nachnamen an."),
  geburtsdatum: z
    .string()
    .min(1, "Bitte geben Sie Ihr Geburtsdatum an.")
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, "Format: TT.MM.JJJJ"),
  geburtsort: z.string().min(1, "Bitte Geburtsort angeben."),
  staatsangehoerigkeit: z.string().min(1, "Bitte Staatsangehörigkeit angeben."),
  familienstand: z.string().min(1, "Bitte Familienstand angeben."),
  strasse: z.string().min(1, "Bitte Straße und Hausnummer angeben."),
  plz: z.string().regex(/^\d{5}$/, "PLZ besteht aus genau 5 Ziffern."),
  ort: z.string().min(1, "Bitte Ort angeben."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  telefon: z.string().optional(),
  aktenzeichenUnbekannt: z.boolean().optional(),
  aktenzeichen: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.aktenzeichenUnbekannt && (!data.aktenzeichen || data.aktenzeichen.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Bitte Aktenzeichen eingeben oder 'Aktenzeichen ist mir nicht bekannt' auswählen.",
      path: ["aktenzeichen"],
    });
  }
});

// ── Step 4: Betreuung ─────────────────────────────────────────────────────
export const betreuungSchema = z.object({
  hatBetreuung: z.enum(["ja", "nein"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  betreuungVorname: z.string().optional(),
  betreuungNachname: z.string().optional(),
  betreuungTelefon: z.string().optional(),
  betreuungEmail: z.string().optional(),
  betreuungArt: z.enum(["betreuung", "vollmacht", "vormund"]).optional(),
}).superRefine((data, ctx) => {
  if (data.hatBetreuung === "ja") {
    if (!data.betreuungArt) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte Art der Vertretung angeben.", path: ["betreuungArt"] });
    }
    if (!data.betreuungVorname?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Vorname der betreuenden Person erforderlich.", path: ["betreuungVorname"] });
    }
    if (!data.betreuungNachname?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nachname der betreuenden Person erforderlich.", path: ["betreuungNachname"] });
    }
  }
});

// ── Step 5: Haushalt ──────────────────────────────────────────────────────
export const haushaltPersonSchema = z.object({
  vorname: z.string().min(1, "Vorname erforderlich."),
  nachname: z.string().min(1, "Nachname erforderlich."),
  geburtsdatum: z.string().min(1, "Geburtsdatum erforderlich."),
  verwandtschaft: z.string().min(1, "Verwandtschaftsverhältnis angeben."),
});

export const haushaltSchema = z.object({
  haushaltPersonen: z.array(haushaltPersonSchema),
});

// ── Step 6: Einkommen ─────────────────────────────────────────────────────
export const einkommensartSchema = z.object({
  art: z.string(),
  betrag: z.string().optional(),
  haeufigkeit: z.enum(["monatlich", "einmalig"]).optional(),
});

export const einkommenSchema = z.object({
  einkommensarten: z.array(einkommensartSchema),
  hatKeinEinkommen: z.boolean().optional(),
});

// ── Step 7: Vermögen ──────────────────────────────────────────────────────
export const vermoegenSchema = z.object({
  bankguthaben: z.string().optional(),
  bargeld: z.string().optional(),
  wertpapiere: z.string().optional(),
  sonstigesVermoegen: z.string().optional(),
  hatPfaendungsschutzkonto: z.enum(["ja", "nein"]).optional(),
  kontoauszuegeNachreichen: z.boolean().optional(),
  kontoauszuegeNachreichDatum: z.string().optional(),
});

// ── Step 5: Persönliche Verhältnisse ──────────────────────────────────────
export const persoenlicheVerhaeltnisseSchema = z.object({
  familienstandAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  neuerFamilienstand: z.string().optional(),
  haushaltGroesseAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  anzahlPersonen: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.familienstandAenderung === "aenderung" && !data.neuerFamilienstand?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte neuen Familienstand angeben.", path: ["neuerFamilienstand"] });
  }
  if (data.haushaltGroesseAenderung === "aenderung" && !data.anzahlPersonen?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte aktuelle Anzahl der Personen angeben.", path: ["anzahlPersonen"] });
  }
});

// ── Step 6: Wohnkosten (Weiterbewilligung) ────────────────────────────────
export const wohnkostenWbSchema = z.object({
  wohnkostenAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  wohnart: z.enum(["miete", "eigentum"]).optional(),
  kaltmiete: z.string().optional(),
  nebenkosten: z.string().optional(),
  heizkosten: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.wohnkostenAenderung === "aenderung") {
    if (!data.wohnart)
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte Wohnform angeben.", path: ["wohnart"] });
    if (data.wohnart === "miete" && !data.kaltmiete?.trim())
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte Kaltmiete angeben.", path: ["kaltmiete"] });
    if (data.wohnart === "eigentum" && !data.kaltmiete?.trim())
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte laufende Hauskosten angeben.", path: ["kaltmiete"] });
  }
});

// ── Step 7: Einkommen (Weiterbewilligung) ─────────────────────────────────
export const einkommenWbSchema = z.object({
  einkommenAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
});

// ── Step 8: Vermögen (Weiterbewilligung) ──────────────────────────────────
export const vermoegenWbSchema = z.object({
  vermoegenAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  bankguthaben: z.string().optional(),
  bargeld: z.string().optional(),
  wertpapiere: z.string().optional(),
  sonstigesVermoegen: z.string().optional(),
  hatPfaendungsschutzkonto: z.enum(["ja", "nein"]).optional(),
});

// ── Step 9: Mehrbedarfe & Versicherungen ─────────────────────────────────
export const schwerbehinderungSchema = z.object({
  schwerbehinderungAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  merkzeichenGAG: z.enum(["ja", "nein"]).optional(),
  ernaehrungAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  haftpflichtAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  hausratAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  weitereVersicherungenAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
});

// ── Step 10: Bankverbindung ───────────────────────────────────────────────
export const bankverbindungSchema = z.object({
  bankverbindungAenderung: z.enum(["keine", "aenderung"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  kontoinhaber: z.string().optional(),
  iban: z.string().optional(),
  bic: z.string().optional(),
  geldinstitut: z.string().optional(),
  bankHatPfaendungsschutzkonto: z.enum(["ja", "nein"]).optional(),
}).superRefine((data, ctx) => {
  if (data.bankverbindungAenderung === "aenderung") {
    if (!data.kontoinhaber?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte Kontoinhaber angeben.", path: ["kontoinhaber"] });
    }
    if (!data.iban?.replace(/\s/g, "").trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte IBAN angeben.", path: ["iban"] });
    }
    if (!data.geldinstitut?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte Geldinstitut angeben.", path: ["geldinstitut"] });
    }
  }
});

// ── Step 11: Auslandsaufenthalt & Weitere Änderungen ─────────────────────
export const auslandsaufenthaltSchema = z.object({
  auslandsaufenthaltGeplant: z.enum(["ja", "nein"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  auslandsaufenthaltAbWann: z.string().optional(),
  auslandsaufenthaltDauer: z.string().optional(),
  weitereVeraenderungen: z.enum(["ja", "nein"], {
    required_error: "Bitte treffen Sie eine Auswahl.",
  }),
  veraenderungenBeschreibung: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.auslandsaufenthaltGeplant === "ja") {
    if (!data.auslandsaufenthaltAbWann?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte geplantes Abreisedatum angeben.", path: ["auslandsaufenthaltAbWann"] });
    }
    if (!data.auslandsaufenthaltDauer?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte voraussichtliche Aufenthaltsdauer angeben.", path: ["auslandsaufenthaltDauer"] });
    }
  }
  if (data.weitereVeraenderungen === "ja" && !data.veraenderungenBeschreibung?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte Änderungen beschreiben.", path: ["veraenderungenBeschreibung"] });
  }
});

// ── Step 8 (alt): Veränderte Verhältnisse ────────────────────────────────
export const veraenderungenSchema = z.object({
  veraenderungen: z.string().optional(),
});

// ── Step 9: Wohnkosten ────────────────────────────────────────────────────
export const wohnkostenSchema = z.object({
  aenderung: z.enum(["keine", "aenderung"]).optional(),
  kaltmiete: z.string().optional(),
  nebenkosten: z.string().optional(),
  heizkosten: z.string().optional(),
  betriebskostenabrechnungVorhanden: z.boolean().optional(),
});

// ── Step 10: Versicherung ─────────────────────────────────────────────────
export const versicherungSchema = z.object({
  richtigkeit: z.literal(true, {
    errorMap: () => ({ message: "Bitte bestätigen Sie die Richtigkeit Ihrer Angaben." }),
  }),
  datenschutz: z.literal(true, {
    errorMap: () => ({ message: "Bitte nehmen Sie den Datenschutzhinweis zur Kenntnis." }),
  }),
});

// ── Vollständiges Schema (verschachtelt, entspricht der API-Payload) ───────
export const antragSchema = z.object({
  leistungsart: leistungsartSchema.shape.leistungsart,
  antragsart: antragsartSchema.shape.antragsart,
  antragsteller: z.object({
    anrede: z.string().optional(),
    vorname: z.string().min(1, "Vorname erforderlich."),
    nachname: z.string().min(1, "Nachname erforderlich."),
    geburtsdatum: z.string().min(1, "Geburtsdatum erforderlich."),
    geburtsort: z.string().optional(),
    staatsangehoerigkeit: z.string().min(1),
    familienstand: z.string().min(1),
    strasse: z.string().min(1),
    plz: z.string().regex(/^\d{5}$/),
    ort: z.string().min(1),
    email: z.string().email(),
    telefon: z.string().optional(),
    aktenzeichen: z.string().optional(),
  }),
  betreuung: z.object({
    hatBetreuung: z.enum(["ja", "nein"]),
    vorname: z.string().optional(),
    nachname: z.string().optional(),
    telefon: z.string().optional(),
    email: z.string().optional(),
  }),
  haushalt: z.array(haushaltPersonSchema).optional(),
  einkommen: z.array(einkommensartSchema).optional(),
  vermoegen: vermoegenSchema,
  veraenderungen: z.string().optional(),
  wohnkosten: wohnkostenSchema,
  versicherung: versicherungSchema,
  dateiReferenzen: z
    .array(
      z.object({
        field: z.string(),
        name: z.string(),
        size: z.number(),
      })
    )
    .optional(),
});

// ── HzL: Persönliche Daten (erweitert, kein Aktenzeichen) ────────────────
export const hzlPersonalDataSchema = z.object({
  anrede: z.string().optional(),
  vorname: z.string().min(1, "Bitte geben Sie Ihren Vornamen an."),
  nachname: z.string().min(1, "Bitte geben Sie Ihren Nachnamen an."),
  geburtsdatum: z.string().min(1, "Pflichtfeld").regex(/^\d{2}\.\d{2}\.\d{4}$/, "Format: TT.MM.JJJJ"),
  geburtsort: z.string().min(1, "Pflichtfeld"),
  staatsangehoerigkeit: z.string().min(1, "Pflichtfeld"),
  aufenthaltsstatusAuslaender: z.enum(["eu", "kriegsfluechtling", "asyl", "sonstiger"]).optional(),
  familienstand: z.string().min(1, "Pflichtfeld"),
  familienstandSeit: z.string().optional(),
  strasse: z.string().min(1, "Pflichtfeld"),
  plz: z.string().regex(/^\d{5}$/, "5-stellige PLZ"),
  ort: z.string().min(1, "Pflichtfeld"),
  email: z.string().email("Gültige E-Mail-Adresse"),
  telefon: z.string().optional(),
  beschaeftigung: z.enum(["ja", "nein"], { required_error: "Bitte treffen Sie eine Auswahl." }),
  einschraenkungArbeitskraft: z.enum(["ja", "nein"], { required_error: "Bitte treffen Sie eine Auswahl." }),
  volleErwerbsminderung: z.enum(["ja", "nein"], { required_error: "Bitte treffen Sie eine Auswahl." }),
  schwerbehinderungDatum: z.string().optional(),
  schwerbehinderungGrad: z.string().optional(),
  schwerbehinderungAntragGestellt: z.enum(["ja", "nein"]).optional(),
  geschiedenUrteilDatum: z.string().optional(),
  geschiedenGericht: z.string().optional(),
  geschiedenGeschaeftszeichen: z.string().optional(),
  aktenzeichen: z.string().optional(),
  aktenzeichenUnbekannt: z.boolean().optional(),
});

// ── HzL: Haushaltsperson (vollständig) ───────────────────────────────────
export const hzlHaushaltPersonSchema = z.object({
  verhaeltnis: z.string().min(1, "Pflichtfeld"),
  vorname: z.string().min(1, "Pflichtfeld"),
  nachname: z.string().min(1, "Pflichtfeld"),
  geburtsdatum: z.string().min(1, "Pflichtfeld"),
  geburtsort: z.string().optional(),
  familienstand: z.string().optional(),
  familienstandSeit: z.string().optional(),
  staatsangehoerigkeit: z.string().optional(),
  aufenthaltsstatusAuslaender: z.string().optional(),
  beschaeftigung: z.enum(["ja", "nein"]).optional(),
  einschraenkungArbeitskraft: z.enum(["ja", "nein"]).optional(),
  volleErwerbsminderung: z.enum(["ja", "nein"]).optional(),
  schwerbehinderungDatum: z.string().optional(),
  schwerbehinderungGrad: z.string().optional(),
  schwerbehinderungAntragGestellt: z.enum(["ja", "nein"]).optional(),
  leistungenSelbst: z.enum(["ja", "nein"]).optional(),
  anrede: z.string().optional(),
  strasse: z.string().optional(),
  plz: z.string().optional(),
  ort: z.string().optional(),
  geschiedenUrteilDatum: z.string().optional(),
  geschiedenGericht: z.string().optional(),
  geschiedenGeschaeftszeichen: z.string().optional(),
  hatBetreuung: z.enum(["ja", "nein"]).optional(),
  betreuungVorname: z.string().optional(),
  betreuungNachname: z.string().optional(),
  betreuungAnschrift: z.string().optional(),
});

export const hzlHaushaltSchema = z.object({
  hzlHaushaltPersonen: z.array(hzlHaushaltPersonSchema),
});

// ── HzL: Aufenthaltsverhältnisse ─────────────────────────────────────────
export const hzlAufenthaltSchema = z.object({
  zugezogenAm: z.string().optional(),
  fruehereSozialhilfe: z.enum(["ja", "nein"], { required_error: "Bitte treffen Sie eine Auswahl." }),
  fruehereSozialhilfeVon: z.string().optional(),
  fruehereSozialhilfeBis: z.string().optional(),
  fruehereSozialhilfeWo: z.string().optional(),
  einrichtungsaufenthaltVorhanden: z.enum(["ja", "nein"], { required_error: "Bitte treffen Sie eine Auswahl." }),
  einrichtungsaufenthalt: z.string().optional(),
  uebertrittAusland: z.enum(["ja", "nein"]).optional(),
  uebertrittDatum: z.string().optional(),
  uebertrittOrt: z.string().optional(),
  frueherAnschrift: z.string().optional(),
  geborenaAusserhalb: z.enum(["ja", "nein"]).optional(),
  einreiseDatumDeutschland: z.string().optional(),
  beduerftigkeitInErstemMonat: z.enum(["ja", "nein"]).optional(),
  auslaendischeLeistungen: z.enum(["ja", "nein"]).optional(),
  auslaendischeLeistungenDetails: z.string().optional(),
  kriegsereignisseAngehoerige: z.enum(["ja", "nein"], { required_error: "Bitte treffen Sie eine Auswahl." }),
  kriegsereignisseDetails: z.string().optional(),
  ddrEntscheidungen: z.enum(["ja", "nein"], { required_error: "Bitte treffen Sie eine Auswahl." }),
  ddrDetails: z.string().optional(),
});

// ── HzL: Wohnkosten (vollständig) ────────────────────────────────────────
export const hzlWohnkostenSchema = z.object({
  kaltmiete: z.string().optional(),
  nebenkosten: z.string().optional(),
  wohnungGroesseQm: z.string().optional(),
  wohnungAnzahlRaeume: z.string().optional(),
  untervermietet: z.enum(["ja", "nein"], { required_error: "Bitte treffen Sie eine Auswahl." }),
  untervermieteteRaeume: z.string().optional(),
  vermieterName: z.string().optional(),
  vermieterAnschrift: z.string().optional(),
  wohngeldBewilligtBis: z.string().optional(),
  wohngeldBetrag: z.string().optional(),
  heizungsart: z.enum(["zentral", "einzel"], { required_error: "Bitte Heizungsart angeben." }),
  energieart: z.string().min(1, "Bitte Energieart auswählen."),
  kochfeuerungEnthalten: z.enum(["ja", "nein"], { required_error: "Bitte treffen Sie eine Auswahl." }),
  heizungspauschale: z.string().optional(),
  heizungspauschaleWarmwasser: z.enum(["ohne", "mit"], { required_error: "Bitte treffen Sie eine Auswahl." }),
  heizungspauschaleZahlenAn: z.string().optional(),
  einnahmenUntervermietung: z.string().optional(),
  personenImHaushalt: z.string().optional(),
  energieartSonstige: z.string().optional(),
  leerRaeume: z.string().optional(),
  mobiertRaeume: z.string().optional(),
  mieterVorname: z.string().optional(),
  mieterNachname: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.kaltmiete?.trim())
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bitte Kaltmiete angeben.", path: ["kaltmiete"] });
});

// ── HzL: Antragsbegründung & Bankdaten ───────────────────────────────────
export const hzlBegruendungSchema = z.object({
  antragBegruendung: z.string().optional(),
  sonstigeAnmerkungen: z.string().optional(),
  hzlIban: z.string().optional(),
  hzlBankInstitut: z.string().optional(),
});

// ── HzL: Prüfen & Bestätigen ─────────────────────────────────────────────
export const hzlVersicherungSchema = z.object({
  hzlRichtigkeit: z.literal(true, {
    errorMap: () => ({ message: "Bitte bestätigen Sie die Richtigkeit Ihrer Angaben." }),
  }),
  hzlDatenschutz: z.literal(true, {
    errorMap: () => ({ message: "Bitte nehmen Sie den Datenschutzhinweis zur Kenntnis." }),
  }),
});

// ── HzL: Vollständiges Schema für API-Validierung ─────────────────────────
// Validiert die kritischen Pflichtfelder; alle weiteren HzL-Felder werden
// via .passthrough() unverändert durchgereicht.
export const hzlAntragSchema = z
  .object({
    leistungsart: z.literal("hilfe_zum_lebensunterhalt"),
    antragsart: antragsartSchema.shape.antragsart,
    antragsteller: z
      .object({
        vorname: z.string().min(1, "Vorname erforderlich."),
        nachname: z.string().min(1, "Nachname erforderlich."),
        geburtsdatum: z.string().min(1, "Geburtsdatum erforderlich."),
        staatsangehoerigkeit: z.string().min(1),
        familienstand: z.string().min(1),
        strasse: z.string().min(1),
        plz: z.string().regex(/^\d{5}$/),
        ort: z.string().min(1),
        email: z.string().email(),
      })
      .passthrough(),
    versicherung: z.object({
      richtigkeit: z.literal(true, {
        errorMap: () => ({ message: "Bitte bestätigen Sie die Richtigkeit Ihrer Angaben." }),
      }),
      datenschutz: z.literal(true, {
        errorMap: () => ({ message: "Bitte nehmen Sie den Datenschutzhinweis zur Kenntnis." }),
      }),
      unterschrift: z.enum(["Ja", "Nein"]).optional(),
    }),
  })
  .passthrough();

export type AntragData = z.infer<typeof antragSchema>;
export type HaushaltPerson = z.infer<typeof haushaltPersonSchema>;
export type Einkommensart = z.infer<typeof einkommensartSchema>;
export type PersoenlicheVerhaeltnisse = z.infer<typeof persoenlicheVerhaeltnisseSchema>;
export type WohnkostenWb = z.infer<typeof wohnkostenWbSchema>;
export type VermoegenWb = z.infer<typeof vermoegenWbSchema>;
export type Schwerbehinderung = z.infer<typeof schwerbehinderungSchema>;
export type Bankverbindung = z.infer<typeof bankverbindungSchema>;
export type Auslandsaufenthalt = z.infer<typeof auslandsaufenthaltSchema>;
