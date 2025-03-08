import type { BracketConnectionTeam } from "../lib";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { useContext } from "react";
export default function BracketGameTeam({
  team,
}: {
  team: BracketConnectionTeam;
}) {
  const { scrollToGame } = useContext(BracketContext);
  function getTeamInfo({ isWinner, gameId, teamId }: BracketConnectionTeam) {
    if (teamId) {
      return teamId;
    } else if (gameId) {
      return `${isWinner ? "Winner of " : "Loser of "}${gameId}`;
    }
  }

  const isGame = !!team?.gameId;

  function onClick() {
    if (!team?.gameId) return;
    scrollToGame(team.gameId);
  }

  return (
    <div
      onClick={onClick}
      className={
        "flex justify-between bg-black/10 px-2 " +
        (isGame ? "hover:bg-black/20 cursor-pointer" : "")
      }
    >
      <div>{getTeamInfo(team)}</div>
      <div className="text-gray-300">0</div>
    </div>
  );
}
