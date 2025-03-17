import type { Nullable } from "@/shared/types";
export interface TournamentTeam {
  id: string;
  name: Nullable<string>;
  tournament_id: Nullable<string>;
}
