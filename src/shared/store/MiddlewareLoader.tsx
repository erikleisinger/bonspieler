"use client";

import { useEffect, useRef } from "react";
import { Middleware } from "@reduxjs/toolkit";
import { useAppStore } from "@/lib/store";

interface MiddlewareLoaderProps {
  middlewareKey: string;
  middleware: Middleware;
  children: React.ReactNode;
}

/**
 * A component that dynamically loads and unloads Redux middleware
 */
export default function MiddlewareLoader({
  middlewareKey,
  middleware,
  children,
}: MiddlewareLoaderProps) {
  const store = useAppStore();
  const isInjected = useRef(false);

  useEffect(() => {
    // Inject middleware if not already injected
    if (!isInjected.current) {
      store.injectMiddleware(middlewareKey, middleware);
      isInjected.current = true;
    }

    // Cleanup on unmount
    return () => {
      if (isInjected.current) {
        store.removeMiddleware(middlewareKey);
        isInjected.current = false;
      }
    };
  }, [store, middlewareKey, middleware]);

  return <>{children}</>;
}
