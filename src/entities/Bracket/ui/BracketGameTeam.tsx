import type { BracketConnectionTeam } from "../lib";
export default function BracketGameTeam({
  team,
}: {
  team: BracketConnectionTeam;
}) {
  function getTeamInfo({ isWinner, gameId, teamId }: BracketConnectionTeam) {
    if (teamId) {
      return teamId;
    } else if (gameId) {
      return `${isWinner ? "Winner of " : "Loser of "}${gameId}`;
    }
  }

  return <div>{getTeamInfo(team)}</div>;
}
