# Sozialamt Borken
## Grundsicherung im Alter und bei Erwerbsminderung
### Antragsdatenblatt – Weiterbewilligung   ·   §§ 41–46b SGB XII

## Metadaten

| Feld | Wert |
| --- | --- |
| Vorgangsnummer | {{meta.vorgangsnummer}} |
| Zeitstempel | {{meta.zeitstempel}} |

## Antragsteller*in

| Feld | Wert |
| --- | --- |
| Anrede | {{antragsteller.anrede}} |
| Vorname | {{antragsteller.vorname}} |
| Nachname | {{antragsteller.nachname}} |
| Geburtsdatum | {{antragsteller.geburtsdatum}} |
| Geburtsort | {{antragsteller.geburtsort}} |
| Staatsangehörigkeit | {{antragsteller.staatsangehoerigkeit}} |
| Familienstand | {{antragsteller.familienstand}} |
| Straße / Hausnr. | {{antragsteller.strasse}} |
| PLZ | {{antragsteller.plz}} |
| Ort | {{antragsteller.ort}} |
| E-Mail | {{antragsteller.email}} |
| Telefon | {{antragsteller.telefon}} |
| Aktenzeichen | {{antragsteller.aktenzeichen}} |

## Betreuung

| Feld | Wert |
| --- | --- |
| Liegt Betreuung / Vollmacht vor? | {{betreuung.hatBetreuung}} |
| Vorname | {{betreuung.vorname}} |
| Nachname | {{betreuung.nachname}} |
| Telefon | {{betreuung.telefon}} |
| E-Mail | {{betreuung.email}} |

Felder bleiben leer, wenn keine Betreuung oder Vollmacht vorliegt.

## Persönliche Verhältnisse

| Feld | Wert |
| --- | --- |
| Familienstand – Änderung | {{persoenlicheVerhaeltnisse.familienstandAenderung}} |
| Neuer Familienstand | {{persoenlicheVerhaeltnisse.neuerFamilienstand}} |
| Haushaltsgröße – Änderung | {{persoenlicheVerhaeltnisse.haushaltGroesseAenderung}} |
| Anzahl Personen | {{persoenlicheVerhaeltnisse.anzahlPersonen}} |

## Wohnkosten

| Feld | Wert |
| --- | --- |
| Änderung | {{wohnkosten.aenderung}} |
| Kaltmiete (€) | {{wohnkosten.kaltmiete}} |
| Nebenkosten / Betriebskosten (€) | {{wohnkosten.nebenkosten}} |
| Heizkosten (€) | {{wohnkosten.heizkosten}} |
| Betriebskostenabrechnung vorhanden | {{wohnkosten.betriebskostenabrechnungVorhanden}} |

## Einkommen

| Feld | Wert |
| --- | --- |
| Änderung | {{einkommenWb.aenderung}} |
| Kein Einkommen (gesamt) | {{einkommenWb.hatKeinEinkommen}} |

### Person 1

| Feld | Wert |
| --- | --- |
| Name | "{{einkommenWb.personen[1].name}}" |
| Kein Einkommen | "{{einkommenWb.personen[1].keinEinkommen}}" |
| Einkommensart 1 – Art | "{{einkommenWb.personen[1].einkommensarten[1].art}}" |
| Einkommensart 1 – Betrag (€) | "{{einkommenWb.personen[1].einkommensarten[1].betrag}}" |
| Einkommensart 1 – Häufigkeit | "{{einkommenWb.personen[1].einkommensarten[1].haeufigkeit}}" |

[weitere Personen/Arten analog]

## Vermögen

| Feld | Wert |
| --- | --- |
| Änderung | {{vermoegen.aenderung}} |
| Bankguthaben (€) | {{vermoegen.bankguthaben}} |
| Bargeld (€) | {{vermoegen.bargeld}} |
| Wertpapiere / Aktien (€) | {{vermoegen.wertpapiere}} |
| Sonstiges Vermögen | {{vermoegen.sonstigesVermoegen}} |
| Pfändungsschutzkonto (P-Konto) | {{vermoegen.hatPfaendungsschutzkonto}} |
| Kontoauszüge nachreichen | {{vermoegen.kontoauszuegeNachreichen}} |
| Nachreich-Datum | {{vermoegen.kontoauszuegeNachreichDatum}} |

## Mehrbedarfe & Versicherungen

| Feld | Wert |
| --- | --- |
| Schwerbehinderung – Änderung | {{mehrbedarfeVersicherungen.schwerbehinderungAenderung}} |
| Ernährung – Änderung | {{mehrbedarfeVersicherungen.ernaehrungAenderung}} |
| Haftpflicht – Änderung | {{mehrbedarfeVersicherungen.haftpflichtAenderung}} |
| Hausrat – Änderung | {{mehrbedarfeVersicherungen.hausratAenderung}} |
| Weitere Versicherungen – Änderung | {{mehrbedarfeVersicherungen.weitereVersicherungenAenderung}} |

## Bankverbindung

| Feld | Wert |
| --- | --- |
| Änderung | {{bankverbindung.aenderung}} |

## Sonstige Veränderungen

| Feld | Wert |
| --- | --- |
| Auslandsaufenthalt geplant | {{sonstigeVeraenderungen.auslandsaufenthaltGeplant}} |
| Auslandsaufenthalt – ab wann | {{sonstigeVeraenderungen.auslandsaufenthaltAbWann}} |
| Auslandsaufenthalt – Dauer | {{sonstigeVeraenderungen.auslandsaufenthaltDauer}} |
| Weitere Veränderungen | {{sonstigeVeraenderungen.weitereVeraenderungen}} |
| Beschreibung der Veränderungen | {{sonstigeVeraenderungen.veraenderungenBeschreibung}} |

## Versicherung & Unterschrift

| Feld | Wert |
| --- | --- |
| Richtigkeit der Angaben bestätigt | {{versicherung.richtigkeit}} |
| Datenschutzhinweis zur Kenntnis genommen | {{versicherung.datenschutz}} |
| Unterschrift | {{versicherung.unterschrift}} |

## Hochgeladene Dokumente

| Nr. | Feld | Dateiname | Dateigröße |
| --- | --- | --- | --- |
| 1 | "{{dateiReferenzen[1].field}}" | "{{dateiReferenzen[1].name}}" | "{{dateiReferenzen[1].size}} Byte" |

[weitere Dokumente analog]

## Bearbeitungshinweise

| Feld | Wert |
| --- | --- |
| Geänderte Bereiche | [automatisch befüllen – alle Felder mit Wert „Änderung mitgeteilt“] |
| Fehlende Pflichtdokumente | [automatisch prüfen] |
| Empfehlung | [Anspruchsprüfung einleiten / Nachforderung erforderlich] |