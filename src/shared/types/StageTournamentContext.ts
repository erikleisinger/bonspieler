import { Nullable } from "./Nullable";

export interface StageTournamentContext {
  id: Nullable<string>;
  order: number;
  startTeams: Nullable<number>;
  endTeams: Nullable<number>;
  prevStageName: Nullable<string>;
  nextStageName: Nullable<string>;
}
