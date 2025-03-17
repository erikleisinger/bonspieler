import type { TournamentStage } from "./TournamentStage";
export interface Tournament {
  id?: string;
  name: string;
  stages: TournamentStage[];
}
