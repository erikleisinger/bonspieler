import { createContext } from "react";
import { Nullable } from "../types";
export const TournamentStageContext = createContext<{
  startTeams: Nullable<number>;
  endTeams: Nullable<number>;
  prevStageEndTeams: Nullable<number>;
  prevStageName: Nullable<string>;
  nextStageName: Nullable<string>;
}>({
  startTeams: null,
  endTeams: null,
  prevStageEndTeams: null,
  prevStageName: null,
  nextStageName: null,
});
