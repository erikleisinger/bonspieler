import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BracketDrawTimes } from "@/entities/Bracket";

import * as thunks from "./thunks";
import { RootState } from "@/lib/store";

export interface DrawTimeState {
  drawTimes: BracketDrawTimes;
}

const initialState = {
  drawTimes: {},
};
export const drawTimeSlice = createSlice({
  name: "drawTimes",
  initialState,
  reducers: {
    setDrawTimes: (state, action: PayloadAction<BracketDrawTimes>) => {
      state.drawTimes = action.payload;
    },
    updateDrawTimes: (state, action: PayloadAction<BracketDrawTimes>) => {
      state.drawTimes = {
        ...state.drawTimes,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      thunks.initDrawTimesForStage.fulfilled,
      (state, action: PayloadAction<BracketDrawTimes>) => {
        state.drawTimes = action.payload;
      }
    );
  },
});

export const getDrawTimes = (state: RootState) => {
  return state.drawTimes.drawTimes;
};

export const getDrawTimeByNumber = createSelector(
  [getDrawTimes, (state, drawNumber: number) => drawNumber],
  (drawTimes, drawNumber) => {
    return drawTimes[drawNumber] || null;
  }
);
export const { setDrawTimes, updateDrawTimes } = drawTimeSlice.actions;

export const initDrawTimesForStage = thunks.initDrawTimesForStage;
export const saveDrawTimes = thunks.saveDrawTimes;

export default drawTimeSlice.reducer;
