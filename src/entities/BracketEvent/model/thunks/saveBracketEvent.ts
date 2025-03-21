import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveBracketEvent as save } from "../api";
import { getBracketEvent } from "../bracketEventSlice";
export const saveBracketEvent = createAsyncThunk(
  "tournament/saveBracketEvent",
  async (_, { getState }) => {
    const state = getState();
    const event = { ...getBracketEvent(state) };
    const { id, name, num_start_teams, num_end_teams } = event;

    await save({
      id,
      name,
      num_start_teams,
      num_end_teams,
    });
  }
);
