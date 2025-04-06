import { createContext } from "react";
import { TournamentStageType } from "@/entities/Tournament";
import { Nullable } from "@/shared/types";
export const StageWizardContext = createContext<{
  type: Nullable<TournamentStageType>;
}>({
  type: null,
});
