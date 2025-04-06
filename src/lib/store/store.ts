/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import type { AppStore } from "./storeTypes";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { apiSlice } from "@/shared/api";
import { bracketManagerSlice } from "@/modules/bracket-manager/shared/store";

export const makeStore = (): AppStore => {
  const store = configureStore({
    reducer: {
      api: apiSlice.reducer,
      bracketManager: bracketManagerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoredPaths: ["orphanedState"],
        },
      }).concat(apiSlice.middleware),
  }) as AppStore;
  return store;
};

// Create a single store instance
let store: AppStore | undefined;

export const getStore = (): AppStore => {
  if (!store) {
    store = makeStore();
  }
  setupListeners(store.dispatch);
  return store;
};

export const useAppStore = () => getStore() as AppStore;
