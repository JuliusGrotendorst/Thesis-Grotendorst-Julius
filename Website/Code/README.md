# Webformular

Next.js 14 · TypeScript · Tailwind CSS

## Lokale Einrichtung

node.js (Standardeinstellungen) installieren

.env.local.example in .env.local umwandeln und Webhook-URL eintragen (siehe unten)

```bash
cd "folder"
npm install
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000).

## Make.com-Szenario einrichten

### 1. Neues Szenario anlegen

1. Make.com öffnen → **Neues Szenario erstellen**
2. Create Scenario → [**import blueprint**](https://github.com/JuliusGrotendorst/Thesis-Grotendorst-Julius/blob/b910a24367370348a6288b60aa369af3e5d0fe85/KI-Agent/Make_Scenario_blueprint.json) 
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
