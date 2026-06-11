export type Leistungsart = "grundsicherung" | "hilfe_zum_lebensunterhalt";

export interface TestCase {
  id: string;
  leistungsart: Leistungsart;
  beschreibung: string;
}
