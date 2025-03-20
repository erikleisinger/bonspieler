import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveDrawTimes as saveDrawTimesMutation } from "../api";
import { BracketDrawTimes } from "@/entities/Bracket";
import { formatDrawTimesForSave } from "../helpers";
export const saveDrawTimes = createAsyncThunk(
  "drawTimes/saveDrawTimes",
  async ({
    tournamentId,
    stageId,
    drawTimes,
  }: {
    tournamentId: string;
    stageId: string;
    drawTimes: BracketDrawTimes;
  }) => {
    const formatted = formatDrawTimesForSave({
      tournamentId,
      stageId,
      drawTimes,
    });
    const data = await saveDrawTimesMutation(formatted, stageId);
    return data;
  }
);
