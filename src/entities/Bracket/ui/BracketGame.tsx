import "../lib/styles/game.css";
import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
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
  const { schedule } = useContext(BracketContext);
  const drawNum = schedule[game.id] || "?";
  return (
    <div
      className="w-[200px] flex flex-col text-white p-2 rounded-md game__container text-xs"
      id={"game-" + game.id}
      onClick={() => editGame(game)}
    >
      <div className="flex justify-between">
        <div>Draw {drawNum}</div>
        <div className="flex">{game.id}</div>
      </div>

      {connections.teams &&
        connections.teams.length &&
        connections.teams.map((team, index) => {
          return (
            <div className="flex justify-between " key={"team-" + index}>
              <BracketGameTeam team={team} />
              <div className="text-gray-300">0</div>
            </div>
          );
        })}
    </div>
  );
}
