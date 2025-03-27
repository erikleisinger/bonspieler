import type { OriginConnection } from "@/entities/Bracket/BracketGameConnections";
import BracketGameTeam from "./BracketGameTeam";
export default function BracketGameTeams({
  originConnections,
  isSeed,
}: {
  readableId: string;
  originConnections: OriginConnection[];
  isSeed: boolean;
}) {
  return (
    <div className="mt-2 flex flex-col gap-1">
      {originConnections.map((connection, index) => {
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
