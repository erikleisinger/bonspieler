// Optimized useLoadBracket hook with better skipping logic
import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch } from "@/lib/store";
import { setBrackets, setBracketStageInfo, setConnections } from "../store";
import { useBracketSelector } from "./useBracketSelector";
import { isBracketStageInitialized } from "../store";
import {
  useGetBracketConnectionsQuery,
  useGetBracketGamesQuery,
  useGetTournamentStageByIdQuery,
} from "@/shared/api";

export default function useLoadBracket({
  stageId,
  disabled,
}: {
  stageId: string;
  disabled: boolean;
}) {
  const dispatch = useAppDispatch();

  // Track whether we've already dispatched this data
  const dataDispatchedRef = useRef({
    brackets: false,
    connections: false,
    stageInfo: false,
  });

  // Reset the dispatch tracking when stageId changes
  useEffect(() => {
    dataDispatchedRef.current = {
      brackets: false,
      connections: false,
      stageInfo: false,
    };
  }, [stageId]);

  // Queries with improved skip logic
  const {
    isFetching: isLoadingStage,
    isSuccess: isSuccessStage,
    data: stageData,
  } = useGetTournamentStageByIdQuery(stageId, {
    skip: !!disabled || !stageId || dataDispatchedRef.current.stageInfo,
  });

  const {
    isFetching: isLoadingGames,
    isSuccess: isSuccessGames,
    data: gamesData,
  } = useGetBracketGamesQuery(stageId, {
    skip: !!disabled || !stageId || dataDispatchedRef.current.brackets,
  });

  const {
    isFetching: isLoadingConnections,
    isSuccess: isSuccessConnections,
    isError: isErrorConnections,
    data: connectionsData,
  } = useGetBracketConnectionsQuery(stageId, {
    skip: !!disabled || !stageId || dataDispatchedRef.current.connections,
  });

  // Dispatch effects with tracking to prevent repeated dispatches
  useEffect(() => {
    if (
      isSuccessGames &&
      gamesData &&
      stageId &&
      !dataDispatchedRef.current.brackets
    ) {
      dispatch(
        setBrackets({
          stageId,
          brackets: gamesData?.brackets ?? [],
        })
      );
      dataDispatchedRef.current.brackets = true;
    }
  }, [isSuccessGames, gamesData, stageId, dispatch]);

  useEffect(() => {
    if (
      !isErrorConnections &&
      isSuccessConnections &&
      connectionsData &&
      stageId &&
      !dataDispatchedRef.current.connections
    ) {
      dispatch(
        setConnections({
          stageId,
          winnerConnections: connectionsData?.winnerConnections ?? {},
          loserConnections: connectionsData?.loserConnections ?? {},
          originConnections: connectionsData?.originConnections ?? {},
        })
      );
      dataDispatchedRef.current.connections = true;
    }
  }, [
    isSuccessConnections,
    isErrorConnections,
    connectionsData,
    stageId,
    dispatch,
  ]);

  useEffect(() => {
    if (
      isSuccessStage &&
      stageData &&
      stageId &&
      !dataDispatchedRef.current.stageInfo
    ) {
      const {
        id,
        name = "",
        type = "bracket",
        order = 0,
        tournament_id,
      } = stageData;
      dispatch(
        setBracketStageInfo({
          stageId,
          id,
          name: name || "",
          type: type || "bracket",
          order: order || 0,
          tournamentId: tournament_id || "",
        })
      );
      dataDispatchedRef.current.stageInfo = true;
    }
  }, [isSuccessStage, stageData, stageId, dispatch]);

  // Status calculations
  const isLoading = useMemo(() => {
    return Boolean(
      stageId && (isLoadingStage || isLoadingGames || isLoadingConnections)
    );
  }, [isLoadingStage, isLoadingGames, isLoadingConnections, stageId]);

  return { isLoading };
}
