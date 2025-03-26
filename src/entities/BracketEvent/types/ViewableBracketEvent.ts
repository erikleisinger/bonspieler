import type { Nullable } from "@/shared/types";

export type ViewableBracketEvent = {
  id: Nullable<string>;
  name: string;
  lookingToAssignTeam: Nullable<string>;
  num_start_teams: number;
  num_end_teams: number;
  tournament_id: string;
  order: number;
};
