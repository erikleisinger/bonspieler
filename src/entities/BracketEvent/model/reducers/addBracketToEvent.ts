import { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEventState } from "../bracketEventSlice";
import type {
  BracketGameType,
  BracketConnections,
  BracketSchedule,
  BracketReadableIdIndex,
} from "@/entities/Bracket";
export const addBracketToEvent = (
  state: BracketEventState,
  action: PayloadAction<{
    brackets: BracketGameType[][][];
    connections: BracketConnections;
    schedule: BracketSchedule;
    readableIdIndex: BracketReadableIdIndex;
    numTeams: number;
    numWinners: number[];
  }>
) => {
  if (!state.bracket) return;
  state.bracket = {
    ...state.bracket,
    brackets: [...state.bracket?.brackets, ...action.payload.brackets],
    connections: {
      ...state.bracket?.connections,
      ...action.payload.connections,
    },
    readableIdIndex: {
      ...state.bracket?.readableIdIndex,
      ...action.payload.readableIdIndex,
    },
    schedule: { ...state.bracket?.schedule, ...action.payload.schedule },
    numWinners: [...state.bracket.numWinners, ...action.payload.numWinners],
  };
};
