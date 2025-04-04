import { createContext } from "react";
import { Nullable } from "@/shared/types";
import { TournamentStage } from "@/entities/Tournament";
export const TournamentStageContext = createContext<{
  tournamentId: Nullable<string>;
  stages: {
    [stageId: string]: TournamentStage;
  };
}>({
  tournamentId: null,
  stages: {},
});
