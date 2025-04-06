import type { Nullable } from "@/shared/types";
import type { TournamentStageType } from "@/entities/Tournament";
import type { PoolFormat } from "./PoolFormat";
import { StageWinnerFormat } from "./StageWinnerFormat";
import { PointsConditions } from "./PointsConditions";
interface BaseTournamentStage {
  id: Nullable<string>;
  name: string;
  numTeams: number;
  winnerFormat: Nullable<StageWinnerFormat>;
  conditions: PointsConditions;
  numWinners: number;
  numWinnersArray: number[];
}

export interface BlankTournamentStage extends BaseTournamentStage {
  type: null;
}

export interface EditedBracketStage extends BaseTournamentStage {
  type: TournamentStageType.Bracket;
  numBrackets: number;
}

export interface EditedPoolStage extends BaseTournamentStage {
  type: TournamentStageType.Pool;
  numPools: number;
  numGamesPerTeam: number;
  winnersPerPool: number[];
  format: Nullable<PoolFormat>;
  avoidCollisions: boolean;
}

export interface EditedPointsStage extends BaseTournamentStage {
  type: TournamentStageType.Points;
}

export type EditedTournamentStage =
  | BlankTournamentStage
  | EditedBracketStage
  | EditedPointsStage
  | EditedPoolStage;
