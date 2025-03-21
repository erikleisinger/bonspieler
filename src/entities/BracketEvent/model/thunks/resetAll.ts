import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetState as resetDrawTimeState } from "@/entities/DrawTime";
import { resetState as resetBracketEventState } from "@/entities/BracketEvent";
import { resetState as resetGameState } from "@/entities/Bracket/BracketGame";
import { resetState as resetConnectionsState } from "@/entities/Bracket/BracketGameConnections";

export const resetAll = createAsyncThunk(
  "bracketEvent/resetAll",
  async (_, { dispatch }) => {
    dispatch(resetDrawTimeState());
    dispatch(resetBracketEventState());
    dispatch(resetGameState());
    dispatch(resetConnectionsState());
  }
);
