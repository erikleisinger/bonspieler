import "./game.scss";
import { useContext, useMemo, useEffect, useState, useRef } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import BracketGameTeams from "./BracketGameTeams";
import BracketGameHeader from "./BracketGameHeader";
import type { BracketConnection, BracketGame, BracketRow } from "../../types";
import { GAME_ELEMENT_ID_PREFIX } from "../../lib/constants/element-id";
import { getRowSpanForGame } from "../lib/getRowSpanForGame";

import { GAME_HEIGHT } from "../../lib/constants/game";
import BracketGameFinalResult from "./BracketGameFinalResult";

export default function BracketGame({
  game,
  connections,

  className = "",
  drawNumber,
  nextStageName,
  onClick = () => {},
  readableId,
  rows,
  selected,
}: {
  game: BracketGame;
  connections: BracketConnection;
  className?: string;
  drawNumber: number;
  onClick?: (game: BracketGame) => void;
  nextStageName: string;
  readableId: string;
  rows: BracketRow;
  selected: boolean;
}) {
  const { availableGames, selectedDraw } = useContext(BracketEditingContext);

  const isAvailable = useMemo(() => {
    return availableGames.includes(game.id);
  }, [availableGames, game.id]);

  // function onClick(e) {
  //   if (lookingForWinnerConnection?.gameId) {
  //     if (!isAvailable) return;0
  //     addWinnerConnection(game.id);
  //   } else if (lookingForLoserConnection) {
  //     if (!isAvailable) return;
  //     addLoserConnection(game.id);
  //     e.stopPropagation();
  //   } else if (lookingToAssignTeam) {
  //     assignTeamToGame({ gameId: game.id });
  //   } else {
  //     selectGame(game);
  //   }
  // }

  function getClassName() {
    const base = [
      "BRACKET_GAME flex group game__container--outer relative ",
      className || "",
      " ",
    ];
    if (availableGames.includes(game.id)) {
      base.push("available");
    } else if (selected) {
      base.push("selected");
    } else if (selectedDraw && selectedDraw === drawNumber) {
      base.push("selected");
    }
    return base.join(" ");
  }

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
  }, [drawNumber, firstUpdate]);

  const isFinal = !connections?.winnerTo;

  return (
    <div
      key={game.id}
      className="flex flex-col justify-center "
      style={{
        ...getRowSpanForGame(rows),
      }}
    >
      <div className="py-4 flex text-xs pointer-events-auto relative">
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
            id={GAME_ELEMENT_ID_PREFIX + game.id}
            onClick={() => onClick(game)}
          >
            <BracketGameHeader
              readableId={readableId}
              drawNumber={drawNumber}
              loserTo={connections?.loserTo || null}
            />

            <BracketGameTeams
              teams={connections?.teams || []}
              readableId={readableId}
            />
            {isFinal && (
              <BracketGameFinalResult nextStageName={nextStageName} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
