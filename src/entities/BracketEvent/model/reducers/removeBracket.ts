import { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEventState } from "../bracketEventSlice";
export const removeBracket = (
  state: BracketEventState,
  action: PayloadAction<number>
) => {
  if (!state.bracket) return;
  const bracketIndex = action.payload;
  const newBrackets = [...state.bracket.brackets];
  const newConnections = { ...state.bracket.connections };
  const newSchedule = { ...state.bracket.schedule };
  const newNumWinners = [...state.bracket.numWinners];
  const newReadableIdIndex = { ...state.bracket.readableIdIndex };
  const newNumTeams =
    state.bracket.numTeams - state.bracket.brackets[bracketIndex][0].length;
  state.bracket.brackets[bracketIndex]
    .flat()

    .forEach(({ id: gameId }) => {
      delete newConnections[gameId];
      delete newSchedule[gameId];
      delete newReadableIdIndex[gameId];
    });
  newBrackets.splice(bracketIndex, 1);
  newNumWinners.splice(bracketIndex, 1);
  state.bracket.brackets = newBrackets;
  state.bracket.connections = newConnections;
  state.bracket.schedule = newSchedule;
  state.bracket.numWinners = newNumWinners;
  state.bracket.numTeams = newNumTeams;
  state.bracket.readableIdIndex = newReadableIdIndex;
};
