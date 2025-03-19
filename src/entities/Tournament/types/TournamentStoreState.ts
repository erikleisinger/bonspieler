import type { Tournament } from "./Tournament";
import type { TournamentTeam } from "./TournamentTeam";
import type { Nullable } from "@/shared/types";
export interface TournamentStoreState {
  tournament: Nullable<Tournament>;
  teams: TournamentTeam[];
  status: "idle" | "loading" | "failed";
}
