import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDrawTimesForStage } from "../api";

export const initDrawTimesForStage = createAsyncThunk(
  "drawTimes/initDrawTimesForStage",
  async (stageId: string) => {
    const drawTimes = await fetchDrawTimesForStage(stageId);
    return drawTimes?.reduce((all, current) => {
      const { draw_number, time } = current;
      return {
        ...all,
        [draw_number]: time,
      };
    }, {});
  }
);
