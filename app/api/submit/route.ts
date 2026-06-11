import { NextRequest, NextResponse } from "next/server";
import { antragSchema, hzlAntragSchema } from "@/lib/schemas/antragSchema";
import fs from "fs";
import path from "path";

const COUNTER_FILE = path.join(process.cwd(), "data", "counter.json");

function nextLfdNr(): string {
  let current = 0;
  try {
    const raw = fs.readFileSync(COUNTER_FILE, "utf-8");
    current = JSON.parse(raw).lfdNr ?? 0;
  } catch { /* file missing or unreadable – start at 0 */ }
  const next = current + 1;
  try {
    fs.mkdirSync(path.dirname(COUNTER_FILE), { recursive: true });
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ lfdNr: next }), "utf-8");
  } catch { /* write failed – number still usable, just not persisted */ }
  return String(next).padStart(3, "0");
}

const MAX_RETRIES = 3;

async function postToWebhook(url: string, secret: string | undefined, body: object): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, 1000 * 2 ** (attempt - 1)));
    }
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30_000);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(secret ? { "X-Webhook-Secret": secret } : {}),
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) return res;
      lastError = new Error(`HTTP ${res.status}`);
      if (res.status >= 400 && res.status < 500) throw lastError;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // 1. Validate payload JSON
    const payloadRaw = formData.get("payload");
    if (typeof payloadRaw !== "string") {
      return NextResponse.json({ error: "Ungültige Anfrage: payload fehlt." }, { status: 400 });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(payloadRaw);
    } catch {
      return NextResponse.json({ error: "Ungültige Anfrage: payload kein gültiges JSON." }, { status: 400 });
    }

    // 2. Schema je nach Leistungsart wählen und validieren
    const p = payload as Record<string, unknown>;
    const isHzL = p.leistungsart === "hilfe_zum_lebensunterhalt";
    const schema = isHzL ? hzlAntragSchema : antragSchema;
    const validation = schema.safeParse(payload);
    if (!validation.success) {
      console.error("[submit] Validierungsfehler:", JSON.stringify(validation.error.issues, null, 2));
      const firstIssue = validation.error.issues[0];
      const detail = firstIssue ? `${firstIssue.path.join(".")}: ${firstIssue.message}` : "Unbekannt";
      return NextResponse.json(
        { error: `Validierungsfehler – ${detail}`, details: validation.error.issues },
        { status: 422 }
      );
    }

    // 3. Dateien kommen als Base64 bereits im Payload-JSON
    // Data-URI-Präfix entfernen – Make.com erwartet reines Base64 ohne "data:...;base64," Präfix
    const dateien = Array.isArray(p.dateien)
      ? (p.dateien as { field: string; name: string; type: string; size: number; base64: string }[])
          .map((d) => ({ ...d, base64: d.base64.replace(/^data:[^;]+;base64,/, "") }))
      : [];

    // 4. Forward to Make.com webhook
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("MAKE_WEBHOOK_URL not configured");
      return NextResponse.json({ error: "Serverkonfigurationsfehler." }, { status: 500 });
    }

    // Generate vorgangsnummer in format {GruSi|HzL}-{WBA|VAnz}-{JJJJMMDD}-{LfdNr}
    const { leistungsart, antragsart } = validation.data as { leistungsart: string; antragsart: string };
    const leistungsartCode = leistungsart === "grundsicherung" ? "GruSi" : "HzL";
    const antragsartCode = antragsart === "weiterbewilligung" ? "WBA" : "VAnz";
    const now = new Date();
    const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const lfdNr = nextLfdNr();
    const vorgangsnummer = `${leistungsartCode}-${antragsartCode}-${datePart}-${lfdNr}`;
    const zeitstempel = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}, ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} Uhr`;

    const jaNein = (v: unknown) => (v === true ? "Ja" : v === false ? "Nein" : v);
    const versicherung = (p.versicherung ?? {}) as Record<string, unknown>;

    // Webhook-Body: HzL und GruSi haben unterschiedliche Payload-Strukturen
    const webhookBody = isHzL
      ? {
          ...p,
          versicherung: {
            ...versicherung,
            richtigkeit: jaNein(versicherung.richtigkeit),
            datenschutz: jaNein(versicherung.datenschutz),
          },
          dateien,
          meta: { vorgangsnummer, zeitstempel },
        }
      : (() => {
          const vermoegen = (p.vermoegen ?? {}) as Record<string, unknown>;
          const wohnkosten = (p.wohnkosten ?? {}) as Record<string, unknown>;
          const einkommenWb = (p.einkommenWb ?? {}) as Record<string, unknown>;
          const einkommenPersonen = Array.isArray(einkommenWb.personen) ? einkommenWb.personen : [];
          return {
            ...p,
            einkommenWb: {
              ...einkommenWb,
              hatKeinEinkommen: jaNein(einkommenWb.hatKeinEinkommen),
              personen: einkommenPersonen.map((person: Record<string, unknown>) => ({
                ...person,
                keinEinkommen: jaNein(person.keinEinkommen),
              })),
            },
            vermoegen: {
              ...vermoegen,
              kontoauszuegeNachreichen: jaNein(vermoegen.kontoauszuegeNachreichen),
              hatPfaendungsschutzkonto: vermoegen.hatPfaendungsschutzkonto ?? "Nein",
            },
            wohnkosten: {
              ...wohnkosten,
              betriebskostenabrechnungVorhanden: jaNein(wohnkosten.betriebskostenabrechnungVorhanden),
            },
            versicherung: {
              ...versicherung,
              richtigkeit: jaNein(versicherung.richtigkeit),
              datenschutz: jaNein(versicherung.datenschutz),
            },
            dateien,
            meta: { vorgangsnummer, zeitstempel },
          };
        })();

    try {
      const webhookRes = await postToWebhook(webhookUrl, process.env.MAKE_WEBHOOK_SECRET, webhookBody);
      const webhookText = await webhookRes.text().catch(() => "(kein Body)");
      console.log(`[submit] Webhook OK – Status ${webhookRes.status}, Body: ${webhookText}`);
    } catch (err) {
      console.error("[submit] Webhook delivery failed:", err);
      return NextResponse.json(
        { error: "Übermittlung fehlgeschlagen. Bitte versuchen Sie es erneut." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, vorgangsnummer });
  } catch (err) {
    console.error("Unexpected error in /api/submit:", err);
    return NextResponse.json({ error: "Interner Serverfehler." }, { status: 500 });
  }
}
