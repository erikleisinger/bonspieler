import { createSelector } from "@reduxjs/toolkit";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";
import { getTournamentField } from "./getTournamentField";
export const getStartTeams = createSelector(
  [getTournamentField("stages")],
  (stages) => {
    return (stageIndex: number) => {
      if (!stageIndex || !stages?.length) return null;
      const prevStage = stages[stageIndex - 1];
      const { numWinners } = prevStage;
      return getTotalBracketWinners(numWinners);
    };
  }
);
