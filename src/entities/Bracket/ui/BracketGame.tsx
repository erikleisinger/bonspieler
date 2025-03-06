import "../lib/styles/game.css";
import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import BracketGameTeam from "./BracketGameTeam";
import type { BracketConnection, BracketGame } from "../lib";
export default function BracketGame({
  game,
  connections,
}: {
  game: BracketGame;
  connections: BracketConnection;
}) {
  const { editGame } = useContext(BracketEditingContext);

  return (
    <div
      className="w-[200px] flex flex-col text-white p-2 rounded-md game__container text-xs"
      id={"game-" + game.id}
      onClick={() => editGame(game)}
    >
      <div className="flex justify-between">
        <div>Draw 1</div>
        <div className="flex">{game.id}</div>
      </div>

      {connections.teams.map((team, index) => {
        return (
          <div className="flex justify-between" key={"team-" + index}>
            <BracketGameTeam team={team} />
            <div className="text-gray-300">0</div>
          </div>
        );
      })}
    </div>
  );
}
