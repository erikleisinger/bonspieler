import type { BracketConnectionTeam } from "../lib";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
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
  const { readableIdIndex, scrollToGame } = useContext(BracketContext);
  const { lookingForLoserConnection } = useContext(BracketEditingContext);

  function getTeamInfo({ isWinner, gameId, teamId }: BracketConnectionTeam) {
    if (teamId) {
      return teamId;
    } else if (gameId) {
      return `${isWinner ? "Winner of " : "Loser of "}${
        readableIdIndex[gameId]
      }`;
    }
  }

  const isSeed = team?.teamId === "seed";

  const isGame = !!team?.gameId;

  function handleClick(e) {
    if (!team?.gameId) return;
    e.stopPropagation();
    if (onClick && typeof onClick === "function") {
      onClick(team.gameId);
    } else {
      if (lookingForLoserConnection) return;
      scrollToGame(team.gameId);
    }
  }

  return (
    <div
      onClick={handleClick}
      className={
        "flex justify-between bg-white/10 backdrop-blur-sm rounded-sm px-2 " +
        (isGame ? "hover:bg-white/80 cursor-pointer" : "") +
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
