/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useCallback } from "react";
import { useAppSelector } from "@/lib/store";
import { StageContext } from "../lib/context";
import { RootState } from "@/lib/store";

// Create a custom hook that provides automatic stageId scoping
export function useBracketSelector<TResult>(
  selectorFn: (state: RootState, stageId: string, ...args: any[]) => TResult,
  ...args: any[]
): TResult {
  const { stageId } = useContext(StageContext);

  // Create a memoized selector function that includes the stageId
  const scopedSelector = useCallback(
    (state: RootState) => selectorFn(state, stageId, ...args),
    [selectorFn, stageId, ...args]
  );

  // Use the scoped selector with useAppSelector
  return useAppSelector(scopedSelector);
}
