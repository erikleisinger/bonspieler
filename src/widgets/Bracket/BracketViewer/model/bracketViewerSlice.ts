import { BracketGameType } from "@/entities/Bracket";
import { Nullable } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

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
    setSelectedGame: (state, action: PayloadAction<BracketGameType>) => {
      Object.assign(state, defaultState());
      state.selectedGame = action.payload;
    },
  },
});

export const getSelectedGame = (state: RootState) => {
  if (!state?.bracketViewer) return null;
  return state.bracketViewer.selectedGame;
};

export const getSelectedDraw = (state: RootState) => {
  if (!state?.bracketViewer) return null;
  return state.bracketViewer.selectedDraw;
};

export const { setSelectedDraw, setSelectedGame } = bracketViewerSlice.actions;

export default bracketViewerSlice.reducer;
