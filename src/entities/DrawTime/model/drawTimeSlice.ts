import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BracketDrawTimes } from "@/entities/Bracket";

import * as thunks from "./thunks";
import { RootState } from "@/lib/store";
import { Nullable } from "@/shared/types";
import { drawTimesApi } from "./api";
export interface DrawTimeStoreState {
  drawTimes: BracketDrawTimes;
  initialDrawTimes: BracketDrawTimes;
}
function defaultState(): DrawTimeStoreState {
  return {
    drawTimes: {},
    initialDrawTimes: {},
  };
}
const initialState = defaultState();
export const drawTimeSlice = createSlice({
  name: "drawTimes",
  initialState,
  reducers: {
    resetState(state) {
      state.drawTimes = defaultState().drawTimes;
    },
    setDrawTimes: (state, action: PayloadAction<BracketDrawTimes>) => {
      state.drawTimes = action.payload;
    },
    addDrawTimes: (state, action: PayloadAction<BracketDrawTimes>) => {
      state.drawTimes = {
        ...state.drawTimes,
        ...action.payload,
      };
    },
    trimDrawTimesTo: (state, action: PayloadAction<number>) => {
      const newDrawTimes = { ...state.drawTimes };
      Object.keys(newDrawTimes).forEach((drawTimeId) => {
        if (Number(drawTimeId) > action.payload) {
          delete newDrawTimes[drawTimeId];
        }
      });
      state.drawTimes = newDrawTimes;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        thunks.initDrawTimesForStage.fulfilled,
        (state, action: PayloadAction<BracketDrawTimes>) => {
          state.drawTimes = action.payload;
          state.initialDrawTimes = { ...action.payload };
        }
      )
      .addMatcher(
        drawTimesApi.endpoints.fetchDrawTimesForStage.matchFulfilled,
        (state, action) => {
          state.drawTimes = action.payload;
        }
      );
  },
});

export const getDrawTimes = (state: RootState) => {
  return state.drawTimes.drawTimes;
};
export const getInitialDrawTimes = (state: RootState) => {
  return state.drawTimes.initialDrawTimes;
};

export const getDrawTimeByNumber = createSelector(
  [getDrawTimes, (state, drawNumber: Nullable<number>) => drawNumber],
  (drawTimes, drawNumber) => {
    if (!drawNumber) return null;
    return drawTimes[drawNumber] || null;
  }
);
export const { setDrawTimes, addDrawTimes, resetState, trimDrawTimesTo } =
  drawTimeSlice.actions;

export const initDrawTimesForStage = thunks.initDrawTimesForStage;
export const saveDrawTimes = thunks.saveDrawTimes;

export default drawTimeSlice.reducer;
