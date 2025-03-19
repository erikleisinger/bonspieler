import { createSelector } from "@reduxjs/toolkit";
import { getTournamentField } from "./getTournamentField";
export const getNextStageName = createSelector(
  [getTournamentField("stages")],
  (stages) => {
    return (stageIndex: number) => {
      if (!stages?.length) return null;
      if (stageIndex >= stages.length - 1) return null;
      const nextStage = stages[stageIndex + 1];
      const { name = "" } = nextStage || {};
      return name;
    };
  }
);
