/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore, Reducer, EnhancedStore } from "@reduxjs/toolkit";
import combineReducers from "./combineReducers";
import { useStore } from "react-redux";
import { coreSlice } from "./coreSlice";

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
}

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

// Special action types
const FORCE_STATE_CLEANUP = "@@redux/FORCE_STATE_CLEANUP";
const REDUCER_REMOVED = "@@redux/REDUCER_REMOVED";

export const makeStore = (): AppStore => {
  // Create the enhanced root reducer
  const createEnhancedRootReducer = (asyncReducers: AsyncReducers = {}) => {
    // First, create the normal combined reducer
    const combinedReducer = combineReducers({
      core: coreSlice.reducer,
      ...asyncReducers,
    });

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
          ignoredActions: [FORCE_STATE_CLEANUP, REDUCER_REMOVED],
          ignoredPaths: ["orphanedState"],
        },
      }),
  }) as AppStore;

  // Add custom properties
  store.asyncReducers = {};
  store.moduleRefCounts = {};

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

export const useAppStore = () => useStore<RootState>() as AppStore;
