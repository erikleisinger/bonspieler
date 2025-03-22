/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { Reducer } from "@reduxjs/toolkit";
import { useAppStore } from "@/lib/store";
import LoaderFullPage from "../ui/loader-full-page";

interface SliceConfig {
  name: string;
  reducer: Reducer;
  initialState?: any;
}

interface StoreLoaderProps {
  slices: SliceConfig[];
  children: React.ReactNode;
  debugMode?: boolean;
}

/**
 * A component that dynamically loads and unloads multiple Redux slices
 * with proper reference counting and error handling
 */
export default function StoreLoader({
  slices = [],
  children,
}: StoreLoaderProps) {
  const store = useAppStore();
  const [loaded, setLoaded] = useState(false);
  const mountedSlicesRef = useRef(new Set<string>());

  // Create a stable slices dependency
  const sliceNames = slices.map((s) => s.name).join(",");

  useEffect(() => {
    if (!store.moduleRefCounts) {
      store.moduleRefCounts = {};
    }

    // Keep track of which slices we're mounting in this instance
    const currentMountedSlices = new Set<string>();

    // Load all slices
    slices.forEach((slice) => {
      const { name, reducer, initialState } = slice;

      // Initialize or increment the reference counter
      store.moduleRefCounts[name] = (store.moduleRefCounts[name] || 0) + 1;

      // Track that we mounted this slice
      currentMountedSlices.add(name);
      mountedSlicesRef.current.add(name);

      // Only inject if this is the first reference
      if (store.moduleRefCounts[name] === 1) {
        // Check if the store has the enhanced injectReducer with initialState
        if (store.injectReducer.length >= 3) {
          store.injectReducer(name, reducer, initialState);
        } else {
          // Fallback for stores without initialState support
          store.injectReducer(name, reducer);

          // Apply initial state if provided
          if (initialState) {
            store.dispatch({
              type: `${name}/initialize`,
              payload: initialState,
            });
          }
        }
      }
    });

    // Mark as loaded after slices are injected
    setLoaded(true);

    // Cleanup function to run on unmount
    return () => {
      // Only decrement counters for slices we actually mounted
      currentMountedSlices.forEach((name) => {
        // Protect against negative reference counts
        if (store.moduleRefCounts[name] > 0) {
          store.moduleRefCounts[name] -= 1;

          // Remove reducer when ref count reaches zero
          if (store.moduleRefCounts[name] === 0) {
            store.removeReducer(name);
          }
        }

        // Remove from our mounted set
        mountedSlicesRef.current.delete(name);
      });
    };
  }, [store, sliceNames, debugMode, slices]);

  return <>{loaded ? children : <LoaderFullPage />}</>;
}
