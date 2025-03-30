"use client";
import { useMemo, useEffect } from "react";
import {
  useGetBracketGamesQuery,
  useGetBracketConnectionsQuery,
} from "@/shared/api";
import {
  generateReadableIdIndex,
  generateGameIndex,
} from "@/entities/Bracket/BracketGame";

export default function useBracket(stageId: string) {
  const { data: connections, isFetching: isFetchingConnections } =
    useGetBracketConnectionsQuery(stageId, {
      refetchOnMountOrArgChange: true,
      skip: !stageId,
    });

  const { data: bracketData, isFetching: isFetchingGames } =
    useGetBracketGamesQuery(stageId, {
      refetchOnMountOrArgChange: true,

      skip: !stageId,
    });

  const originConnections = useMemo(() => {
    return connections?.originConnections || {};
  }, [connections]);

  const winnerConnections = useMemo(() => {
    return connections?.winnerConnections || {};
  }, [connections]);

  const loserConnections = useMemo(() => {
    return connections?.loserConnections || {};
  }, [connections]);

  const schedule = useMemo(() => {
    return connections?.schedule || {};
  }, [connections]);

  const brackets = useMemo(() => {
    return bracketData?.brackets || [];
  }, [bracketData]);

  const { readableIdIndex } = useMemo(() => {
    const { brackets = [] } = bracketData || {};
    return {
      readableIdIndex: generateReadableIdIndex(brackets),
      gameIndex: generateGameIndex(brackets),
    };
  }, [bracketData]);

  return {
    originConnections,
    winnerConnections,
    loserConnections,
    schedule,
    brackets,
    readableIdIndex,
    loading: isFetchingConnections || isFetchingGames,
  };
}
