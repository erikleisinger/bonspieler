import "../lib/styles/game.scss";
import { useContext, useMemo } from "react";
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
  const {
    editing,
    lookingForWinnerConnection,
    addWinnerConnection,
    removeWinnerConnection,
    lookForWinnerConnection,
  } = useContext(BracketEditingContext);
  const { schedule } = useContext(BracketContext);
  const drawNum = schedule[game.id] || "?";

  const hasWinner = connections.winnerTo;

  const isAvailable = useMemo(() => {
    if (!lookingForWinnerConnection?.gameId) return false;
    const teams = (connections?.teams || []).filter(
      ({ gameId, teamId }) => !!gameId || !!teamId
    );
    if (teams?.length >= 2) return false;
    if (lookingForWinnerConnection.bracketNumber !== game.bracketNumber)
      return false;
    if (lookingForWinnerConnection.roundNumber + 1 !== game.roundNumber)
      return false;
    return (
      lookingForWinnerConnection?.gameId &&
      game.id !== lookingForWinnerConnection.gameId
    );
  }, [
    lookingForWinnerConnection?.bracketNumber,
    lookingForWinnerConnection?.gameId,
    lookingForWinnerConnection?.roundNumber,
    game.roundNumber,
    game.id,
    game.bracketNumber,
    connections.teams,
  ]);

  function onClick() {
    if (!isAvailable || !lookingForWinnerConnection?.gameId) return;
    if (lookingForWinnerConnection?.gameId && isAvailable)
      addWinnerConnection(game.id);
  }

  function getClassName() {
    const base = ["BRACKET_GAME flex group game__container--outer"];
    if (lookingForWinnerConnection && isAvailable) {
      base.push("available");
    } else if (lookingForWinnerConnection) {
      base.push("unavailable");
    }
    return base.join(" ");
  }

  return (
    <div className={getClassName()}>
      <div
        className={
          "w-[200px] flex flex-col text-white p-2 rounded-md game__container text-xs relative "
        }
        id={"game-" + game.id}
        onClick={onClick}
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
      {editing && hasWinner && !lookingForWinnerConnection && (
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
      {editing && !hasWinner && !lookingForWinnerConnection && (
        <div className="relative w-7">
          <Button
            size="icon"
            variant="secondary"
            className="hidden hover:block group-hover:block bg-white hover:bg-black hover:text-white absolute h-6 w-6 top-0 bottom-0 m-auto left-1 z-10 pointer-events-auto"
            onClick={() =>
              lookForWinnerConnection(
                game.id,
                game.bracketNumber,
                game.roundNumber
              )
            }
          >
            +
          </Button>
        </div>
      )}
      {lookingForWinnerConnection && <div className="w-7" />}
    </div>
  );
}
