import "../lib/styles/game.scss";
import { useContext, useMemo } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import BracketGameTeam from "./BracketGameTeam";
import LoserIndicator from "./LoserIndicator";
import type { BracketConnection, BracketGame } from "../lib";

import { Button } from "@/shared/ui/button";
export default function BracketGame({
  game,
  connections,
  gameIndex: gameIndex,
}: {
  game: BracketGame;
  connections: BracketConnection;
  gameIndex: number;
}) {
  const {
    availableGames,
    editing,
    lookingForWinnerConnection,
    lookingForLoserConnection,
    addLoserConnection,
    addWinnerConnection,
    removeWinnerConnection,
    lookForWinnerConnection,
  } = useContext(BracketEditingContext);
  const { schedule } = useContext(BracketContext);

  const drawNum = schedule[game.id] || "?";

  const hasWinner = connections.winnerTo;

  const isAvailable = useMemo(() => {
    return availableGames.includes(game.id);
  }, [availableGames]);
  function onClick() {
    if (!isAvailable) return;
    if (lookingForWinnerConnection?.gameId) addWinnerConnection(game.id);
    // make add loser connection function
    if (lookingForLoserConnection) addLoserConnection(game.id);
  }

  function getClassName() {
    const base = ["BRACKET_GAME flex group game__container--outer"];
    if (lookingForWinnerConnection && isAvailable) {
      base.push("available");
    } else if (lookingForWinnerConnection) {
      base.push("unavailable");
    } else if (lookingForLoserConnection && isAvailable) {
      base.push("available");
    } else if (lookingForLoserConnection) {
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
          <div className="flex gap-2">
            <div className="flex">{game.id}</div>
            <div className="text-gray-200">Draw {drawNum}</div>
          </div>
          <div>
            <LoserIndicator
              loserTo={connections?.loserTo || null}
              game={game}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          {connections.teams &&
            connections.teams.length &&
            connections.teams.map((team, index) => {
              return (
                <div
                  className="flex justify-between bg-black/5"
                  key={"team-" + index}
                >
                  <BracketGameTeam team={team} />
                  <div className="text-gray-300">0</div>
                </div>
              );
            })}
        </div>
      </div>
      {editing &&
        hasWinner &&
        !lookingForWinnerConnection &&
        !lookingForLoserConnection && (
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
      {editing &&
        !hasWinner &&
        !lookingForWinnerConnection &&
        !lookingForLoserConnection && (
          <div className="relative w-7">
            <Button
              size="icon"
              variant="secondary"
              className="hidden hover:block group-hover:block bg-white hover:bg-black hover:text-white absolute h-6 w-6 top-0 bottom-0 m-auto left-1 z-10 pointer-events-auto"
              onClick={() =>
                lookForWinnerConnection(
                  game.id,
                  gameIndex,
                  game.bracketNumber,
                  game.roundNumber
                )
              }
            >
              +
            </Button>
          </div>
        )}

      {(lookingForWinnerConnection || lookingForLoserConnection) && (
        <div className="w-7" />
      )}
    </div>
  );
}
