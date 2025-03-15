import { createContext } from "react";

export const TournamentContext = createContext<{
  tournamentName: string;
}>({
  tournamentName: "New Bonspiel",
});
