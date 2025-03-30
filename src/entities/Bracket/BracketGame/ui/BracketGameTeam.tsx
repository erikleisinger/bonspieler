import type { BracketConnectionTeam } from "../../types";
import { FaSeedling, FaRunning } from "react-icons/fa";
import { OriginConnection } from "../../BracketGameConnections";
export default function BracketGameTeam({
  className,
  connection,
  isSeed,
}: {
  className?: string;
  connection: OriginConnection;
  isSeed: boolean;
}) {
  const prevStageName = "";

  return (
    <div
      className={
        "grid grid-cols-[auto_1fr_auto] gap-2 bg-white/10 backdrop-blur-sm rounded-sm px-2 " +
        className
      }
    >
      {!connection?.readableId ? (
        <FaSeedling className="text-emerald-500" />
      ) : connection.stageName ? (
        <FaRunning className="text-indigo-500" />
      ) : (
        <div />
      )}
      {connection.readableId ? (
        <div className="whitespace-nowrap overflow-hidden min-w-0 text-ellipsis">
          {connection?.isWinner ? "Winner " : "Loser"} {connection?.readableId}{" "}
          {connection?.stageName || ""}
        </div>
      ) : (
        <div />
      )}

      <div className="text-gray-300">0</div>
    </div>
  );
}
