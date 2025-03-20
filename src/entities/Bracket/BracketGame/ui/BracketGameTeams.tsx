import type { OriginConnection } from "@/entities/Bracket/BracketGameConnections";
import BracketGameTeam from "./BracketGameTeam";
export default function BracketGameTeams({
  readableId,
  originConnections,
  isSeed,
}: {
  readableId: string;
  originConnections: OriginConnection[];
  isSeed: boolean;
}) {
  const atLeastTwoConnections = new Array(2)
    .fill({
      gameId: null,
      isWinner: false,
    })
    .map((e, i) => {
      if (originConnections[i]) return originConnections[i];
      return e;
    });

  return (
    <div className="mt-2 flex flex-col gap-1">
      {atLeastTwoConnections.map((connection, index) => {
        return (
          <BracketGameTeam
            connection={connection}
            key={"team-" + index}
            readableId={readableId}
            className="grow"
            isSeed={isSeed}
          />
        );
      })}
    </div>
  );
}
