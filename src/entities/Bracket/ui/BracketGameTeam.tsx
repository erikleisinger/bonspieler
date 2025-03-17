import type { BracketConnectionTeam } from "../lib";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { useAppSelector } from "@/lib/store";
import { getTournamentTeams } from "@/entities/Tournament";
import { useContext } from "react";
import { FaSeedling } from "react-icons/fa";
export default function BracketGameTeam({
  className,
  showSeed = true,
  team,
}: {
  className?: string;
  showSeed: boolean;
  team: BracketConnectionTeam;
}) {
  const tournamentTeams = useAppSelector(getTournamentTeams);
  const { readableIdIndex } = useContext(BracketContext);

  function getTeamInfo({ isWinner, gameId, teamId }: BracketConnectionTeam) {
    if (teamId) {
      return tournamentTeams.find(({ id }) => id === teamId)?.name || "Unknown";
    } else if (gameId) {
      return `${isWinner ? "Winner of " : "Loser of "}${
        readableIdIndex[gameId]
      }`;
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
      {isSeed && showSeed && <FaSeedling className="text-emerald-500" />}
      {!isSeed && <div>{getTeamInfo(team)}</div>}
      {isSeed && !showSeed && <div className="text-muted">Seed</div>}

      <div className="text-gray-300">0</div>
    </div>
  );
}
