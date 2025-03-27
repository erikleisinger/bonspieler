/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Provider } from "react-redux";
import { getStore } from "@/lib/store";

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * Main provider component that ensures a consistent store instance is used
 * throughout the application
 */
export default function AppProvider({ children }: AppProviderProps) {
  // Get the singleton store instance
  const store = getStore();

  return <Provider store={store}>{children}</Provider>;
}
