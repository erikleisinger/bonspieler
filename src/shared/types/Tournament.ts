import { TournamentStage } from "@/widgets/TournamentEditor";

export interface Tournament {
  id: string;
  name: string;
  stages: TournamentStage[];
}
