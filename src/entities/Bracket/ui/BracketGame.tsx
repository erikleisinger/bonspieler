import "../lib/styles/game.scss";
import { useContext, useMemo } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import BracketGameTeam from "./BracketGameTeam";
import LoserIndicator from "./LoserIndicator";
import type { BracketConnection, BracketGame } from "../lib";
import GameConnectionHypothesis from "./GameConnectionHypothesis";
import { Button } from "@/shared/ui/button";

export default function BracketGame({
  game,
  connections,
  gameIndex,
  editing,
  elementId,
  selectable,
  className = "",
  onTeamClick,
}: {
  game: BracketGame;
  connections: BracketConnection;
  gameIndex?: number;
  editing?: boolean;
  elementId?: string;
  selectable?: boolean;
  className?: string;
  onTeamClick?: (gameId: string) => void;
}) {
  const {
    availableGames,
    lookingForWinnerConnection,
    lookingForLoserConnection,
    addLoserConnection,
    addWinnerConnection,
    removeWinnerConnection,
    lookForWinnerConnection,
  } = useContext(BracketEditingContext);
  const { readableIdIndex, selectedGame, selectGame, schedule } =
    useContext(BracketContext);

  const drawNum = schedule[game.id] || "?";

  const hasWinner = connections?.winnerTo;

  const isSelected = selectable && selectedGame?.id === game.id;

  const isAvailable = useMemo(() => {
    return availableGames.includes(game.id);
  }, [availableGames, game.id]);
  function onClick(e) {
    if (lookingForWinnerConnection?.gameId) {
      if (!isAvailable) return;
      addWinnerConnection(game.id);
    } else if (lookingForLoserConnection) {
      if (!isAvailable) return;
      addLoserConnection(game.id);
      e.stopPropagation();
    } else {
      selectGame(game);
    }
  }

  function getClassName() {
    const base = [
      "BRACKET_GAME flex group game__container--outer ",
      className,
      " ",
    ];
    if (lookingForWinnerConnection && isAvailable) {
      base.push("available");
    } else if (lookingForWinnerConnection) {
      base.push("unavailable");
    } else if (lookingForLoserConnection && isAvailable) {
      base.push("available");
    } else if (lookingForLoserConnection) {
      base.push("unavailable");
    } else if (isSelected) {
      base.push("selected");
    }
    return base.join(" ");
  }

  return (
    <div className={getClassName()}>
      <div
        className={
          " flex flex-col text-foreground p-2  game__container  relative bg-glass text-glass-foreground backdrop-blur shadow-sm " +
          className
        }
        id={elementId}
        onClick={onClick}
      >
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="flex">{readableIdIndex[game.id]}</div>
            <div className="text-muted">Draw {drawNum}</div>
          </div>
          <div>
            <LoserIndicator
              loserTo={connections?.loserTo || null}
              game={game}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          {connections?.teams &&
            connections.teams.length &&
            connections.teams.map((team, index) => {
              return (
                <BracketGameTeam
                  team={team}
                  key={"team-" + index}
                  onClick={onTeamClick}
                />
              );
            })}
        </div>
        {lookingForWinnerConnection &&
          lookingForWinnerConnection.gameId === game.id && (
            <div className="absolute right-0 top-0 bottom-0  m-auto h-full ">
              <GameConnectionHypothesis />
            </div>
          )}
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
