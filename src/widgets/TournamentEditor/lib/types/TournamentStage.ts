import type { BracketEvent } from "@/entities/Bracket";
export enum TournamentStageType {
  Bracket = "bracket",
  Pool = "pool",
  Points = "points",
}

interface TournamentStageBase {
  id: string;
  order: number;
  name: string;
}

export type TournamentBracketStage = TournamentStageBase & {
  type: TournamentStageType.Bracket;
} & BracketEvent;

export type TournamentPoolStage = TournamentStageBase & {
  type: TournamentStageType.Pool;
};
export type TournamentPointsStage = TournamentStageBase & {
  type: TournamentStageType.Points;
};

export type TournamentStage =
  | TournamentBracketStage
  | TournamentPointsStage
  | TournamentPoolStage;
