import { createContext } from "react";
import { Nullable } from "../types";
export const TournamentStageContext = createContext<{
  startTeams: Nullable<number>;
  endTeams: Nullable<number>;
  prevStageName: Nullable<string>;
  nextStageName: Nullable<string>;
}>({
  startTeams: null,
  endTeams: null,
  prevStageName: null,
  nextStageName: null,
});
