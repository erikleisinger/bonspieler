"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import { Nullable } from "../types";

// Redux provider component for Next.js App Router
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use useRef to ensure the store persists across re-renders
  const storeRef = useRef<Nullable<AppStore>>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
