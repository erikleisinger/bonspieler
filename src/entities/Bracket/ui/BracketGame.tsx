import "../lib/styles/game.css";
import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import BracketGameTeam from "./BracketGameTeam";
import type { BracketConnection, BracketGame } from "../lib";

import { Button } from "@/shared/ui/button";
export default function BracketGame({
  game,
  connections,
}: {
  game: BracketGame;
  connections: BracketConnection;
}) {
  const { editGame, editing, removeWinnerConnection } = useContext(
    BracketEditingContext
  );
  const { schedule } = useContext(BracketContext);
  const drawNum = schedule[game.id] || "?";

  const hasWinner = connections.winnerTo;
  return (
    <div className="flex group game__container--outer">
      <div
        className={
          "w-[200px] flex flex-col text-white p-2 rounded-md game__container text-xs relative "
        }
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
      {editing && hasWinner && (
        <div className="relative w-7">
          <Button
            size="icon"
            variant="secondary"
            className="hidden hover:block group-hover:block bg-white hover:bg-black hover:text-white absolute h-6 w-6 top-0 bottom-0 m-auto left-1 z-10 pointer-events-auto"
            onClick={() => removeWinnerConnection(game.id)}
          >
            -
          </Button>
        </div>
      )}
      {editing && !hasWinner && (
        <div className="relative w-7">
          <Button
            size="icon"
            variant="secondary"
            className="hidden hover:block group-hover:block bg-white hover:bg-black hover:text-white absolute h-6 w-6 top-0 bottom-0 m-auto left-1 z-10 pointer-events-auto"
            onClick={() => removeWinnerConnection(game.id)}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
}
