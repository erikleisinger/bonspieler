import type { Nullable } from "@/shared/types";
import { FaTrophy, FaHeartBroken } from "react-icons/fa";
import { DestinationConnection } from "@/modules/bracket-manager/shared/types";
import { useBracketSelector } from "@/modules/bracket-manager/shared/hooks";
import { useAppSelector } from "@/lib/store";
import { getReadableId } from "@/modules/bracket-manager/shared/store";
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
  const readableId = useAppSelector((state) =>
    getReadableId(state, connection?.gameId)
  );

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
      if (readableId) {
        return readableId;
      }
      return "Out";
    }
    if (isWinner) {
      if (readableId) {
        return readableId;
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
