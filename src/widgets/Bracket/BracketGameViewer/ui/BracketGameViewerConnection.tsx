import type { Nullable } from "@/shared/types";
import { FaTrophy, FaHeartBroken } from "react-icons/fa";
import { useAppDispatch } from "@/lib/store";
import { setSelectedGame } from "@/widgets/Bracket/BracketViewer";
import { DestinationConnection } from "@/entities/Bracket/BracketGameConnections";
export default function BracketGameViewerConnection({
  connection,
  isWinner = false,
  isLoser = false,
}: {
  connection: Nullable<DestinationConnection>;
  isWinner?: boolean;
  isLoser?: boolean;
}) {
  const dispatch = useAppDispatch();

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
      if (connection?.readableId) {
        return connection?.readableId;
      }
      return "Out";
    }
    if (isWinner) {
      if (connection?.readableId) {
        return connection?.readableId;
      }
      return "Advances";
    }
  }

  function onClick() {
    if (!connection) return;
    dispatch(setSelectedGame(connection));
  }

  return (
    <div
      className="flex gap-4 items-center rounded-md hover:bg-white/50 p-2 cursor-pointer"
      onClick={onClick}
    >
      {icon()}

      <div>
        <div className="text-xs text-muted">{isLoser ? "Loser" : "Winner"}</div>
        <div className="text-xl font-semibold ">{text()}</div>
      </div>
    </div>
  );
}
