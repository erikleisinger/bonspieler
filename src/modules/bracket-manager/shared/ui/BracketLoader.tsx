// Optimized BracketLoader with memoization
import { useEffect, memo, useRef } from "react";
import { useLoadBracket } from "@/modules/bracket-manager/shared/hooks";
import LoaderFullPage from "@/shared/ui/loader-full-page";
import {
  useBracketDispatch,
  useBracketSelector,
} from "@/modules/bracket-manager/shared/hooks";

import {
  initBracketEvent,
  doesBracketStageExist,
  isBracketStageInitialized,
} from "../store";

const BracketLoader = memo(function BracketLoader({
  children,
  stageId,
}: {
  children?: React.ReactNode;
  stageId: string;
}) {
  const dispatch = useBracketDispatch();

  const alreadyExists = useBracketSelector(doesBracketStageExist);
  const isInitialized = useBracketSelector(isBracketStageInitialized);

  const initialized = useRef(isInitialized);
  // Use layout effect to prioritize initialization before children render
  useEffect(() => {
    if (alreadyExists) return;
    // Consider implementing an "initialized" flag in your state
    // to prevent repeated initialization
    dispatch(initBracketEvent, { stageId });
  }, [stageId, dispatch, alreadyExists]);

  const { isLoading } = useLoadBracket({
    stageId,
    disabled: !!initialized.current,
  });

  // Use persistent references for both branches to avoid recreating elements
  if (isLoading) {
    return <LoaderFullPage />;
  }

  return <>{children}</>;
});

export default BracketLoader;
