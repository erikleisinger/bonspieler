import { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { tournamentReducer } from "@/entities/Tournament";
import { bracketEventReducer } from "@/entities/BracketEvent";
import { bracketConnectionsReducer } from "@/entities/Bracket/BracketGameConnections";
import { bracketGamesReducer } from "@/entities/Bracket/BracketGame";
import { drawTimeSlice } from "@/entities/DrawTime";

export const store = configureStore({
  reducer: {
    tournament: tournamentReducer,
    bracketEvent: bracketEventReducer,
    bracketConnections: bracketConnectionsReducer,
    bracketGames: bracketGamesReducer,
    drawTimes: drawTimeSlice.reducer,
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
