import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBracketEvent } from "../api";
import { GeneratedBracket } from "@/features/Bracket/GenerateBracket";
import {
  updateOriginConnections,
  updateLoserConnections,
  updateWinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";
import {
  addBracket,
  updateBracketEventGameIndex,
  updateBracketEventReadableIdIndex,
  getBracketEventBrackets,
} from "@/entities/Bracket/BracketGame";

export const addBracketToEvent = createAsyncThunk(
  "bracketEvent/addBracketToEvent",
  async (newBracketEvent: GeneratedBracket, { dispatch }) => {
    const {
      loserConnections,
      winnerConnections,
      originConnections,
      brackets,
      readableIdIndex,
      gameIndex,
    } = newBracketEvent;

    const [bracketToAdd] = brackets;
    dispatch(updateLoserConnections(loserConnections));
    dispatch(updateWinnerConnections(winnerConnections));
    dispatch(updateOriginConnections(originConnections));
    dispatch(addBracket(bracketToAdd));
    dispatch(updateBracketEventGameIndex(gameIndex));
    dispatch(updateBracketEventReadableIdIndex(readableIdIndex));
  }
);
