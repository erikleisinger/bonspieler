import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGameById } from "@/entities/Bracket/BracketGame";

export const setSelectedGame = createAsyncThunk(
  "bracketViewer/setSelectedGame",
  (id: string, { getState }) => {
    const state = getState();
    return getGameById(state, id) || null;
  }
);
