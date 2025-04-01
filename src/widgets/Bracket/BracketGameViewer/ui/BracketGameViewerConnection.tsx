import type { Nullable } from "@/shared/types";
import { FaTrophy, FaHeartBroken } from "react-icons/fa";
import { DestinationConnection } from "@/entities/Bracket/BracketGameConnections";
import { useContext } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
export default function BracketGameViewerConnection({
  connection,
  isWinner = false,
  isLoser = false,
  onClick,
}: {
  connection: Nullable<DestinationConnection>;
  isWinner?: boolean;
  isLoser?: boolean;
  onClick?: (connection?: DestinationConnection) => void;
}) {
  const { readableIdIndex } = useContext(BracketContext);
  const connectionReadableId = !connection?.gameId
    ? null
    : readableIdIndex[connection?.gameId];

  function icon() {
    if (isLoser) {
      return <FaHeartBroken className="text-red-500 text-xl" />;
    }
    if (isWinner) {
      return <FaTrophy className="text-amber-500 text-xl" />;
    }
  }

  function text() {
    if (isLoser) {
      if (connectionReadableId) {
        return connectionReadableId;
      }
      return "Out";
    }
    if (isWinner) {
      if (connectionReadableId) {
        return connectionReadableId;
      }
      return "Advances";
    }
  }

  function handleClick() {
    if (!connection) return;
    if (!onClick) return;
    onClick(connection);
  }

  return (
    <div
      className="flex gap-4 items-center rounded-md hover:bg-white/50 p-2 cursor-pointer"
      onClick={handleClick}
    >
      {icon()}

      <div>
        <div className="text-xs text-muted">{isLoser ? "Loser" : "Winner"}</div>
        <div className="text-xl font-semibold ">{text()}</div>
      </div>
    </div>
  );
}
