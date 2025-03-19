import { createSelector } from "@reduxjs/toolkit";
import { getTournamentField } from "./getTournamentField";
export const getPrevStageName = createSelector(
  [getTournamentField("stages")],
  (stages) => {
    return (stageIndex: number) => {
      if (!stages?.length) return;
      if (!stageIndex) return null;
      const prevStage = stages[stageIndex - 1];
      const { name = "" } = prevStage || {};
      return name;
    };
  }
);
