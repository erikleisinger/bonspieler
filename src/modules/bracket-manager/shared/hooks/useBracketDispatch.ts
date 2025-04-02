import { useContext, useCallback } from "react";
import { useAppDispatch } from "@/lib/store";
import { StageContext } from "../lib/context";

// Create a custom hook that provides automatic stageId scoping for dispatching actions
export function useBracketDispatch() {
  const dispatch = useAppDispatch();
  const { stageId } = useContext(StageContext);

  // Return a scoped dispatch function that automatically injects the stageId
  return useCallback(
    (actionCreator: Function, args: any) => {
      // If the action creator expects stageId as the first parameter
      return dispatch(actionCreator({ stageId, ...args }));
    },
    [dispatch, stageId]
  );
}
