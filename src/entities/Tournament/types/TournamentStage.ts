import type { BracketEvent } from "@/entities/Bracket";
import { ViewableBracketEvent } from "@/entities/BracketEvent";
import type { Nullable } from "@/shared/types";
export enum TournamentStageType {
  Bracket = "bracket",
  Pool = "pool",
  Points = "points",
}

interface TournamentStageBase {
  id: Nullable<string>;
  order: number;
  name: string;
  numWinners: number[];
  numTeams: number;
}

export type TournamentBracketStage = TournamentStageBase & {
  type: TournamentStageType.Bracket;
} & BracketEvent;

export type ViewableTournamentBracketStage = TournamentStageBase & {
  type: TournamentStageType.Bracket;
} & ViewableBracketEvent;

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

export type ViewableTournamentStage = ViewableTournamentBracketStage;
