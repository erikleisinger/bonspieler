import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveDrawTimes as saveDrawTimesMutation } from "../api";
import { BracketDrawTimes } from "@/entities/Bracket";
import { formatDrawTimesForSave } from "../helpers";
import { getInitialDrawTimes } from "../drawTimeSlice";
export const saveDrawTimes = createAsyncThunk(
  "drawTimes/saveDrawTimes",
  async (
    {
      tournamentId,
      stageId,
      drawTimes,
    }: {
      tournamentId: string;
      stageId: string;
      drawTimes: BracketDrawTimes;
    },
    { getState }
  ) => {
    const state = getState();
    const initialDrawTimes = { ...getInitialDrawTimes(state) };

    console.log("initialTimes: ", initialDrawTimes);

    const formatted = formatDrawTimesForSave({
      tournamentId,
      stageId,
      drawTimes,
    });
    console.log("draw times: ", drawTimes);
    console.log("formatted: ", formatted);
    const data = await saveDrawTimesMutation(formatted, stageId);
    return data;
  }
);
