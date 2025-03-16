import type { TournamentStage } from "@/entities/Tournament";

export interface Tournament {
  id?: string;
  name: string;
  stages: TournamentStage[];
}
