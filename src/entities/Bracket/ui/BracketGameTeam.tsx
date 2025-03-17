import type { BracketConnectionTeam } from "../lib";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { TournamentContext } from "@/entities/Tournament/lib";
import { useContext } from "react";
import { FaSeedling } from "react-icons/fa";
export default function BracketGameTeam({
  className,
  onClick,
  showSeed = true,
  team,
}: {
  className?: string;
  onClick?: (gameId: string) => void;
  showSeed: boolean;
  team: BracketConnectionTeam;
}) {
  const { teams: tournamentTeams } = useContext(TournamentContext);
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
