import { BracketGameType } from "@/entities/Bracket";
import { Nullable } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

interface BracketEditorStoreState {
  lookingForLoserConnection: Nullable<BracketGameType>;
}

const defaultState = () => ({
  lookingForLoserConnection: false,
});

const initialState: BracketEditorStoreState = {
  ...defaultState(),
};

export const bracketEditorSlice = createSlice({
  name: "bracketEditor",
  initialState,
  reducers: {
    setLookingForLoserConnection: (
      state,
      action: PayloadAction<Nullable<BracketGameType>>
    ) => {
      state.lookingForLoserConnection = action.payload;
    },
  },
});

export const isLookingForLoserConnection = (state: RootState) =>
  !!state.bracketEditor.lookingForLoserConnection;

export const getLookingForLoserConnection = (state: RootState) =>
  state.bracketEditor.lookingForLoserConnection;

export const { setLookingForLoserConnection } = bracketEditorSlice.actions;

export default bracketEditorSlice.reducer;
