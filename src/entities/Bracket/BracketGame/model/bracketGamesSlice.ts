import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BracketGameType, BracketSchedule } from "@/entities/Bracket";
import type { Nullable } from "@/shared/types";
import type { RootState } from "@/lib/store";
import * as thunks from "./thunks";
import { numberToLetter } from "@/shared/utils/numberToLetter";
import { generateReadableIdIndex } from "@/shared/Bracket/generateReadableIdIndex";

function resetGameBracketNumbers(brackets: BracketGameType[][][]) {
  return [...brackets].map((rounds, bracketIndex) => {
    let numGamesThisBracket = 0;
    return rounds.map((games) =>
      games.map((game) => {
        numGamesThisBracket += 1;
        return {
          ...game,
          bracketNumber: bracketIndex,
          readableId: `${numberToLetter(
            bracketIndex + 1
          )}${numGamesThisBracket}`,
        };
      })
    );
  });
}

export interface BracketGamesStoreState {
  brackets: BracketGameType[][][];
  schedule: BracketSchedule;
  stageId: Nullable<string>;
  readableIdIndex: {
    [gameId: string]: string;
  };
}

function defaultState() {
  return {
    brackets: [],
    schedule: {},
    stageId: null,
    readableIdIndex: {},
  };
}

const initialState: BracketGamesStoreState = defaultState();

export const bracketGamesSlice = createSlice({
  name: "bracketGames",
  initialState,
  reducers: {
    removeBracket(state, action: PayloadAction<number>) {
      let newBrackets = [...state.brackets];
      newBrackets.splice(action.payload, 1);
      newBrackets = resetGameBracketNumbers(newBrackets);
      state.brackets = newBrackets;
      state.readableIdIndex = generateReadableIdIndex(newBrackets);
    },
    resetState(state) {
      state.brackets = defaultState().brackets;
      state.schedule = defaultState().schedule;
    },
    setBracketGames: (state, action: PayloadAction<BracketGameType[][][]>) => {
      if (
        !!state.brackets?.length &&
        state.brackets.length < action.payload?.length
      ) {
        console.warn(
          "Cannot add bracket games when it already exists. use updateBracketGames instead, or first call resetState"
        );
        return;
      }
      const newBrackets = resetGameBracketNumbers(action.payload);
      state.brackets = newBrackets;
      state.readableIdIndex = generateReadableIdIndex(newBrackets);
    },
    updateBracketGames: (
      state,
      action: PayloadAction<{
        index: number;
        brackets: BracketGameType[][];
      }>
    ) => {
      const { index = 0, brackets } = action.payload;
      let newBrackets = [...state.brackets];
      newBrackets.splice(index, 0, brackets);
      newBrackets = resetGameBracketNumbers(newBrackets);
      state.brackets = newBrackets;
      state.readableIdIndex = generateReadableIdIndex(newBrackets);
    },

    setBracketGamesSchedule: (
      state,
      action: PayloadAction<BracketSchedule>
    ) => {
      state.schedule = action.payload;
    },
  },
});

export const getBracketEventGamesStageId = (state: RootState) =>
  state.bracketGames.stageId;

const getBracketGamesState = (state: RootState) => state.bracketGames;

export const getBracketGames = createSelector(
  [getBracketGamesState],
  (bracketGamesState) => {
    return bracketGamesState?.brackets || [];
  }
);

export const getReadableIdIndex = createSelector(
  [getBracketGamesState],
  (bracketGamesState) => {
    return bracketGamesState?.readableIdIndex || {};
  }
);

export const getGamesForBracket = createSelector(
  [getBracketGames, (state, bracketIndex: number) => bracketIndex],
  (brackets, bracketIndex) => {
    return (brackets[bracketIndex] || []).flat();
  }
);

export const getBracketGamesSchedule = (state: RootState) => {
  return state.bracketGames.schedule;
};

export const getDrawNumberForGame = createSelector(
  [getBracketGamesSchedule, (state, gameId: string) => gameId],
  (schedule, gameId) => {
    return schedule[gameId] || null;
  }
);

export const getBracketByIndex = createSelector(
  [getBracketGames, (state, bracketIndex: number) => bracketIndex],
  (brackets, bracketIndex) => {
    return brackets[bracketIndex];
  }
);

export const {
  removeBracket,
  setBracketGames,
  setBracketGamesSchedule,

  updateBracketGames,
  resetState,
} = bracketGamesSlice.actions;

export const initBracketGames = thunks.initBracketGames;
export const addBracketGames = thunks.addBracketGames;
export const removeBracketGames = thunks.removeBracketGames;

export default bracketGamesSlice.reducer;
