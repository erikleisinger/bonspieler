import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Nullable } from "@/shared/types";
import { RootState } from "@/lib/store";
import { BracketEvent, BracketRows } from "@/entities/Bracket/lib";
import { BracketGameType } from "@/entities/Bracket";

type ViewableBracketEvent = BracketEvent & {
  selectedDraw: Nullable<number>;
  selectedGame: Nullable<BracketGameType>;
  rows: BracketRows;
};

interface BracketEventState {
  bracket: Nullable<ViewableBracketEvent>;
}

const initialState: BracketEventState = {
  bracket: {
    brackets: [],
    connections: {},
    drawTimes: {},
    id: null,
    name: "",
    numTeams: 16,
    numWinners: [],
    numSheets: 8,
    readableIdIndex: {},
    selectedDraw: null,
    selectedGame: null,
    schedule: {},
    rows: {},
  },
};

export const bracketEventSlice = createSlice({
  name: "bracketEvent",
  initialState,
  reducers: {
    setBracketEvent: (state, action: PayloadAction<ViewableBracketEvent>) => {
      state.bracket = action.payload;
    },
    setBracketEventRows: (state, action: PayloadAction<BracketRows>) => {
      if (!state.bracket) return;
      state.bracket.rows = {
        ...state.bracket.rows,
        ...action.payload,
      };
    },
    setSelectedGame: (
      state,
      action: PayloadAction<Nullable<BracketGameTypeg>>
    ) => {
      if (!state.bracket) return;
      state.bracket.selectedGame = action.payload;
    },
  },
});

export const getBracketEventBrackets = (state: RootState) =>
  state?.bracketEvent?.bracket?.brackets || [];
export const getBracketEventConnections = (state: RootState) =>
  state?.bracketEvent?.bracket?.connections || {};
export const getBracketEventDrawTimes = (state: RootState) =>
  state?.bracketEvent?.bracket?.drawTimes || {};
export const getBracketEventId = (state: RootState) =>
  state?.bracketEvent?.bracket?.id || null;
export const getBracketEventName = (state: RootState) =>
  state?.bracketEvent?.bracket?.name || "";
export const getBracketEventNumTeams = (state: RootState) =>
  state?.bracketEvent?.bracket?.numTeams || 16;
export const getBracketEventNumSheets = (state: RootState) =>
  state?.bracketEvent?.bracket?.numSheets || 8;
export const getBracketEventNumWinners = (state: RootState) =>
  state?.bracketEvent?.bracket?.numWinners || [];
export const getBracketEventReadableIdIndex = (state: RootState) =>
  state?.bracketEvent?.bracket?.readableIdIndex || {};
export const getBracketEventSchedule = (state: RootState) =>
  state?.bracketEvent?.bracket?.schedule || {};

export const getBracketEventSelectedDraw = (state: RootState) =>
  state?.bracketEvent?.bracket?.selectedDraw || null;
export const getBracketEventRows = (state: RootState) =>
  state?.bracketEvent?.bracket?.rows || {};

export const getSelectedGame = (state: RootState) =>
  state?.bracketEvent?.bracket?.selectedGame || null;

export const getReadableGameId = (state: RootState) => {
  return (gameId: string | null) => {
    if (!gameId) return "?";
    return state?.bracketEvent?.bracket?.readableIdIndex[gameId] || "?";
  };
};

export const { setBracketEvent, setBracketEventRows, setSelectedGame } =
  bracketEventSlice.actions;

export default bracketEventSlice.reducer;
