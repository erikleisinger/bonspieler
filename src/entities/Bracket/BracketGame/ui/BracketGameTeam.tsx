import { useContext } from "react";
import { TournamentStageContext } from "@/shared/TournamentStage";
import type { BracketConnectionTeam } from "../../types";
import { useAppSelector } from "@/lib/store";
import { getTournamentTeams } from "@/entities/Tournament";
import { getReadableGameId } from "@/entities/BracketEvent";
import { FaSeedling, FaRunning } from "react-icons/fa";
export default function BracketGameTeam({
  className,
  team,
}: {
  className?: string;
  team: BracketConnectionTeam;
}) {
  const { prevStageName } = useContext(TournamentStageContext);
  const tournamentTeams = useAppSelector(getTournamentTeams);
  const readableId = useAppSelector(getReadableGameId)(team.gameId);
  function getTeamInfo({ isWinner, gameId, teamId }: BracketConnectionTeam) {
    if (isSeed) {
      if (!prevStageName) {
        return tournamentTeams.find(({ id }) => id === teamId)?.name || "";
      } else {
        return "From " + prevStageName;
      }
    }
    if (teamId) {
      return tournamentTeams.find(({ id }) => id === teamId)?.name || "Unknown";
    } else if (gameId) {
      return `${isWinner ? "Winner of " : "Loser of "}${readableId}`;
    }
  }

  const isSeed = team?.teamId === "seed";

  return (
    <div
      className={
        "flex justify-between bg-white/10 backdrop-blur-sm rounded-sm px-2 " +
        className
      }
    >
      <div className="flex gap-2 items-center">
        {isSeed &&
          (prevStageName ? (
            <FaRunning className="text-indigo-500" />
          ) : (
            <FaSeedling className="text-emerald-500" />
          ))}
        <div>{getTeamInfo(team)}</div>
      </div>

      <div className="text-gray-300">0</div>
    </div>
  );
}
