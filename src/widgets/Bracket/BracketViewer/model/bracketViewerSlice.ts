import { BracketGameType } from "@/entities/Bracket";
import { Nullable } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import * as thunks from "./thunks";

export interface BracketViewerStoreState {
  selectedGame: Nullable<BracketGameType>;
  selectedDraw: Nullable<number>;
}

const defaultState = () => ({
  selectedGame: null,
  selectedDraw: null,
});

const initialState: BracketViewerStoreState = {
  ...defaultState(),
};

export const bracketViewerSlice = createSlice({
  name: "bracketViewer",
  initialState,
  reducers: {
    setSelectedDraw: (state, action: PayloadAction<number>) => {
      Object.assign(state, defaultState());
      state.selectedDraw = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunks.setSelectedGame.fulfilled, (state, action) => {
      Object.assign(state, defaultState());
      state.selectedGame = action.payload;
    });
  },
});

export const getSelectedGame = (state: RootState) =>
  state.bracketViewer.selectedGame;

export const getSelectedDraw = (state: RootState) =>
  state.bracketViewer.selectedDraw;

export const { setSelectedDraw } = bracketViewerSlice.actions;

export const setSelectedGame = thunks.setSelectedGame;

export default bracketViewerSlice.reducer;
