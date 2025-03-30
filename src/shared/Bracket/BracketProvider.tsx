import { useMemo } from "react";
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

  return (
    <BracketContext.Provider
      value={{
        originConnections,
        winnerConnections,
        loserConnections,
        brackets,
        schedule,
        loading: isFetchingConnections || isFetchingGames,
        stageId,
      }}
    >
      {children}
    </BracketContext.Provider>
  );
}
