import { useMemo } from "react";
import {
  useGetBracketGamesQuery,
  useGetBracketConnectionsQuery,
} from "@/shared/api";
import { generateReadableIdIndex } from "@/shared/utils/bracket";
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

  const readableIdIndex = useMemo(() => {
    return generateReadableIdIndex(brackets);
  }, [brackets]);

  return (
    <BracketContext.Provider
      value={{
        originConnections,
        winnerConnections,
        loserConnections,
        brackets,
        schedule,
        loading: isFetching,
        readableIdIndex,
        stageId,
      }}
    >
      {!isFetching && children}
    </BracketContext.Provider>
  );
}
