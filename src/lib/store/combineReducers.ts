// src/lib/redux/tolerantCombineReducers.ts
import { Reducer, Action } from "@reduxjs/toolkit";

/**
 * Custom implementation of combineReducers that tolerates unknown keys
 * in the state. Instead of warning or throwing errors about unexpected keys,
 * it preserves them in the state.
 */
export default function tolerantCombineReducers<S>(reducers: {
  [K in keyof S]: Reducer<S[K], Action>;
}): Reducer<S, Action> {
  const reducerKeys = Object.keys(reducers) as Array<keyof S>;

  // Return a reducer that invokes every reducer inside the passed object
  return (state: S = {} as S, action: Action) => {
    // Create a new state object to avoid mutation
    const nextState: Partial<S> = {};
    let hasChanged = false;

    // First, add all the known reducer results
    for (const key of reducerKeys) {
      const reducer = reducers[key];
      // Get previous state for this key (or undefined)
      const previousStateForKey = state[key];
      // Get next state for this key
      const nextStateForKey = reducer(previousStateForKey, action);

      // Add to new state
      nextState[key] = nextStateForKey;
      // Track if anything changed
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    // Then preserve any unknown keys from the previous state
    for (const key in state) {
      if (!reducers.hasOwnProperty(key)) {
        // This key isn't handled by any reducer, so keep it as is
        nextState[key as keyof S] = state[key as keyof S];
      }
    }

    // If nothing changed and we preserved all keys, return previous state
    return hasChanged ||
      Object.keys(nextState).length !== Object.keys(state).length
      ? (nextState as S)
      : state;
  };
}
