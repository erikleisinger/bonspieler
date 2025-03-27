/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import combineReducers from "./combineReducers";
import type { AppStore, AsyncReducers } from "./storeTypes";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "@/shared/api";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["api"], // Don't persist api
};

const apiPersistConfig = {
  key: "api",
  storage,
  blacklist: ["subscriptions", "config"], // Don't persist subscriptions or runtime config
};

// Special action types
const FORCE_STATE_CLEANUP = "@@redux/FORCE_STATE_CLEANUP";
const REDUCER_REMOVED = "@@redux/REDUCER_REMOVED";

export const makeStore = (): AppStore => {
  // Create the enhanced root reducer
  const createEnhancedRootReducer = (asyncReducers: AsyncReducers = {}) => {
    // First, create the normal combined reducer
    const combinedReducer = persistReducer(
      persistConfig,
      combineReducers({
        api: persistReducer(apiPersistConfig, apiSlice.reducer),
        ...asyncReducers,
      })
    );

    // Return an enhanced reducer that can handle cleanup
    return (state: any, action: any) => {
      // Handle our special cleanup action
      if (action.type === FORCE_STATE_CLEANUP) {
        // Get list of valid reducers
        const validKeys = ["core", ...Object.keys(asyncReducers)];

        if (state) {
          // Find keys in state that aren't in validKeys
          const stateKeys = Object.keys(state);
          const orphanedKeys = stateKeys.filter(
            (key) => !validKeys.includes(key)
          );

          if (orphanedKeys.length > 0) {
            // Create a clean state with only valid keys
            const cleanState: any = {};
            validKeys.forEach((key) => {
              if (state[key]) {
                cleanState[key] = state[key];
              }
            });

            // Use the clean state
            return combinedReducer(cleanState, action);
          }
        }
      }

      // Handle reducer removal action
      if (action.type === REDUCER_REMOVED && action.payload) {
        const { key } = action.payload;

        // Create a new state without the removed slice
        if (state && state[key]) {
          const newState = { ...state };
          delete newState[key];
          return combinedReducer(newState, { type: "@@redux/INIT" });
        }
      }

      // Normal reducer behavior
      return combinedReducer(state, action);
    };
  };

  // Create the store
  const store = configureStore({
    reducer: createEnhancedRootReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FORCE_STATE_CLEANUP,
            REDUCER_REMOVED,
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
          ],
          ignoredPaths: ["orphanedState"],
        },
      }).concat(apiSlice.middleware),
  }) as AppStore;

  // Add custom properties
  store.asyncReducers = {};
  store.moduleRefCounts = {};

  // Create the persistor and attach it to the store
  store._persistor = persistStore(store);

  // Force cleanup of state
  store.forceCleanState = () => {
    store.dispatch({ type: FORCE_STATE_CLEANUP });
  };

  // Add method to inject a reducer with optional initial state
  store.injectReducer = (key, reducer, initialState) => {
    // Skip if already injected
    if (store.asyncReducers[key]) return;

    // Add the reducer
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createEnhancedRootReducer(store.asyncReducers));

    // Apply initial state if provided
    if (initialState) {
      store.dispatch({ type: `${key}/initialize`, payload: initialState });
    }

    return store;
  };

  // Add method to remove a reducer and its state
  store.removeReducer = (key) => {
    if (!store.asyncReducers[key]) {
      // Even if not in asyncReducers, we'll try to clean it from state
      // if it somehow exists there (which can happen in race conditions)
      store.dispatch({
        type: REDUCER_REMOVED,
        payload: { key },
      });

      // Also force a global state cleanup just to be sure
      store.forceCleanState();

      return;
    }

    // Remove from our tracking
    delete store.asyncReducers[key];

    // Dispatch a special action that will remove this slice from state
    store.dispatch({
      type: REDUCER_REMOVED,
      payload: { key },
    });

    // Update the root reducer
    store.replaceReducer(createEnhancedRootReducer(store.asyncReducers));

    return store;
  };

  store.getInjectedReducers = () => Object.keys(store.asyncReducers);

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
