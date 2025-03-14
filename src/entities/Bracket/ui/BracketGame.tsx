import "../lib/styles/game.scss";
import { useContext, useMemo, useEffect, useState, useRef } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import BracketGameTeam from "./BracketGameTeam";
import LoserIndicator from "./LoserIndicator";
import type { BracketConnection, BracketGame } from "../lib";

import { GAME_HEIGHT } from "../lib/constants/game";

export default function BracketGame({
  game,
  connections,
  elementId,
  selectable,
  className = "",
}: {
  game: BracketGame;
  connections: BracketConnection;

  elementId?: string;
  selectable?: boolean;
  className?: string;
}) {
  const {
    availableGames,
    lookingForWinnerConnection,
    lookingForLoserConnection,
    addLoserConnection,
    addWinnerConnection,
    selectedDraw,
  } = useContext(BracketEditingContext);
  const { readableIdIndex, selectedGame, selectGame, schedule } =
    useContext(BracketContext);

  const drawNum = schedule[game.id] || "?";

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
    } else if (selectedDraw && selectedDraw === drawNum) {
      base.push("selected");
    }
    return base.join(" ");
  }

  const teams = new Array(2)
    .fill({
      teamId: null,
      gameId: null,
      isWinner: false,
    })
    .map((e, i) => {
      if (connections?.teams[i]) return connections.teams[i];
      return e;
    });

  const firstUpdate = useRef(true);
  const [modified, setModified] = useState<"modified" | null>(null);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setModified("modified");
    setTimeout(() => {
      setModified(null);
    }, 1001);
  }, [drawNum, firstUpdate]);

  return (
    <div
      className={getClassName() + " " + modified}
      style={{
        height: GAME_HEIGHT + "px",
      }}
    >
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
          {teams.map((team, index) => {
            return (
              <BracketGameTeam
                team={team}
                key={"team-" + index}
                className="grow"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
