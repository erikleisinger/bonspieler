import type { Tournament } from "./Tournament";
import type { TournamentTeam } from "./TournamentTeam";
import type { Nullable } from "@/shared/types";
import type { TournamentStage } from "./TournamentStage";
export interface TournamentStoreState {
  tournament: Nullable<Tournament>;
  teams: TournamentTeam[];
  stages: TournamentStage[];
  status: "idle" | "loading" | "failed";
  stagesStatus: "idle" | "loading" | "failed";
  stageAddStatus: "idle" | "loading" | "failed";
  stageRemoveStatus: "idle" | "loading" | "failed";
  removingStage: Nullable<string>;
}
