import { createSelector } from "@reduxjs/toolkit";
import { getTournamentField } from "./getTournamentField";
export const getEndTeams = createSelector(
  [getTournamentField("stages")],
  (stages) => {
    return (stageIndex: number) => {
      if (stageIndex === undefined) return null;
      if (!stages?.length) return null;
      if (stageIndex >= stages.length - 1) return null;
      const nextStage = stages[stageIndex + 1];
      const { numTeams } = nextStage;
      return numTeams;
    };
  }
);
