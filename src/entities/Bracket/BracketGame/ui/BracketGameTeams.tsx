import type { OriginConnection } from "@/entities/Bracket/BracketGameConnections";
import BracketGameTeam from "./BracketGameTeam";
import { useMemo } from "react";
export default function BracketGameTeams({
  originConnections,
  isSeed,
}: {
  originConnections: OriginConnection[];
  isSeed: boolean;
}) {
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
            isSeed={isSeed}
          />
        );
      })}
    </div>
  );
}
