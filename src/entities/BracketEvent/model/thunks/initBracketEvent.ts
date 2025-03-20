import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBracketEvent } from "../api";

export const initBracketEvent = createAsyncThunk(
  "tournament/initBracketEvent",
  async (id: string) => {
    const { games } = await fetchBracketEvent(id);
    return games;
  }
);
