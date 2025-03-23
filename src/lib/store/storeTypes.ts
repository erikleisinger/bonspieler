/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { Reducer, EnhancedStore } from "@reduxjs/toolkit";
import { Persistor } from "redux-persist";

export interface AsyncReducers {
  [key: string]: Reducer;
}

export interface ModuleRefCounts {
  [key: string]: number;
}

export interface AppStore extends EnhancedStore {
  asyncReducers: AsyncReducers;
  getInjectedReducers: () => string[];
  injectReducer: (
    key: string,
    reducer: Reducer,
    initialState?: any
  ) => AppStore | void;
  moduleRefCounts: ModuleRefCounts;
  removeReducer: (key: string) => AppStore | void;
  forceCleanState: () => void;
  _persistor: Persistor;
  _lastAction?: Action; // Track the last action dispatched
}

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
