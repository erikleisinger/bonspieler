import { Nullable } from "./Nullable";

export interface StageTournamentContext {
  order: number;
  startTeams: Nullable<number>;
  endTeams: Nullable<number>;
  prevStageName: Nullable<string>;
  nextStageName: Nullable<string>;
}
