# Stadt Borken – Online-Antrag Sozialhilfe (SGB XII)

Next.js 14 · TypeScript · Tailwind CSS · React Hook Form · Zod · Zustand

## Lokale Einrichtung

```bash
npm install
cp .env.local.example .env.local
# Webhook-URL eintragen (siehe unten)
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000).

## Projektstruktur

```
app/
  api/submit/route.ts        API-Route: Validierung + Weiterleitung an Make.com
  antrag/sozialhilfe/        11-schrittiges Online-Formular
  sozialhilfe/               Übersichtsseite Sozialhilfe
  impressum, datenschutz,    Statische Pflichtseiten
  barrierefreiheit, kontakt/
  not-found.tsx              Angepasste 404-Seite

components/
  layout/                    Header, Footer, ServiceBar, Breadcrumb
  ui/                        Button, Input, Select, RadioGroup, Checkbox,
                             FileUpload, ProgressBar, InfoBox
  form/
    FormStep.tsx             Navigation zwischen Schritten
    steps/Step01–Step11      Alle 11 Formularschritte

lib/
  schemas/antragSchema.ts    Zod-Schema (identisch client + server)
  store/formStore.ts         Zustand-Store mit localStorage-Persistenz
  constants/index.ts         Konfiguration: Schritte, Felder, Kontakt
```

## Make.com-Szenario einrichten

### 1. Neues Szenario anlegen

1. Make.com öffnen → **Neues Szenario erstellen**
2. Create Scenario → **import blueprint**
3. Webhook → **Add**

### 2. Webhook-URL konfigurieren

```bash
# .env.local
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/Ihre_URL_hier
```

Starten Sie `npm run dev` und senden Sie einen Test-Antrag ab. Make.com erkennt die Datenstruktur automatisch.

### 3. Datenstruktur des Webhooks

Der Webhook empfängt `multipart/form-data` mit:

- **`payload`** (JSON-String): Alle Formulardaten strukturiert:
  ```json
  {
    "meta": { "vorgangsnummer": "uuid", "zeitstempel": "ISO8601" },
    "antragsteller": { "vorname": "…", "email": "…", … },
    "betreuung": { "hatBetreuung": "nein" },
    "haushalt": [],
    "einkommen": [{ "art": "Rente", "betrag": "850", "haeufigkeit": "monatlich" }],
    "vermoegen": { "bankguthaben": "200" },
    "veraenderungen": "Mieterhöhung zum 01.06.",
    "wohnkosten": { "kaltmiete": "480", "nebenkosten": "120", "heizkosten": "80" },
    "versicherung": { "richtigkeit": true, "datenschutz": true },
    "dateiReferenzen": [{ "field": "betreuung_vollmacht", "name": "vollmacht.pdf", "size": 123456 }]
  }
  ```

- **Dateien** (benannt nach `field`): `betreuung_vollmacht`, `einkommen_nachweis_1`, `vermoegen_kontoauszug_1`, `wohnkosten_betriebskosten`, `wohnkosten_mietbescheinigung`, `veraenderungen_belege`

## Umgebungsvariablen

| Variable | Pflicht | Beschreibung |
|----------|---------|-------------|
| `MAKE_WEBHOOK_URL` | Ja | Make.com Webhook-URL |
