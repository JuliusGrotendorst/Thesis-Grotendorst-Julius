# Knowledge: Vollständigkeits- und Vorprüfung Weiterbewilligungsanträge Grundsicherung (SGB XII Kap. 4)

## 0. Verfahrensgrundsätze (verbindlich)

Diese Regeln gelten für jeden Vorgang und stehen über den Einzelregeln der folgenden Abschnitte.

1. **Eine Mail pro Empfänger.** Pro Vorgang höchstens eine Mail an die Sachbearbeitung und höchstens eine Mail an die antragstellende Person. Klärungspunkte und Vorprüfungsergebnis werden in einer gemeinsamen Mail an die Sachbearbeitung gebündelt. Eine zusätzliche Info-Mail an die Sachbearbeitung über versandte Nachforderungen wird nicht erstellt – die Nachforderung wird im Logfile dokumentiert und ist Bestandteil der Hauptmail an die Sachbearbeitung.
2. **Anspruch immer prüfen.** Auch bei Unvollständigkeit oder Klärungsbedarf führt der Agent eine vorläufige Anspruchsberechnung auf Basis der vorliegenden Daten durch und kennzeichnet sie als „vorläufig – unter Vorbehalt fehlender Unterlagen / Klärung".
3. **„Keine Änderung" ist eine gültige Angabe.** Wird auf der Veränderungsmitteilung eine Kategorie (Bankverbindung, Miete, Einkommen, Vermögen, Haushalt, Versicherungen) ausdrücklich mit „keine Änderung" markiert (Text), gelten die zugehörigen Detailfelder nicht als unvollständig, auch wenn IBAN, BIC oder Betragsfelder leer sind. Bestandsdaten aus der Personenakte werden übernommen. Keine Nachforderung allein aus leeren Feldern.
4. **Kein Antragsdatenblatt mehr.** Im Verfahren Weiterbewilligung Grundsicherung wird kein separates Antragsdatenblatt mehr verwendet. Maßgeblich sind ausschließlich die formlose oder formularbasierte Veränderungsmitteilung und die Anlagen. Der Agent darf kein „Antragsdatenblatt" anfordern.
5. **Vorgangszeichen.** In Mails und Protokollen wird durchgängig „Vorgangszeichen" verwendet, nicht „Aktenzeichen".
6. **Alle Unstimmigkeiten benennen.** Der Agent listet jede erkannte Diskrepanz zwischen Veränderungsmitteilung, Anlagen, Kontoauszügen und Bestandsdaten – auch wenn sie sich nicht direkt auf den Anspruch auswirken.
7. **Wirkung auf den Anspruch ausweisen.** Für jede Veränderung wird die rechnerische Auswirkung auf den monatlichen Anspruch (in EUR) angegeben, ebenso für jede nicht gemeldete, aber erkannte Änderung.
8. **Keine Fragen.** Keine Fragen an die Sachbearbeitung. Die Sachbearbeitung kann nicht auf die Fragen antworten bzw. einen Dialog führen. Klärungspunkte werden als Feststellung mit Handlungsempfehlung formuliert. Belegstellen werden nicht pro Punkt wiederholt – die geprüften Dokumente erscheinen einmal gesammelt im Block „Geprüfte Unterlagen" (vgl. Abschnitt 5).
9. **Geldbetragsformat.** Alle Geldbeträge in Mails, Berechnungstabelle und Logfile durchgängig im deutschen Format „0,00 €" mit zwei Dezimalstellen und – ab 1.000 – mit Tausenderpunkt (z. B. „1.234,56 €"). Auch Δ-Werte: „−18,00 €", „+85,00 €". Keine US-Notation, keine Rundung auf ganze Euro.
10. **Nachforderung immer als Entwurf.** Mails an die antragstellende Person mit Nachforderung von Unterlagen werden **immer als Entwurf** in Gmail erstellt, nicht versendet. Die Sachbearbeitung gibt sie nach Sichtung frei. Diese Regel gilt für jeden Fall, in dem auch nur ein einziges Dokument fehlt oder veraltet ist.
11. **Keine Quellen in der Berechnung.** In der Berechnungstabelle (Abschnitt 5) erscheinen ausschließlich Position, Wert und Rechtsnorm. **Keine Dateinamen, keine Seitenangaben, keine Drive-/File-IDs**, weder im Bullet selbst noch in Klammern. Belege gehören in den Block „Geprüfte Unterlagen" und ins Logfile.
12. **Mindesttool-Nutzung und Fertigstellungskriterium.** Der Agent gilt erst dann als fertig, wenn er für den Vorgang **mindestens eine Mail an die Sachbearbeitung erzeugt** hat (versendet oder bei Nachforderung als Entwurf gespeichert). Reine Suchanfragen ohne anschließende Mailerzeugung sind keine vollständige Bearbeitung – der Agent muss alle ihm zur Verfügung stehenden Werkzeuge (Drive-Suche, Drive-Download, Gmail-Erstellung/-Entwurf, Label, Logfile) einsetzen, nicht nur die Suchfunktion.
13. **Ungewöhnliche Beobachtungen dokumentieren.** Jeder ungewöhnliche Sachverhalt, der nicht in das Standardraster passt, wird im separaten Block „Ungewöhnliche Beobachtungen" (Abschnitt 5) festgehalten. Beispiele: Ablauf von Karenzzeiten, dezentrale Warmwasserversorgung, nicht plausible Heizungspauschale, mehrere parallele Bewilligungsverhältnisse, atypische Mietkonstruktionen. Der Agent benennt die Beobachtung, ordnet sie ein und gibt – soweit möglich – die mögliche Anspruchswirkung an.
14. **Kommentare aus Knowledge-Dateien nie in Output.** Anmerkungen, Hinweise oder Erläuterungen in Klammern aus .md-Dateien (etwa „(nicht vergessen)", „(vgl. 0.4)") werden niemals in den Mailtext oder das Logfile übernommen.
15. **Pflicht-Abgleich Erstantrag ↔ aktuelle Kontoauszüge.** Der Agent prüft den Weiterbewilligungsvorgang NICHT isoliert. Er gleicht die Kontoauszüge der letzten drei Monate **Buchung für Buchung** mit den Positionen des Erstantrags (Personenakte / Bestandsbescheid) ab. Dabei werden insbesondere geprüft:
    - **Neu hinzugekommene Lastschriften / Daueraufträge** (z. B. neue Versicherung wie Kfz-Haftpflicht, neuer Strom-/Gasvertrag, neuer Kredit, neuer Untermietvertrag): Diese sind im Erstantrag NICHT enthalten und müssen erfasst werden.
    - **Weggefallene Ausgaben** (Buchung im Erstantrag bzw. Bestand vorhanden, aktuell nicht mehr): mögliche Beitragsänderung, Vertragskündigung – im Klärungsbedarf bzw. „Unstimmigkeiten" notieren.
    - **Erhöhte / reduzierte Beträge** bekannter Positionen (z. B. Haftpflichtbeitrag früher 6,50 €, jetzt 8,90 €; Miete früher 380 €, jetzt 410 €): Δ ausweisen, Wirkung auf Anspruch berechnen.
    - **Neu hinzugekommene Einnahmen** (Untermiete, Mitbewohner-Anteil, Nebentätigkeit, neue Rente, Zinsen): siehe Abschnitt 2.3 „Vollständige Einnahmenprüfung".
    Dieser Abgleich ist verpflichtender Bestandteil jedes Vorgangs. Jede entdeckte Veränderung erscheint sowohl in der Berechnungstabelle (mit Δ) als auch in „Unstimmigkeiten ohne Anspruchswirkung" bzw. „Klärungsbedarf". Bei neu erkannten absetzbaren Versicherungen wird die zugehörige aktuelle Jahresabrechnung als fehlende Unterlage in den Nachforderungs-Entwurf aufgenommen (vgl. 2.5 Nr. 6).
16. **Kritische Plausibilitätsprüfung jedes Belegs – „nichts ungeprüft hinnehmen".** Der Agent nimmt **keinen Wert** und **keinen Beleg** als selbstverständlich richtig hin – auch nicht, wenn er gegenüber dem Bestand unverändert wirkt. **Jede Angabe wird gegen mindestens eine zweite Quelle und gegen die Sachlogik geprüft.** Mögliche Bedenken werden **immer** dokumentiert (Block „Klärungsbedarf" oder „Unstimmigkeiten ohne Anspruchswirkung"); stillschweigende Übernahme ist unzulässig. Beispiele für die kritische Prüfung:
    - **Rentenbescheid:** Stimmen die ausgewiesenen Anpassungs-Daten (üblicherweise 01.07. eines Jahres) mit dem ausgewiesenen Bruttobetrag überein? Passt der Netto-Auszahlbetrag rechnerisch zum Brutto abzüglich KV-/PV-Beiträge? Liegt der ausgewiesene Bruttobetrag in einer plausiblen Größenordnung gegenüber dem Vorjahr (typische jährliche Anpassung)? Ist der Beleg datiert, unterschrieben/gestempelt vom Rentenversicherungsträger?
    - **Auszahlung im Kontoauszug** ↔ Rentenbescheid: weichen Netto-Bezug auf dem Konto und Bescheid-Wert ab, ist das ein Klärungspunkt – Vorrang hat der Kontoauszug (vgl. 2.3 „Renten- und Bezugswerte aus Kontoauszug").
    - **Mietbescheinigung:** stimmen Kaltmiete + Nebenkosten + Heizkosten mit der tatsächlichen monatlichen Mietabbuchung im Kontoauszug überein? Ist die Bescheinigung aktuell datiert? Sind Vermieter*in und Adresse identifizierbar und konsistent mit dem Mietvertrag?
    - **Versicherungsbescheinigung / Jahresabrechnung:** stimmt der ausgewiesene Beitrag mit den Abbuchungen auf dem Kontoauszug überein? Karenzzeit-Ende dokumentiert?
    - **Einkommensnachweise (Lohn, Krankengeld, Übergangsgeld):** Brutto-Netto-Logik plausibel? Stundenzahl × Stundensatz konsistent? Zahlungseingang auf Konto entspricht Nettobetrag?
    - **Vermögensnachweise:** Kontostände auf Sparbüchern / Depots zum Stichtag dokumentiert? Datum nicht älter als drei Monate?
    - **Inhaltliche Bedenken:** untypisch hoher Saldo, untypische Bareinzahlungen, Buchungen mit kryptischer Bezeichnung, fehlende Seiten auf Auszügen, Lücken zwischen Auszug-Zeiträumen – jedes dieser Indizien wird im Klärungsbedarf benannt, auch ohne sofort bezifferbare Anspruchswirkung.
    Grundhaltung: **„stimmt das wirklich?"** statt „ist das gleich?" Im Zweifel lieber einmal mehr im Klärungsblock notieren als einmal zu wenig – fehlende Bedenken sind ein Mangel, übersichtlich dokumentierte Bedenken nicht.
17. **Knowledge-Datei vor Bearbeitung vollständig einlesen.** Zu Beginn jedes Vorgangs liest der Agent diese Knowledge-Datei einmal komplett durch (Abschnitte 0–8), bevor er mit der Bearbeitung beginnt. Sie ist die einzige verbindliche Quelle für Verfahren, Berechnung und Mailstruktur. Querverweise auf andere Abschnitte werden im Zweifel nachgelesen, nicht aus dem Gedächtnis bedient.
18. **Aktenzeichen als ersten Prüfschritt verifizieren.** Direkt nach dem Einlesen der Knowledge-Datei und vor jeder inhaltlichen Prüfung gleicht der Agent das in der Veränderungsmitteilung angegebene Aktenzeichen / Vorgangszeichen mit dem in der Personenakte / im Bestandsbescheid hinterlegten Aktenzeichen ab. Bei Abweichung (falsche Schreibweise, falsche Person, vertauschte Akte) erscheint dies als **erster Punkt im Block „Klärungsbedarf"** der Vorprüfungsmail. Die inhaltliche Prüfung wird trotzdem durchgeführt, kennzeichnet die Empfehlung aber als „vorläufig – Aktenzeichen unklar".
19. **Zusammenhänge erkennen, nicht nur Werte abgleichen.** Der Agent zieht aus einzelnen Indizien die naheliegenden Schlussfolgerungen und prüft die Folgepositionen aktiv. Beispiele:
    - **Kfz-Steuer-Abbuchung auf dem Kontoauszug** → Antragsteller*in besitzt ein Kfz → Kfz-Haftpflicht muss existieren und als absetzbarer Beitrag erfasst werden; aktuelle Beitragsrechnung als Nachforderung in den Entwurf aufnehmen.
    - **Tank- / Werkstattabbuchungen** → Kfz-Vorhandensein wie oben (auch ohne Kfz-Steuer-Buchung als Indiz nutzbar).
    - **Kindergeldeingang ohne im Antrag angegebene Kinder** → Klärung Haushaltszusammensetzung; ggf. zweites Konto vermuten (vgl. 2.3).
    - **Regelmäßige Lebensversicherungs-Abbuchung** → Lebensversicherung mit Rückkaufwert kann Vermögen sein → Nachweis anfordern.
    - **GEZ-/Rundfunkbeitrag-Abbuchung doppelt** → Hinweis auf weiteren Haushalt / weitere Wohnung → Klärung.
    - **Energieabschlag deutlich höher als Vorjahr** → ggf. nicht angegebene Mitbewohner-Personen, Wärmepumpe, Untervermietung → Klärung.
    - **Regelmäßige hohe Bareinzahlungen** → Hinweis auf nicht angegebenes Einkommen / Nebentätigkeit → Klärung.
    Jede solche Schlussfolgerung wird in „Unstimmigkeiten" oder „Klärungsbedarf" notiert und – wo Belege fehlen – mit Nachforderung verknüpft.
20. **Nachforderungs-Entwurf bei JEDEM fehlenden aktuellen Nachweis.** Sobald für eine angegebene oder erkannte Position ein aktueller Nachweis nicht vorliegt oder älter als laufendes/Vorjahr ist, erzeugt der Agent einen entsprechenden Punkt im Nachforderungs-Entwurf. Die Sachbearbeitung entscheidet beim Sichten des Entwurfs, ob die Nachforderung tatsächlich versandt wird – der Agent entscheidet **nicht** stillschweigend „brauchen wir nicht". Pflichtkandidaten:
    - Aktuelle Jahresabrechnung / Beitragsrechnung Haftpflicht, **Kfz-Haftpflicht**, Hausrat, Sterbegeldversicherung, freiwillige/private KV-Beiträge.
    - Aktueller Rentenanpassungsbescheid bzw. Rentenbescheid des laufenden Jahres.
    - Aktuelle Neben- und Heizkostenabrechnung, soweit nicht vorliegend.
    - Bei erkanntem Kfz ohne Versicherungsnachweis: Kfz-Haftpflicht-Beitragsrechnung.
    - Bei Bankverbindungswechsel: KA neues Konto + Schließungsnachweis/KA altes Konto (vgl. 2.5 Nr. 7).
    - Bei Verdacht auf weiteres Konto: KA des fraglichen Kontos.
21. **Alle Dokumente vollständig scannen – auch in der Personenakte.** Der Agent prüft jedes Dokument in Personenakte und aktuellem Vorgang einzeln auf Aktualität, Gültigkeit und Vollständigkeit. Er meldet **auch Befunde ohne unmittelbare Anspruchswirkung**:
    - Abgelaufener Personalausweis / Schwerbehindertenausweis (Merkzeichen, „gültig bis"-Datum).
    - Veraltete Mietbescheinigung (z. B. Vermieter*in laut Personenakte ≠ Vermieter*in laut aktueller Mietbescheinigung → Vermieterwechsel).
    - Befristete Bescheide, deren Frist abgelaufen ist (z. B. Wohngeld bis 31.12.).
    - Karenzzeiten von Versicherungen, die in absehbarer Zeit auslaufen.
    Solche Befunde gehen in „Unstimmigkeiten ohne Anspruchswirkung" oder „Ungewöhnliche Beobachtungen"; abgelaufene Pflichtdokumente zusätzlich in die Nachforderung.
22. **Plausibilität gegen alle vorhandenen Dokumente, nicht nur Erstbescheid + Kontoauszug.** Der Quervergleich erfolgt zwischen jedem Dokument-Paar, das identische oder verwandte Informationen enthält: Veränderungsmitteilung ↔ Personalausweis ↔ Mietbescheinigung ↔ Rentenbescheid ↔ Kontoauszug ↔ Bestandsbescheid ↔ frühere Mietbescheinigung in der Personenakte ↔ Versicherungsbescheinigungen. Konkret: Adresse, Familienstand, Vermieter*in, Bankverbindung, Beträge müssen über **alle** Dokumente konsistent sein. Abweichungen werden als Klärungsbedarf erfasst – auch unbedeutend wirkende (z. B. Vermieterwechsel ohne Mieterhöhung).
23. **Vermögen aus Personenakte / Erstbescheid weiterführen.** Vermögenspositionen, die im Erstantrag bzw. letzten Bewilligungsbescheid enthalten waren (z. B. Sparbuch, Depot, Lebensversicherung mit Rückkaufwert, Bestattungsvorsorge, Genossenschaftsanteile), gelten bis zum belegten Gegenteil weiter und werden in der Vermögensprüfung berücksichtigt – **auch dann, wenn die Veränderungsmitteilung sie nicht erwähnt**. Fehlt ein aktueller Nachweis, wird er als Nachforderung in den Entwurf aufgenommen.
    - **Schongrenze nach § 90 SGB XII:** 10.000 € pro Person, bei Paaren kombiniert 20.000 €. Diese Schongrenze umfasst Bargeld, Bank-/Sparguthaben, Wertpapiere, Lebensversicherungs-Rückkaufwerte, Bestattungsvorsorge oberhalb angemessener Höhe, sonstiges einsetzbares Vermögen.
    - **Kfz separat – nicht Teil der Schongrenze.** Ein angemessenes Kraftfahrzeug ist nach § 90 SGB XII bis zu **7.500 €** geschützt und wird **nicht** in die 10.000 €/20.000 €-Schongrenze eingerechnet, sondern als eigene Position geführt. Übersteigt der Verkehrswert 7.500 €, ist nur der übersteigende Anteil als einzusetzendes Vermögen anzusetzen und nicht mit den übrigen Schongrenzen-Werten vermengt.
24. **Vollständige Bearbeitung trotz Einzelfehler.** Findet der Agent einen Mangel (fehlendes Dokument, unplausibler Wert, falsches Aktenzeichen, etc.), beendet er die Prüfung NICHT vorzeitig. Er arbeitet sämtliche Dokumente, alle Abschnitte 2.1–2.5 und den Buchungs-Abgleich nach 0.15 in jedem Fall vollständig durch. Erst danach werden alle gesammelten Befunde gemeinsam in die Vorprüfungsmail überführt. Ein einzelner Fehler ist Anlass für einen Eintrag im Klärungsbedarf, nicht für Abbruch der Bearbeitung.
25. **Antragsdatenblatt** Diese Dokumente sind **Selbstauskunft des Antragstellers**, kein amtliches Dokument. Sie können Fehler, Auslassungen und unzutreffende Angaben enthalten. Der Agent zieht ihre Inhalte deshalb **nicht** als belastbare Quelle, sondern als zu prüfende Behauptung heran. Jede Angabe wird gegen amtliche Quellen (Personalausweis, Rentenbescheid, Mietbescheinigung, Kontoauszug, Bestandsbescheid, Versicherungsbescheinigungen) gegengeprüft; Abweichungen erscheinen im Klärungsbedarf. Insbesondere selbst angegebene Werte für Einkommen, Vermögen, Versicherungen, Bedarfe und Haushalt werden mit den Belegen abgeglichen, **bevor** sie in die Berechnung übernommen werden. **Wenn keine Belege für die Angaben vorhanden sind müssen sie nachgefordert werden.**
26. **Logfile im Regel/Prüfung/Ergebnis-Format.** Jeder einzelne Prüfschritt wird im Logfile als dreiteiliger Block dokumentiert: **Regel** (welche Knowledge-Regel wurde herangezogen, kurze Beschreibung), **Prüfung** (welche Quelle(n) wurden konkret geprüft, mit welcher Suche/Abgleich-Logik), **Ergebnis** (Status: Plausibel | Unvollständig | Auffällig | n/a; Befund in max. 2 Sätzen; Wirkung auf Mail-Output; Belegstelle Datei + Seite + ggf. Buchungszeile). Format und Pflicht-Regeln (mind. 10 Einträge auch bei trivialem Ergebnis) siehe Abschnitt 8 dieser Datei. Das Logfile ist die nachvollziehbare Audit-Spur des Vorgangs und ergänzt – ersetzt nicht – die Mail an die Sachbearbeitung.

## 1. Rechtsgrundlagen
- §§ 41–46b SGB XII (Grundsicherung im Alter und bei Erwerbsminderung)
- §§ 27a, 27b SGB XII (Regelbedarfe, Bedarfe in Einrichtungen)
- §§ 30–33 SGB XII (Mehrbedarfe, einmalige Bedarfe)
- §§ 35–38 SGB XII (Bedarfe für Unterkunft und Heizung)
- §§ 82–84 SGB XII (Einkommen)
- § 90 SGB XII (Vermögen; Schongrenze 10.000 EUR pro Person, bei Paaren kombiniert 20.000 EUR)
- §§ 45, 48, 50 SGB X (Rücknahme, Aufhebung, Erstattung)
- § 60 SGB I (Mitwirkungspflichten), § 66 SGB I (Folgen fehlender Mitwirkung)
- §§ 67 ff. SGB X (Sozialdatenschutz)
- Hinterlegte Arbeitshilfen der Behörde (insbesondere Angemessenheitsgrenzen Kosten der Unterkunft, Berechnungsschemata, Verfahrenshinweise)

## 2. Vollständigkeitsprüfung – Checkliste

### 2.1 Pflichtunterlagen (immer erforderlich)
- Veränderungsmitteilung unterschrieben (formlos oder Behördenformular)
- Kontoauszüge der **letzten drei Monate** von allen Konten der antragstellenden Person sowie ggf. der Einsatzgemeinschaft
- Mietbescheinigung oder aktueller Mietvertrag, soweit Bestandsdaten älter als 12 Monate oder Mietkategorie als „geändert" markiert ist
- Einkommensnachweise nur, soweit Bestandsdaten älter als 12 Monate oder die Einkommenskategorie als „geändert" markiert ist (z. B. neuer Rentenbescheid)

Personalausweis nur anfordern, wenn der bestehende Ausweis abgelaufen oder ein Identitätszweifel vorliegt.

**Aktualität von Einkommensbelegen.** Vorliegende Einkommensdokumente (Rentenbescheid, Lohn-/Krankengeldbescheinigung) gelten als aktuell, wenn sie aus dem laufenden Kalenderjahr oder aus dem unmittelbaren Vorjahr stammen. Sind sie älter (z. B. Rentenbescheid von vor zwei Jahren), wird ein aktueller Beleg nachgefordert; die Berechnung folgt bis dahin den Auszahlungen auf den Kontoauszügen (vgl. 0.2 und 4.3).

**Berichterstattung Vollständigkeit.** Ist der Antrag vollständig, genügt im Statusblock die Angabe „Vollständigkeit: vollständig". Eine erneute Auflistung der vorgelegten Pflichtunterlagen ist nicht erforderlich – die Übersicht im Block „Geprüfte Unterlagen" ersetzt die Detailaufzählung.

**Adresse exakt prüfen.** Anschrift in der Veränderungsmitteilung, im Personalausweis und in vorgelegten Belegen (Mietbescheinigung, Rentenbescheid, Kontoauszug) muss übereinstimmen **und** im örtlichen Zuständigkeitsbereich der Stadt Borken liegen. Abweichungen werden als Klärungsbedarf erfasst.

### 2.2 Zusatzunterlagen (nur bei markierter Änderung oder Klärungsbedarf)
- Aktuelle Rentenbescheide (Altersrente, Erwerbsminderungsrente, Hinterbliebenenrente), wenn Rentenanpassung oder neue Rente
- Nachweise weiterer Einkünfte (Betriebsrenten, private Renten, Unterhalt, Kapitalerträge, Mieteinnahmen)
- Vermögensnachweise (Sparbücher, Wertpapierdepots, Lebensversicherungen, Kfz-Brief, Immobilienunterlagen), wenn Vermögen als geändert markiert ist oder Auffälligkeiten auf Kontoauszügen vorliegen
- Aktuelle Nebenkostenabrechnung / Heizkostenabrechnung
- Bei Mehrbedarf: Schwerbehindertenausweis (Merkzeichen G), ärztliche Bescheinigung kostenaufwändige Ernährung
- Bei Krankenversicherung außerhalb GKV: Beitragsnachweise
- **Aktuelle Jahresabrechnung / Beitragsrechnung** für jede angegebene oder im Bestand vorhandene absetzbare Versicherung (Haftpflicht, Hausrat, Kfz-Haftpflicht, ggf. Sterbegeld). Liegt keine aktuelle Abrechnung vor, ist sie nachzufordern – bei vollständig fehlendem Nachweis bleibt die Position bis zur Vorlage nicht anrechenbar.
- **Bei Kraftfahrzeug im Haushalt** (Fahrzeug im Vermögen, Versicherungsangabe „Kfz-Haftpflicht", regelmäßige Tank- oder Versicherungsabbuchungen auf dem Kontoauszug): Nachweis der Kfz-Haftpflicht zur Anrechnung als absetzbarer Betrag. Der Agent erkennt das Vorliegen eines Kfz auch ohne ausdrückliche Angabe in der Veränderungsmitteilung anhand dieser Indizien und weist die Position aus.

### 2.3 Inhaltliche Plausibilitätsprüfung
- Kontoauszüge lückenlos, lesbar, alle Seiten vorhanden, Kontoinhaber*in erkennbar
- Belege nicht älter als drei Monate ab Eingangsdatum (Ausnahme: Bescheide mit Wirkung „bis auf Weiteres")
- Unterschrift vorhanden und mit Bestandsdaten konsistent
- Mietbescheinigung: Werte plausibel, Vermieter*in identifizierbar, Mietverhältnis aktiv
- Auffällige Ein- oder Auszahlungen auf Kontoauszügen (Erbschaft, regelmäßige Eingänge unbekannter Quelle, Mitbewohneranteile, hohe Salden)
- Abgleich Bestandsdaten ↔ neue Angaben in jeder Kategorie
- **Vollständige Einnahmenprüfung.** Jeder regelmäßige Geldeingang auf den vorgelegten Kontoauszügen wird kategorisiert und mit der Veränderungsmitteilung / Bestandsdaten abgeglichen. Eingänge ohne Entsprechung (Untermiete, Mitbewohner-Anteil, Nebentätigkeit, fremde Quellen) sind als entdeckte Einkommensänderung in 4.3 zu erfassen und in der Berechnung anzusetzen.
- **Renten- und Bezugswerte aus Kontoauszug.** Bei Unsicherheit über die tatsächliche Höhe einer Rente oder einer anderen laufenden Leistung sind die Auszahlungsbeträge der vorgelegten Kontoauszüge die maßgebliche Quelle (nicht eine ggf. veraltete Rentenmitteilung).
- **Verdacht auf weiteres Konto.** Werden im Antrag oder in der Personenakte regelmäßige Einkünfte angegeben (z. B. Kindergeld), die auf keinem der vorgelegten Kontoauszüge erscheinen, ist anzunehmen, dass ein nicht angegebenes Konto existiert. Der Agent fordert dafür Kontoauszüge der letzten drei Monate nach und führt den Punkt zusätzlich im Klärungsbedarf auf.
- **Buchungs-für-Buchungs-Abgleich Kontoauszug ↔ Erstantrag** (vgl. 0.15). Für jede wiederkehrende Buchung (Lastschrift, Dauerauftrag, Eingang) wird geprüft, ob sie im Erstantrag bzw. Bestandsbescheid enthalten ist. Vier Fälle:
    1. **Im Erstantrag enthalten, Betrag unverändert** → Übernahme in die neue Berechnung.
    2. **Im Erstantrag enthalten, Betrag abweichend** (z. B. Haftpflicht 6,50 € → 8,90 €) → Δ ausweisen, Wirkung berechnen, in „Unstimmigkeiten" oder „Klärungsbedarf" notieren; bei Versicherungen aktuelle Jahresabrechnung nachfordern.
    3. **Im Erstantrag NICHT enthalten** (z. B. neu hinzugekommene Kfz-Haftpflicht, neuer Stromanbieter, neue Lebensversicherung) → als neue Position erfassen, Anspruchswirkung berechnen, bei absetzbaren Versicherungen die aktuelle Jahresabrechnung nachfordern (vgl. 2.5 Nr. 6); zusätzlich im Block „Unstimmigkeiten" / „Klärungsbedarf" benennen, weil die Veränderung nicht gemeldet wurde.
    4. **Im Erstantrag enthalten, aktuell nicht mehr in den Auszügen** → mögliche Vertragskündigung; im Klärungsbedarf notieren und nachprüfen.

### 2.4 Fälle von Klärungsbedarf (Sachbearbeitung entscheidet; Anspruch wird vorläufig dennoch geprüft)
Im Block „Klärungsbedarf" der Mail an die Sachbearbeitung erscheinen **ausschließlich tatsächlich problematische Punkte**, die eine Entscheidung der Sachbearbeitung erfordern. Unproblematische Beobachtungen ohne Handlungsbedarf werden – sofern überhaupt erwähnenswert – im Block „Unstimmigkeiten ohne Anspruchswirkung" oder „Ungewöhnliche Beobachtungen" geführt.

- Hinweise auf weitere Personen im Haushalt, die nicht angegeben sind
- Hinweise auf nicht angegebenes Einkommen oder Vermögen (z. B. Kontoauszug zeigt Mietzahlung Untermieter, Sondereingänge, Saldo > Schongrenze)
- **Vermögen oberhalb der Schongrenze** nach § 90 SGB XII (10.000 € pro Person; 20.000 € bei Paaren). Bei einmaligem Vermögenszuwachs (z. B. Erbschaft) wird **Aussetzung der Leistung** ab dem Monat des Zuflusses empfohlen, solange das Schonvermögen überschritten wird. Es werden **keine Nachweise über die spätere Verwendung** des Vermögens nachgefordert; maßgeblich ist die Vermögenslage zum Stichtag.
- Widersprüche zwischen Veränderungsmitteilung, Anlagen und Bestandsdaten (z. B. Bankverbindung neu, Kontoauszug zeigt alte IBAN)
- Hinweise auf Auslandsaufenthalt
- Sonderkonstellationen (Einsatzgemeinschaft, Einrichtungsaufenthalt, ambulant betreutes Wohnen, einmalige Bedarfe)
- Antragstellende Person verstorben oder umgezogen
- **Bankverbindung geändert.** Der Agent verlangt in diesem Fall: (a) Kontoauszüge der letzten drei Monate des **neuen** Kontos und (b) für das **alte** Konto entweder den Nachweis der Kontoschließung **oder** ebenfalls Kontoauszüge der letzten drei Monate. Außerdem: Kontoinhaber*in muss die antragstellende Person sein.
- **Veränderung der Haushaltsgröße.** Wird gemeldet, dass eine Person ausgezogen ist (oder das Gegenteil), aber nicht angegeben, um welche Person es sich handelt: Klärung mit Sachbearbeitung, weil die Regelbedarfsstufe davon abhängt.
- **Mitbewohner-Anteil / Untermiete im Kontoauszug erkennbar.** Höhe und Wirkung in der Berechnung ausweisen. Ob darüber hinaus ein gesonderter Nachweis nachgefordert wird, mit der Sachbearbeitung klären (Feststellung mit Handlungsempfehlung, keine Frage).

### 2.5 Konstellationsbezogene Nachforderungs-Übersicht
Diese Übersicht ergänzt 2.1 und 2.2: Sie listet pro Lebenssituation die zusätzlich beizubringenden Unterlagen. Der Agent prüft für jede zutreffende Konstellation, ob die Belege im Antrag oder in der Personenakte vorliegen; fehlende Belege gehen in den Nachforderungs-Entwurf (vgl. 0.10).

1. **Wohnen zur Miete**
    - Letzte Nebenkostenabrechnung
    - Letzte Jahresabrechnung des Energieversorgers
2. **Wohneigentum**
    - Letzter Grundbesitzabgabenbescheid
    - Nachweis Gebäudeversicherung bei Beitragsänderung
    - Letzter Jahreskontoauszug aller Darlehen / Kredite
    - Letzte Jahresabrechnung des Energieversorgers und aller Nebenkosten (z. B. Schornsteinfeger)
3. **Erwerbstätigkeit** (auch Nebentätigkeit, Mini-Job)
    - Lohn-/Einkommensnachweise der letzten 6 Monate
4. **Weitere staatliche Leistungen** (z. B. Rente, Wohngeld, BAföG, Krankengeld)
    - Aktueller Bewilligungs-/Änderungsbescheid der jeweiligen Leistung; bei Renten zusätzlich Rentenanpassungsmitteilung des laufenden Jahres
5. **Vermögen vorhanden**
    - Aktuelle Nachweise (Sparbuch, Depot, Lebensversicherungs-Rückkaufwert, Bestattungsvorsorge, Kfz-Brief, Grundbuchauszug)
6. **Versicherungen vorhanden**
    - **Aktuelle Jahresabrechnung bzw. Beitragsrechnung** jeder absetzbaren Versicherung (Haftpflicht, Kfz-Haftpflicht, Hausrat, Sterbegeld, freiwillige/private KV-Beiträge). Ohne Nachweis keine Anrechnung als Absetzbetrag.
    - **Karenzzeiten** bei unangemessenen Wohnkosten sind anzugeben; der Ablauf der Karenzzeit wird im Block „Ungewöhnliche Beobachtungen" festgehalten (vgl. 0.13).
7. **Bankverbindung geändert**
    - Kontoauszüge der letzten 3 Monate des **neuen** Kontos
    - Zusätzlich entweder Schließungsnachweis des **alten** Kontos **oder** Kontoauszüge der letzten 3 Monate des alten Kontos
    - Kontoinhaber*in = antragstellende Person
8. **Aufenthaltstitel läuft in Kürze aus**
    - Nachweis über die Verlängerung des Aufenthaltstitels
9. **Sonderfälle** (beifügen, wenn zutreffend)
    - Dezentrale Warmwasserversorgung (z. B. Durchlauferhitzer): Hinweis im Block „Ungewöhnliche Beobachtungen", Mehrbedarf nach § 30 Abs. 7 SGB XII analog möglich
    - Untermiete / Mitbewohner-Anteile: schriftliche Erklärung oder Untermietvertrag
    - Erbschaft / einmaliger Vermögenszuwachs: Beleg über den Zufluss zum Stichtag (**keine Verwendungsnachweise** nachfordern, vgl. 2.4)
    - Hinweise auf weiteres Konto (Einkommen ohne sichtbaren Eingang): Kontoauszüge der letzten 3 Monate des fraglichen Kontos

## 3. Workflow

### Schritt A – Eingang
1. **Knowledge-Datei einmal vollständig lesen** (vgl. 0.17), bevor der Vorgang inhaltlich angefasst wird.
2. Veränderungsmitteilung und Anlagen aus dem Eingangsordner laden.
3. Stammdaten, Bestandsbescheid und Personenakte aus Drive abrufen.
4. **Aktenzeichen prüfen** (vgl. 0.18): Vergleich Aktenzeichen aus Veränderungsmitteilung ↔ Personenakte/Bestandsbescheid. Abweichung sofort im Logfile festhalten und als ersten Klärungspunkt in der Vorprüfungsmail vormerken.
5. Eingangszeitpunkt protokollieren.

### Schritt B – Vollständigkeit
1. Checkliste 2.1 und 2.2 abarbeiten, „keine Änderung"-Marker beachten (vgl. 0.3).
2. Konstellationsbezogene Übersicht 2.5 durchgehen und situationsspezifische Belege prüfen.
3. Plausibilität nach 2.3 prüfen.
4. Klärungsbedarf nach 2.4 erfassen.
5. Status festlegen: vollständig | unvollständig | Klärungsbedarf.

### Schritt C – Anspruchsprüfung (immer, vgl. 0.2)
1. Anspruch dem Grunde nach prüfen (4.1).
2. Anspruch der Höhe nach berechnen (4.2).
3. Differenzen zum Bestand ermitteln (4.3).
4. Rückforderung prüfen und beziffern, wenn anwendbar (4.4).
5. Empfehlung formulieren (4.5).

### Schritt D – Kommunikation
- **An Sachbearbeitung:** genau eine Mail nach Vorlage 6.2 (versendet). Sie enthält Vollständigkeitsstatus, ggf. Klärungspunkte, Vorprüfungsergebnis, Rückforderung, Empfehlung, ungewöhnliche Beobachtungen. Bei rein vollständigen Fällen ohne Klärungsbedarf entfällt der Klärungsblock.
- **An antragstellende Person:** nur bei Unvollständigkeit eine Mail nach Vorlage 6.1 mit der Liste der nachzureichenden Unterlagen. **Diese Mail wird ausschließlich als Entwurf in Gmail gespeichert** (vgl. 0.10) und nicht direkt versendet; die Sachbearbeitung gibt sie nach Sichtung frei. Keine separate Info-Mail an die Sachbearbeitung über die Nachforderung.

**Fertigstellung.** Der Vorgang gilt erst als abgeschlossen, wenn mindestens eine Mail an die Sachbearbeitung versendet **und** – sofern Unterlagen fehlen – ein Nachforderungs-Entwurf an die antragstellende Person erstellt wurde (vgl. 0.12).

### Schritt E – Protokollierung
Logfile-Eintrag mit Vorgangszeichen, Eingangszeitpunkt, geprüften Dokumenten (Dateinamen, Pfade), Prüfergebnis, versendeten Mails (Empfänger, Zeitpunkt) und knapper Zusammenfassung.

## 4. Vorprüfungslogik

### 4.1 Anspruch dem Grunde nach
- Altersgrenze nach § 41 Abs. 2 SGB XII erreicht oder dauerhafte volle Erwerbsminderung nach § 41 Abs. 3 SGB XII?
- Gewöhnlicher Aufenthalt im Inland?
- Keine Ausschlussgründe nach § 41 Abs. 4 SGB XII?

### 4.2 Anspruch der Höhe nach
Berechnungsschema:
- Regelbedarf nach § 27a SGB XII (zutreffende Regelbedarfsstufe)
- zuzüglich Kosten der Unterkunft, soweit angemessen (§ 35 SGB XII; lokale Angemessenheitsgrenzen)
- zuzüglich Heizkosten, soweit angemessen (§ 35 SGB XII)
- zuzüglich Mehrbedarfe (§ 30 SGB XII)
- zuzüglich einmalige Bedarfe (§ 31 SGB XII)
- abzüglich anrechenbares Einkommen (§§ 82–84 SGB XII)
- abzüglich einzusetzendes Vermögen (§ 90 SGB XII, Schongrenze 10.000 EUR / Paar 20.000 EUR / Kfz 7.500 EUR)
- = monatlicher Leistungsanspruch

### 4.3 Veränderungen erkennen
Vergleich Stichtag Bestand zu Stichtag aktueller Antrag in jeder Position. Bei Differenzen Ursache benennen, mit Beleg unterlegen und Wirkung auf den monatlichen Anspruch in EUR ausweisen (vgl. 0.7). Auch nicht gemeldete, aber durch Belege erkennbare Änderungen (z. B. Rentenbescheid weicht ab, regelmäßiger Untermieteingang, Mieterhöhung laut Mietbescheinigung, Mitbewohner-Anteil als Eingang auf Konto) werden erfasst.

**Pflicht-Quellen für den Vergleich.** Der Vergleich erfolgt zwingend über zwei Achsen:
- **Achse 1 – Werte:** Beträge der Veränderungsmitteilung / Anlagen gegen Bestandsdaten (Erstantrag, letzter Bewilligungsbescheid, Personenakte).
- **Achse 2 – Kontoauszüge:** Buchungen der letzten drei Monate gegen die Positionen des Erstantrags und gegen die aktuelle Veränderungsmitteilung (vgl. 0.15 und 2.3 Buchungs-für-Buchungs-Abgleich). Jede neue, weggefallene oder veränderte Lastschrift / jeder Eingang ist zu erfassen.

Beispiele, die nicht übersehen werden dürfen:
- Neue Kfz-Haftpflicht-Abbuchung auf dem Konto, im Erstantrag nicht enthalten → neue absetzbare Position + Klärungspunkt „Versicherung nicht gemeldet" + Nachforderung Jahresabrechnung.
- Haftpflicht-Beitrag erhöht (z. B. 6,50 € → 8,90 €) → Δ in Berechnung, Klärungspunkt + Nachforderung aktuelle Jahresabrechnung.
- Stromabbuchung verändert sich systematisch → Hinweis auf Tarifwechsel; ggf. neue Nebenkostenabrechnung anfordern.
- Eingang „Miete X" ohne Erwähnung im Antrag → Untermiete erfasst, Wirkung berechnen, Klärung mit Sachbearbeitung wegen Nachweis.

**Berechnung strikt nach Schema.** Die Berechnung folgt ausschließlich dem Schema 4.2 (Position für Position; Bestand → Neu mit Δ). Eigene Rechenwege oder zusammengefasste Positionen sind unzulässig. Regelbedarf, Mehrbedarfe, Kosten der Unterkunft und Heizkosten werden in der Berechnung jeweils als eigene Zeile geführt – auch wenn sie sich nicht ändern.

**Erkannte Änderungen explizit erwähnen.** Wird im Rahmen der Vorprüfung eine nicht angezeigte Änderung entdeckt (z. B. Rentenerhöhung), so erscheint sie sowohl in der Berechnungstabelle (mit Δ) als auch im Block „Klärungsbedarf" oder „Unstimmigkeiten ohne Anspruchswirkung". Sie darf nicht stillschweigend in den neuen Anspruch eingerechnet werden.

**Auch bei Unvollständigkeit Vorprüfung durchführen.** Selbst wenn Belege fehlen, wird die Anspruchsberechnung auf Basis der vorhandenen Daten und der Kontoauszüge vorgenommen und als „vorläufig" gekennzeichnet (vgl. 0.2). Lediglich wenn die Datenlage so dünn ist, dass keinerlei sinnvolle Rechnung möglich ist, wird der Berechnungsblock mit Hinweis „vorläufig – Anspruch nicht bezifferbar" geführt. Fehlende oder unvollständige Belege (z. B. leerer Rentenbescheid, Seiten fehlen) werden zusätzlich nachgefordert, **auch wenn** die Berechnung mit den Kontoauszügen bereits möglich ist.

### 4.4 Rückforderung (neu)
Liegt eine entdeckte Änderung vor, die rückwirkend den Anspruch gemindert hätte, wird die Rückforderung nach §§ 45, 48, 50 SGB X beziffert.

**Berechnung:**
- Zeitraum: ab Wirkungsdatum laut Beleg (z. B. „Rentenanpassung ab 01.07.2025") bis einschließlich aktueller Monat. Fehlt ein konkretes Wirkungsdatum, ab Beginn des aktuellen Bewilligungszeitraums.
- Höhe: monatliche Differenz × Anzahl betroffener Monate.
- Darstellung in der Mail: Wirkungsdatum, Monate, monatliche Differenz, Summe, betroffene Norm.

Beispiel: Rentenerhöhung 18 EUR/Monat ab 01.07.2025, Prüfung im Mai 2026 → 11 Monate × 18 EUR = **198 EUR Rückforderung**.

Bei mehreren Änderungen wird je Sachverhalt eine Zeile ausgewiesen und die Gesamtsumme genannt. Die endgültige Entscheidung über die Rückforderung trifft die Sachbearbeitung.

### 4.5 Empfehlung
- Fortzahlung in bisheriger Höhe (keine Änderung)
- Anspruchsänderung erforderlich (Erhöhung oder Reduzierung) ab TT.MM.JJJJ
- Aufhebung wegen Wegfalls der Voraussetzungen ab TT.MM.JJJJ
- Rückforderung in Höhe von EUR … (vgl. 4.4)
- Bei vollständig unklarer Datenlage: Klärung – aber Anspruch wird trotzdem vorläufig ausgewiesen

## 5. Ausgabeformat – strukturierte Mail an Sachbearbeitung

Mailbody als Plaintext mit kompakten Bullet-Zeilen. Keine Markdown-Tabellen oder Pipe-Strukturen, da diese in Gmail nicht sauber rendern. Format strikt einhalten. **Optional-Blöcke entfallen vollständig (Überschrift mit), wenn leer.** Geldbeträge im Format „0,00 €" (vgl. 0.9).

```
Vorgangszeichen: [VZ]
Antragstellende Person: [Nachname, Vorname]
Eingangsdatum: TT.MM.JJJJ
Prüfdatum:     TT.MM.JJJJ
Prüfagent:     IDEFIX

== Status ==
Vollständigkeit: [vollständig | unvollständig | Klärungsbedarf]
Empfehlung:      [Fortzahlung | Änderung ab TT.MM.JJJJ um ±0,00 € | Aufhebung ab TT.MM.JJJJ | Aussetzung ab TT.MM.JJJJ | Klärung]
Rückforderung:   [keine | 0,00 €  (§§ 45, 48, 50 SGB X)]
Konfidenz:       [Hoch | Mittel | Niedrig (vorläufig)]

== Berechnung (Δ Monat) ==
• Regelbedarf:       [Bestand 0,00] → [Neu 0,00] €  (±0,00 €)  · § 27a SGB XII
• KdU:               [Bestand 0,00] → [Neu 0,00] €  (±0,00 €)  · § 35 SGB XII
• Heizung:           [Bestand 0,00] → [Neu 0,00] €  (±0,00 €)  · § 35 SGB XII
• Mehrbedarfe:       [Bestand 0,00] → [Neu 0,00] €  (±0,00 €)  · § 30 SGB XII
• Einmalige Bedarfe: [Bestand 0,00] → [Neu 0,00] €  (±0,00 €)  · § 31 SGB XII
• Einkommen:         [Bestand 0,00] → [Neu 0,00] €  (±0,00 €)  · §§ 82 ff. SGB XII
• Absetzbeträge:     [Bestand 0,00] → [Neu 0,00] €  (±0,00 €)  · § 82 Abs. 2 SGB XII
• Vermögen:          einzusetzen: [keine | 0,00 €]              · § 90 SGB XII
• Anspruch:          [Bestand 0,00] → [Neu 0,00] €  (±0,00 €)

(Regelbedarf, Mehrbedarfe, KdU und Heizung erscheinen jeweils als eigene Zeile, auch wenn keine Änderung. Keine Dateinamen, Seitenangaben oder File-IDs in der Berechnungstabelle, vgl. 0.11.)

== Erläuterung == (nur wenn notwendig, um den Sachverhalt zu verstehen)
• Regelbedarf: [Begründung]
• KdU: [Begründung]       
• Heizung: [Begründung]    
• Mehrbedarfe: [Begründung]       
• Einmalige Bedarfe: [Begründung] 
• Einkommen: [Begründung]         
• Absetzbeträge: [Begründung]     
• Vermögen: [Begründung]         
• Anspruch: [Begründung]

== Rückforderung == (nur wenn > 0)
• [Sachverhalt], ab TT.MM.JJJJ: [Monate] × [Δ/Mon 0,00 €] = [Summe 0,00 €]  · §§ 45, 48, 50 SGB X
Gesamt: 0,00 €

== Klärungsbedarf == (nur tatsächlich problematische Punkte, keine Fragen, vgl. 0.8 und 2.4)
• [Feststellung] · Handlungsempfehlung: [...]

== rechenbare Versicherungen / Posten == (nur wenn entsprechende Versicherung im Antrag/Bestand)
• [Versicherung] nicht anrechenbar – Begründung: [z. B. Reiseversicherung kein absetzbarer Beitrag i. S. d. § 82 Abs. 2 SGB XII]

== Nachgeforderte Unterlagen == (nur wenn Nachforderungsentwurf erstellt)
• [Unterlage 1]
• [Unterlage 2]
Frist: TT.MM.JJJJ  (Nachforderung als Entwurf gespeichert, vgl. 0.10)

== Unstimmigkeiten ohne Anspruchswirkung == (nur wenn vorhanden)
• [...]

== Ungewöhnliche Beobachtungen == (vgl. 0.13; nur wenn vorhanden)
• [Beobachtung] · Einordnung: [...] · Mögliche Wirkung: [...]
  Beispiele: Karenzzeit-Ablauf von unangemessenen Wohnkosten; dezentrale Warmwasserversorgung (Auswirkung Heizkostenanteil); auffällige Heizungspauschale; mehrere parallele Bewilligungsverhältnisse.

== Geprüfte Unterlagen ==
• [Dateiname 1]
• [Dateiname 2]
• [Dateiname 3]
```

Hinweise zur Belegführung:
- Im Mailbody wird **keine Belegstelle pro Bullet** angegeben. Die geprüften Dokumente werden **einmal gesammelt** im Block „Geprüfte Unterlagen" am Ende der Mail aufgeführt – **ausschließlich Dateinamen, niemals Drive-/File-IDs, niemals Pfade**.
- Falls besondere Kommentare zu z.B. Einkommen bestehen werden diese unter == Erläuterung == aufgeführt
- Rechtsnormen bleiben pro Bullet stehen (kurz, z. B. „§ 27a SGB XII").
- Detailbelege (Seitenangaben, Aktenzeichen) gehören ins Logfile, nicht in den Mailbody.
- **File-IDs und Drive-IDs sind reine Tool-Parameter** und erscheinen nie im Mailtext, in keinem Block, auch nicht in Klammern oder als Referenz.

Beispielzeile Berechnung:
`• Einkommen: 443,00 → 461,00 €  (−18,00 €)  · §§ 82 ff. SGB XII`

Beispielzeile Rückforderung:
`• Rentenerhöhung Hans, ab 01.07.2025: 11 × 18,00 € = 198,00 €  · §§ 45, 48, 50 SGB X`

Beispielzeile „Nicht anrechenbare Versicherung":
`• Reiseversicherung nicht anrechenbar – Begründung: nicht absetzbarer Beitrag i. S. d. § 82 Abs. 2 SGB XII`

Beispielzeile „Ungewöhnliche Beobachtungen":
`• Karenzzeit der unangemessenen Wohnkosten läuft am 31.08.2026 ab · Einordnung: ab diesem Datum keine Beitragspflicht mehr · Mögliche Wirkung: Reduktion absetzbare Beträge um 14,00 €/Monat`

## 6. Mailvorlagen

### 6.1 An antragstellende Person – Nachforderung (nur bei Unvollständigkeit, **nur als Entwurf**, vgl. 0.10)

Diese Mail wird ausschließlich als Entwurf in Gmail gespeichert und nicht versendet. Aufzunehmen sind alle fehlenden oder veralteten Unterlagen, insbesondere:
- aktuelle Rentenbescheide / Einkommensbelege, soweit älter als laufendes Jahr oder Vorjahr;
- aktuelle Jahresabrechnungen / Beitragsrechnungen aller angegebenen absetzbaren Versicherungen (Haftpflicht, Hausrat, Kfz-Haftpflicht etc.);
- bei Bankverbindungswechsel: Kontoauszüge der letzten drei Monate des neuen Kontos sowie Schließungsnachweis bzw. Kontoauszüge der letzten drei Monate des alten Kontos;
- bei Verdacht auf weiteres Konto (z. B. Kindergeldeingang fehlt auf allen vorgelegten Auszügen): Kontoauszüge dieses weiteren Kontos für drei Monate.

```
Betreff: Ihr Weiterbewilligungsantrag Grundsicherung – fehlende Unterlagen (Vorgangszeichen [VZ])

Sehr geehrte*r [Anrede Nachname],

für die Bearbeitung Ihres Weiterbewilligungsantrags benötigen wir noch:

1. …
2. …
3. …

Bitte reichen Sie die Unterlagen bis zum [Datum, in der Regel 14 Tage] ein
per Post an [Adresse] oder per E-Mail an [Adresse].

Ohne diese Unterlagen kann über Ihren Antrag nicht abschließend entschieden
werden (§ 60 SGB I; § 66 SGB I).

Bei Fragen wenden Sie sich an Ihre Sachbearbeitung: [Name, Kontakt].

Mit freundlichen Grüßen
IDEFIX
```

### 6.2 An Sachbearbeitung – Vorprüfungsergebnis (immer, kombiniert)

Diese Mail bündelt Vollständigkeitsstatus, Klärungspunkte, Vorprüfung und ggf. Rückforderung. Sie wird auch versendet, wenn an die antragstellende Person eine Nachforderungsmail ging. Mailbody nach Abschnitt 5 (Bullet-Format).

```
Betreff: Vorprüfung Weiterbewilligung Grusi - [Name, Vorname] - [VZ]

Sehr geehrte*r [Sachbearbeiter*in],

Ergebnis der KI-gestützten Vorprüfung. Entscheidung obliegt Ihnen.

[Mailbody nach Abschnitt 5]

Mit freundlichen Grüßen
IDEFIX
```

Hinweis: Optional-Blöcke (Klärungsbedarf, Rückforderung, Nachgeforderte Unterlagen, Unstimmigkeiten) entfallen vollständig, wenn leer.

## 7. Konfidenz
- **Hoch (≥ 95 %):** klare Datenlage, keine Widersprüche, eindeutige Rechtsanwendung. Empfehlung möglich.
- **Mittel (90–95 %):** Empfehlung mit Hinweis auf Restunsicherheit.
- **Niedrig (< 90 %):** Empfehlung als „vorläufig" kennzeichnen, Klärungsbedarf in der Mail an die Sachbearbeitung erläutern. Es wird trotzdem ein Anspruch berechnet (vgl. 0.2).

## 8. Logfile-Format: Regel / Prüfung / Ergebnis

Das Logfile bildet die nachvollziehbare Audit-Spur jedes Vorgangs. Es wird parallel zur Mailerzeugung geschrieben und ist intern – es geht nicht an die Sachbearbeitung. Der Agent dokumentiert jeden Prüfschritt in einem dreiteiligen Block; harter Trenner zwischen Blöcken ist eine Leerzeile.

### 8.1 Aufbau eines Logfile-Eintrags

```
== Logfile Vorgang [VZ] ==
Eingangszeitpunkt: TT.MM.JJJJ HH:MM:SS
Knowledge-Datei:   Knowledge_Grusi_v2.md
Vorgangsart:       Weiterbewilligung

== Geladene Dokumente ==
[Dateiname]            · Drive-ID [optional, nur Logfile] · Seitenzahl [n]
[…]

== Prüfschritte ==

Regel    [Knowledge-Referenz, z. B. Abschnitt 2.1 Bullet 3 oder 0.19]
         Beschreibung: [Was prüft die Regel, in einem Satz]
Prüfung  Suche / Abgleich in: [Quelle(n)]
         Konkret: [welche Werte, welche Felder, welche Suchbegriffe]
Ergebnis Status:    [Plausibel | Unvollständig | Auffällig | n/a]
         Befund:    [maximal 2 Sätze]
         Wirkung:   [Eintrag in: Klärungsbedarf | Unstimmigkeiten | Berechnung | Nachforderung | Ungewöhnliche Beobachtungen | -]
         Belegstelle: [Datei, Seite, ggf. Buchungszeile/Datum]

(Ein Block je Regel. Reihenfolge folgt dem Workflow A → B → C → D.)

== Berechnungsdetails ==
[Position]: [Rechenweg], Quelle: [Beleg]
[…]

== Mailerzeugung ==
Vorprüfungsmail Sachbearbeitung:   versendet TT.MM.JJJJ HH:MM:SS an [Empfänger]
Nachforderungs-Entwurf Antragst.:  gespeichert TT.MM.JJJJ HH:MM:SS an [Empfänger] (oder: n/a)
Labels gesetzt:                    Sachbearbeiter*in | Antragsteller*in | beide | -

== Zusammenfassung ==
Status Vollständigkeit:      [...]
Empfehlung:                  [...]
Konfidenz:                   [...] – Begründung: [...]
Anzahl Klärungspunkte:       n
Anzahl Nachforderungen:      n
Anzahl ungewöhnlicher Beob.: n
```

### 8.2 Pflicht-Regeln, die immer einen Logfile-Eintrag bekommen

Auch wenn das Prüfergebnis trivial ist (z. B. „alles stimmt überein"), müssen die folgenden Regeln je einen Block im Logfile auslösen – damit nachvollziehbar bleibt, dass sie tatsächlich geprüft wurden:

1. Knowledge-Datei vollständig gelesen (0.17)
2. Aktenzeichen-Abgleich Veränderungsmitteilung ↔ Personenakte (0.18)
3. Adresse exakt geprüft (Veränderungsmitteilung ↔ Personalausweis ↔ Mietbescheinigung ↔ Kontoauszug) (2.1)
4. Buchungs-Abgleich Kontoauszug ↔ Erstantrag (0.15)
5. Vermögensschongrenze § 90 SGB XII (0.23 / 2.4)
6. Kfz-Indizien geprüft (Kfz-Steuer, Tank, Versicherungs-Abbuchung) (0.19 / 2.2)
7. Karenzzeiten / Befristungen (Versicherungen, Aufenthaltstitel, Schwerbehindertenausweis) (0.21)
8. Personenakte-Quervergleich (Familienstand, Vermieter*in, Bankverbindung) (0.22)
9. Rechnerische Plausibilität jedes Bescheids (Brutto/Netto, Vorjahresvergleich) (0.16)
10. Vermögen aus Personenakte / Erstbescheid weitergeführt (0.23)

### 8.3 Beispiel-Blöcke

#### Beispiel A – Mietänderung (Veränderungsmitteilung „Miete = geändert")

```
Regel    Knowledge_Grusi_v2.md, 2.2 – Mietbescheinigung bei markierter Mietänderung
         Beschreibung: Bei „Miete geändert" in der Veränderungsmitteilung ist eine
                        aktuelle Mietbescheinigung oder ein Mietänderungsschreiben
                        erforderlich.
Prüfung  Suche im klassifizierten Dokumentenpool (Antragsordner + Personenakte) nach
         Dokumenttyp „Mietänderungsschreiben" oder „Mietbescheinigung (Datum > letzter
         Bewilligungsbescheid)".
Ergebnis Status:      Unvollständig
         Befund:      Veränderungsmitteilung weist Mietänderung aus, aber keine aktuelle
                      Mietbescheinigung im Vorgang oder in der Personenakte.
         Wirkung:     Nachforderung „Aktuelle Mietbescheinigung oder Mietänderungs-
                      schreiben" im Entwurf an Antragsteller*in; Klärungspunkt im
                      Vorprüfungsmail-Block „Klärungsbedarf".
         Belegstelle: Veraenderungsmitteilung.pdf, S. 1, Feld „Miete geändert".
```

#### Beispiel B – Rentenanpassung mit Auffälligkeit im Kontoauszug

```
Regel    Knowledge_Grusi_v2.md, 0.16 / 2.3 – Kritische Plausibilität Rentenbescheid
         Beschreibung: Rentenanpassung üblicherweise zum 01.07.; Brutto/Netto plausibel
                        und mit Auszahlung im Kontoauszug abgleichen.
Prüfung  Rentenanpassungsmitteilung 07/2025 (Brutto 1.045,00 €, Netto 932,15 €) gegen
         Kontoauszug 08/2025 abgleichen.
Ergebnis Status:      Auffällig
         Befund:      Kontoauszug 08/2025 weist Renteneingang 950,40 € aus. Bescheid Netto
                      932,15 €. Differenz 18,25 € – nicht durch Bescheid gedeckt.
         Wirkung:     Klärungspunkt im Vorprüfungsmail-Block „Klärungsbedarf". Vorrang
                      Kontoauszug. Berechnung mit 950,40 € als Renteneinkommen (vorläufig).
                      Nachforderung „Aktueller Rentenanpassungsbescheid 01.07.2025".
         Belegstelle: Rentenbescheid_07_2025.pdf, S. 1; Kontoauszug_08_2025.pdf, S. 1.
```

#### Beispiel C – Kfz-Indiz ohne Versicherungsnachweis

```
Regel    Knowledge_Grusi_v2.md, 0.19 / 2.2 – Zusammenhänge erkennen, Kfz-Haftpflicht
         Beschreibung: Kfz-Steuer- oder Tankabbuchung impliziert Kfz im Haushalt → Kfz-
                        Haftpflicht als absetzbare Position; Beitragsrechnung erforderlich.
Prüfung  Suche im Kontoauszug der letzten drei Monate nach „Finanzamt Kfz-Steuer",
         „Aral", „Shell", „Esso", „Werkstatt", „Versicherung Kfz". Abgleich mit
         Veränderungsmitteilung und Personenakte auf Vorhandensein einer Kfz-Haftpflicht-
         Bescheinigung.
Ergebnis Status:      Unvollständig
         Befund:      Neue monatliche Lastschrift „HUK Kfz" 28,40 € seit 01.02.2026;
                      keine Beitragsrechnung im Vorgang oder in der Personenakte.
         Wirkung:     Position Kfz-Haftpflicht als absetzbarer Betrag in Berechnung
                      angesetzt (vorläufig); Klärungspunkt „Kfz und Versicherung nicht
                      gemeldet"; Nachforderung „Aktuelle Beitragsrechnung Kfz-Haftpflicht".
         Belegstelle: Kontoauszug_02_2026.pdf, S. 1; Kontoauszug_03_2026.pdf, S. 1.
```

#### Beispiel D – Vermögensschongrenze überschritten

```
Regel    Knowledge_Grusi_v2.md, 0.23 / 2.4 – Vermögensschongrenze § 90 SGB XII
         Beschreibung: Schongrenze 10.000 € p. P. / 20.000 € Paar. Bei Überschreitung
                        Aussetzung empfehlen, keine Verwendungsnachweise.
Prüfung  Summe liquider Mittel (Bargeld, Sparkonto, LV-Rückkaufwert, Bestattungs-
         vorsorge oberhalb angemessen) per Stichtag 31.03.2026.
Ergebnis Status:      Auffällig
         Befund:      Vermögen 11.250,00 € > 10.000 € Schongrenze einer Einzelperson.
                      Zufluss „Erbschaft" 5.500,00 € am 12.03.2026 erkennbar.
         Wirkung:     Empfehlung Aussetzung ab 01.04.2026 (Monat nach Zufluss);
                      Klärungspunkt „Vermögen über Schongrenze – Aussetzung empfohlen".
                      Vermögen einzusetzen: 1.250,00 €.
         Belegstelle: Sparkasse_Q1_2026.pdf, S. 1; Kontoauszug_03_2026.pdf, Buchung 12.03.2026.
```

#### Beispiel E – Aktenzeichen-Abgleich (Trivialfall)

```
Regel    Knowledge_Grusi_v2.md, 0.18 – Aktenzeichen-Abgleich
         Beschreibung: Vorgangszeichen Veränderungsmitteilung ↔ Vorgangszeichen Personenakte;
                        bei Abweichung Klärungspunkt #1, Empfehlung „vorläufig".
Prüfung  Vergleich Vorgangszeichen Veränderungsmitteilung (S. 1) mit letztem
         Bewilligungsbescheid (Personenakte).
Ergebnis Status:      Plausibel
         Befund:      Vorgangszeichen identisch (50.4/Grusi-2026-0098).
         Wirkung:     Keine. Konfidenz unverändert „Hoch".
         Belegstelle: Veraenderungsmitteilung.pdf, S. 1; Bewilligungsbescheid_2025_12.pdf, S. 1.
```

### 8.4 Hinweise zur Konsistenz

- Logfile-Einträge sind **intern** – ihre Inhalte erscheinen nicht im Mailtext, auch nicht in Klammern oder als Referenz (vgl. 0.11).
- Die in den Beispielen genannten Belegstellen (Dateinamen + Seitenzahlen + Buchungszeilen) gehören **nur** ins Logfile, nicht in den Mailbody. Im Mailbody erscheinen die Dateinamen einmal gesammelt im Block „Geprüfte Unterlagen".
- Wenn dieselbe Regel mehrere Indizien auslöst (z. B. Kfz-Steuer **und** Tankabbuchung **und** Werkstattabbuchung), reicht ein zusammengefasster Block; die einzelnen Indizien werden im Befund kurz aufgezählt.
- Bei Pflicht-Regeln 9.2, die ohne Befund bleiben (alles in Ordnung), wird trotzdem ein Block geschrieben – Status `Plausibel`, Wirkung `Keine`.
