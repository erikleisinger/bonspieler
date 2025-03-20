import { createAsyncThunk } from "@reduxjs/toolkit";
import type { BracketConnections } from "@/entities/Bracket";
import { formatConnectionsForSave } from "../helpers";
import { saveBracketConnections as saveBracketConnectionsMutation } from "../api";
import {
  getWinnerConnections,
  getLoserConnections,
  getOriginConnections,
} from "../bracketConnectionsSlice";

export const saveBracketConnections = createAsyncThunk(
  "tournament/saveBracketConnections",
  async (
    {
      tournamentId,
      bracketStageId,
    }: {
      tournamentId: string;
      bracketStageId: string;
    },
    { getState }
  ) => {
    const state = getState();
    const winnerConnections = { ...getWinnerConnections(state) };
    const loserConnections = { ...getLoserConnections(state) };
    const originConnections = { ...getOriginConnections(state) };
    await saveBracketConnectionsMutation(
      formatConnectionsForSave({
        connections: {
          loserConnections,
          winnerConnections,
          originConnections,
        },
        bracketStageId,
        tournamentId,
      }),
      bracketStageId
    );
  }
);
