import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveBracketGames as saveBracketGamesMutation } from "../api";
import type {
  BracketGameType,
  BracketReadableIdIndex,
} from "@/entities/Bracket";
import {
  getBracketEventReadableIdIndex,
  getBracketEventSchedule,
} from "../bracketGamesSlice";
import { getDrawTimes } from "@/entities/DrawTime";

import { formatBracketGamesForSave } from "../helpers";
export const saveBracketGames = createAsyncThunk(
  "tournament/saveBracketGames",
  async (
    {
      bracketStageId,
      tournamentId,
      brackets,
    }: {
      bracketStageId: string;
      tournamentId: string;
      brackets: BracketGameType[][][];
    },
    { getState }
  ) => {
    const state = getState();
    const readableIdIndex = { ...getBracketEventReadableIdIndex(state) };
    const schedule = { ...getBracketEventSchedule(state) };

    const formattedGames = formatBracketGamesForSave({
      bracketStageId,
      tournamentId,
      brackets,
      readableIdIndex,

      schedule,
    });

    await saveBracketGamesMutation(formattedGames);
  }
);
