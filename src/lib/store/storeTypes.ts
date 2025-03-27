/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { Reducer, EnhancedStore } from "@reduxjs/toolkit";
import { Persistor } from "redux-persist";
import type { BracketConnectionsStoreState } from "@/entities/Bracket/BracketGameConnections";
import type { DrawTimeStoreState } from "@/entities/DrawTime";
import type { TournamentStoreState } from "@/entities/Tournament";
import type { BracketEventStoreState } from "@/entities/BracketEvent";
import type { BracketGamesStoreState } from "@/entities/Bracket/BracketGame";
import type { BracketViewerStoreState } from "@/widgets/Bracket/BracketViewer";
import type { BracketEditorStoreState } from "@/widgets/Bracket/BracketEditor";
export interface AsyncReducers {
  [key: string]: Reducer;
}

export interface ModuleRefCounts {
  [key: string]: number;
}

export interface CoreState {
  api: any; // Replace with actual API state type
  // Add other core slices that are always present
}

export interface DynamicStateModules {
  bracketConnections?: BracketConnectionsStoreState;
  bracketGames?: BracketGamesStoreState;
  bracketViewer?: BracketViewerStoreState;
  bracketEditor?: BracketEditorStoreState;
  bracketEvent?: BracketEventStoreState;
  drawTime?: DrawTimeStoreState;
  tournament?: TournamentStoreState;
}

// This type will be used to augment the RootState
export type DynamicState = DynamicStateModules;

export interface AppStore extends EnhancedStore<CoreState & DynamicState> {
  asyncReducers: AsyncReducers;
  getInjectedReducers: () => string[];
  injectReducer: <K extends keyof DynamicStateModules>(
    key: K,
    reducer: Reducer<NonNullable<DynamicStateModules[K]>>,
    initialState?: Partial<NonNullable<DynamicStateModules[K]>>
  ) => AppStore | void;
  moduleRefCounts: ModuleRefCounts;
  removeReducer: <K extends keyof DynamicStateModules>(
    key: K
  ) => AppStore | void;
  forceCleanState: () => void;
  _persistor: Persistor;
}

export type RootState = ReturnType<AppStore["getState"]> & DynamicState;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
