import { FaSeedling, FaRunning } from "react-icons/fa";
import { OriginConnection } from "@/modules/bracket-manager/shared/types/Connections";
import { cn } from "@/lib/utils";

import { useAppSelector } from "@/lib/store";
import { getReadableId } from "@/modules/bracket-manager/shared/store";

export default function BracketGameTeam({
  className = "",
  connection,
}: {
  className?: string;
  connection: OriginConnection;
}) {
  const readableId = useAppSelector((state) =>
    getReadableId(state, connection.gameId)
  );
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-2 bg-white/10 backdrop-blur-sm rounded-sm px-2",
        className
      )}
    >
      {!readableId ? (
        <FaSeedling className="text-emerald-500" />
      ) : connection?.stageId ? (
        <FaRunning className="text-indigo-500" />
      ) : (
        <div />
      )}
      {readableId ? (
        <div className="whitespace-nowrap overflow-hidden min-w-0 text-ellipsis italic">
          {connection?.isWinner ? "Winner of " : "Loser of "} {readableId}{" "}
          {connection?.stageName || ""}
        </div>
      ) : (
        <div className="text-muted">Seed</div>
      )}

      <div className="text-gray-300">0</div>
    </div>
  );
}
