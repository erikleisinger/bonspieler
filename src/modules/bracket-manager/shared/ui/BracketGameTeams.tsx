import BracketGameTeam from "./BracketGameTeam";
import { useMemo } from "react";
import { useBracketSelector } from "@/modules/bracket-manager/shared/hooks";
import { getOriginConnectionsForGame } from "@/modules/bracket-manager/shared/store";
export default function BracketGameTeams({ gameId }: { gameId: string }) {
  const originConnections = useBracketSelector(
    getOriginConnectionsForGame,
    gameId
  );
  const origins = useMemo(() => {
    return Array.from({ length: 2 }).map(
      (_, i) => originConnections[i] || { gameId: null }
    );
  }, [originConnections]);
  return (
    <div className=" flex flex-col gap-1">
      {origins.map((connection, index) => {
        return (
          <BracketGameTeam
            connection={connection}
            key={"team-" + index}
            className="grow"
          />
        );
      })}
    </div>
  );
}
