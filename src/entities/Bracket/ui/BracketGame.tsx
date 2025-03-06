import "../lib/styles/game.css";
import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
export default function BracketGame({ game, connections }) {
  const { editGame } = useContext(BracketEditingContext);
  function getClassName() {
    const base = [
      "w-[300px] flex flex-col text-white p-2 rounded-md game__container ",
    ];

    return base.join(" ");
  }

  function getTeamInfo({ isWinner, gameId, teamId }) {
    if (!gameId) {
      return "Team " + teamId.substr(teamId.length - 5);
    } else {
      return `${isWinner ? "Winner of " : "Loser of "}${gameId.substr(
        gameId.length - 5
      )}`;
    }
  }
  return (
    <div className={getClassName()} id={"game-" + game.id}>
      <div className="flex justify-between">
        <div>Draw 1</div>
        <div>{game.id.substr(game.id.length - 5)}</div>
      </div>

      {connections.teams.map((team, index) => {
        return (
          <div
            className="flex justify-between"
            key={"team-" + index}
            onClick={() => editGame(game)}
          >
            {getTeamInfo(team)}
            <div className="text-gray-300">0</div>
          </div>
        );
      })}
    </div>
  );
}
