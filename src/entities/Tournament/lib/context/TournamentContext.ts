import { createContext } from "react";
import { Tables } from "@/shared/api";
import { Nullable } from "@/shared/types";
import { Tournament } from "@/shared/types/Tournament";
import { TournamentStage } from "../types/TournamentStage";
export const TournamentContext = createContext<{
  id: Nullable<string>;
  name: string;
  teams: Tables<"teams">[];
  stages: TournamentStage[];
  updateTournament: (tournament: Partial<Tournament>) => void;
}>({
  id: null,
  name: "New Bonspiel",
  teams: [],
  stages: [],
  updateTournament: () => {},
});
