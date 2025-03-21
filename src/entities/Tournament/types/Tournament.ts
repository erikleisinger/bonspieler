import { Nullable } from "@/shared/types";
import type { TournamentStage } from "./TournamentStage";
export interface Tournament {
  id?: string;
  name: string;
  start_date: Nullable<string>;
  end_date: Nullable<string>;
  num_sheets: Nullable<number>;
  stages: TournamentStage[];
}
