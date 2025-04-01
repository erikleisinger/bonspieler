import type { Nullable } from "@/shared/types";
import type { TournamentStageType } from "@/entities/Tournament";
export type ViewableBracketEvent = {
  id: Nullable<string>;
  name: string;
  lookingToAssignTeam: Nullable<string>;
  num_start_teams: number;
  num_end_teams: number;
  tournament_id: string;
  order: number;
  type: TournamentStageType;
};
