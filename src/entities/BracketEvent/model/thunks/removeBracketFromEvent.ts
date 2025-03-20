import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBracketEventGameIndex,
  getBracketEventReadableIdIndex,
  getGamesForBracket,
  removeBracket,
  setBracketEventGameIndex,
  setBracketEventReadableIdIndex,
} from "@/entities/Bracket/BracketGame";
import {
  getLoserConnections,
  getOriginConnections,
  getWinnerConnections,
  setLoserConnections,
  setOriginConnections,
  setWinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";

export const removeBracketFromEvent = createAsyncThunk(
  "bracketEvent/removeBracketFromEvent",
  async (bracketIndex: number, { dispatch, getState }) => {
    const state = getState();
    const games = getGamesForBracket(state, bracketIndex);
    const readableIdIndex = { ...getBracketEventReadableIdIndex(state) };
    const gameIndex = { ...getBracketEventGameIndex(state) };
    const winnerConnections = { ...getWinnerConnections(state) };
    const loserConnections = { ...getLoserConnections(state) };
    const originConnections = { ...getOriginConnections(state) };

    games.forEach(({ id }) => {
      delete winnerConnections[id];
      delete loserConnections[id];
      delete originConnections[id];
      delete readableIdIndex[id];
      delete gameIndex[id];
    });
    dispatch(setBracketEventReadableIdIndex(readableIdIndex));
    dispatch(setBracketEventGameIndex(gameIndex));
    dispatch(setWinnerConnections(winnerConnections));
    dispatch(setLoserConnections(loserConnections));
    dispatch(setOriginConnections(originConnections));
    dispatch(removeBracket(bracketIndex));

    return bracketIndex;
  }
);
