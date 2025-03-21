import { createAsyncThunk } from "@reduxjs/toolkit";
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
} from "@/entities/Bracket/BracketGame";
import { updateNumWinners, updateNumTeams } from "../bracketEventSlice";
import { getBracketEndTeams } from "../helpers";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";

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
      numTeams,
      numWinners,
    } = newBracketEvent;
    const [bracketToAdd] = brackets;

    dispatch(updateNumWinners(getTotalBracketWinners(numWinners)));
    dispatch(updateNumTeams(numTeams));
    dispatch(updateLoserConnections(loserConnections));
    dispatch(updateWinnerConnections(winnerConnections));
    dispatch(updateOriginConnections(originConnections));
    dispatch(addBracket(bracketToAdd));
    dispatch(updateBracketEventGameIndex(gameIndex));
    dispatch(updateBracketEventReadableIdIndex(readableIdIndex));
  }
);
