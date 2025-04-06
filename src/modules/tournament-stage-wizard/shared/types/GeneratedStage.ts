import type { GeneratedBracket } from "./GeneratedBracket";

interface BaseGeneratedStage {
  id: string;
  name: string;
  numTeams: number;
}

export type GeneratedBracketStage = BaseGeneratedStage & {
  type: "bracket";
} & GeneratedBracket;

export type GeneratedStage = GeneratedBracketStage;
