import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveBracketGames as saveBracketGamesMutation,
  removeGamesByIds,
} from "../api";
import type {
  BracketGameType,
  BracketReadableIdIndex,
} from "@/entities/Bracket";
import {
  getBracketEventReadableIdIndex,
  getBracketEventSchedule,
  getRemovedGameIds,
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
    const removedGameIds = [...getRemovedGameIds(state)];

    const formattedGames = formatBracketGamesForSave({
      bracketStageId,
      tournamentId,
      brackets,
      readableIdIndex,

      schedule,
    });

    await Promise.all([
      saveBracketGamesMutation(formattedGames),
      removeGamesByIds(removedGameIds),
    ]);
  }
);
