import type { Nullable } from "@/shared/types";
import type { TournamentStageType } from "@/entities/Tournament";
import type { PoolFormat } from "./PoolFormat";
interface BaseTournamentStage {
  id: Nullable<string>;
  name: string;
  numTeams: number;
}

export interface BlankTournamentStage extends BaseTournamentStage {
  type: null;
}

export interface BracketTournamentStage extends BaseTournamentStage {
  type: TournamentStageType.Bracket;
  numWinners: number;
  numWinnersArray: number[];
  numBrackets: number;
}

export interface PoolTournamentStage extends BaseTournamentStage {
  type: TournamentStageType.Pool;
  numGamesPerTeam: number;
  format: PoolFormat;
  avoidCollisions: boolean;
}

export type EditedTournamentStage =
  | BlankTournamentStage
  | BracketTournamentStage;
