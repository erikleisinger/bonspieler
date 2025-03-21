import "./game.scss";
import { useEffect, useState, useRef, useContext } from "react";
import BracketGameTeams from "./BracketGameTeams";
import BracketGameHeader from "./BracketGameHeader";
import type { BracketGame, BracketRow } from "../../types";
import { GAME_ELEMENT_ID_PREFIX } from "../../lib/constants/element-id";
import { getRowSpanForGame } from "../lib/getRowSpanForGame";
import { useAppSelector } from "@/lib/store";
import { getSelectedDraw } from "@/entities/BracketEvent";
import { GAME_HEIGHT } from "../../lib/constants/game";
import BracketGameFinalResult from "./BracketGameFinalResult";
import { GameAvailabilityContext } from "@/shared/Bracket/GameAvailabilityContext";
import type { OriginConnection } from "@/entities/Bracket/BracketGameConnections";
import { Nullable } from "@/shared/types";

export default function BracketGame({
  game,
  winnerConnection,
  loserConnection,
  originConnections,
  className = "",
  drawNumber,
  onClick = () => {},
  readableId,
  rows,
  selected,
}: {
  game: BracketGame;

  className?: string;
  drawNumber: number;
  onClick?: (game: BracketGame) => void;
  readableId: string;
  rows: BracketRow;
  selected: boolean;
  winnerConnection: Nullable<string>;
  loserConnection: Nullable<string>;
  originConnections: OriginConnection[];
}) {
  const selectedDraw = useAppSelector(getSelectedDraw);
  const { availableGameIds } = useContext(GameAvailabilityContext);
  const isAvailable = availableGameIds.includes(game.id);

  function getClassName() {
    const base = [
      "BRACKET_GAME flex group game__container--outer relative ",
      className || "",
      " ",
    ];
    if (isAvailable) {
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

  const isFinal = !winnerConnection;

  function handleClick(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    onClick(game);
  }

  return (
    <div
      key={game.id}
      className="flex flex-col justify-center BRACKET_GAME"
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
            onMouseDown={handleClick}
          >
            <BracketGameHeader
              readableId={readableId}
              drawNumber={drawNumber}
              loserTo={loserConnection}
            />

            <BracketGameTeams
              originConnections={originConnections}
              isSeed={game.isSeed}
              readableId={readableId}
            />
            {isFinal && <BracketGameFinalResult />}
          </div>
        </div>
      </div>
    </div>
  );
}
