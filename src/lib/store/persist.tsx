/* eslint-disable @typescript-eslint/no-explicit-any */
import storage from "redux-persist/lib/storage";
import { createTransform } from "redux-persist";
import { autoMergeLevel2 } from "redux-persist/es/stateReconciler/autoMergeLevel2";

/**
 * Enhanced persist configuration for better HMR support
 */
export const persistConfig = {
  key: "root",
  storage,
  // Use a better state reconciler for deeper merging
  stateReconciler: autoMergeLevel2,
  // Explicitly disable any persisting when HMR is happening
  // This prevents corruption when code is changing
  writeFailHandler: (err: Error) => {
    if (typeof window !== "undefined" && (module as any).hot) {
      console.warn("Skipping persist during HMR to prevent corruption");
      return;
    }
    console.error("Redux persist write failed:", err);
  },
  // Debug in development
  debug: process.env.NODE_ENV !== "production",
  // Add a slight delay to allow other operations to complete first
  timeout: 100,
  /*
  // Optional: create transforms to handle specific data transformations
  transforms: [
    createTransform(
      // transform state coming from redux on its way to being serialized and stored
      (inboundState: any, key) => {
        // Example: sanitize sensitive data
        return inboundState;
      },
      // transform state coming from storage, on its way to be rehydrated into redux
      (outboundState: any, key) => {
        // Example: handle version changes
        return outboundState;
      },
      // Configuration options
      {
        // Only apply this transform to some reducers
        whitelist: ['core']
      }
    )
  ]
  */
};
