import { useMemo, useEffect } from "react";
import {
  useGetBracketGamesQuery,
  useGetBracketConnectionsQuery,
} from "@/shared/api";
import { BracketContext } from "./BracketContext";
export default function BracketProvider({
  children,
  stageId,
}: {
  children: React.ReactNode;
  stageId: string;
}) {
  const { data: connections, isFetching: isFetchingConnections } =
    useGetBracketConnectionsQuery(stageId, {
      skip: !stageId,
    });

  const { data: bracketData, isFetching: isFetchingGames } =
    useGetBracketGamesQuery(stageId, {
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

  const isFetching = useMemo(() => {
    return isFetchingConnections || isFetchingGames;
  }, [isFetchingConnections, isFetchingGames]);

  return (
    <BracketContext.Provider
      value={{
        originConnections,
        winnerConnections,
        loserConnections,
        brackets,
        schedule,
        loading: isFetching,
        stageId,
      }}
    >
      {!isFetching && children}
    </BracketContext.Provider>
  );
}
