import "./game.scss";
import { useEffect, useState, useRef } from "react";
import BracketGameTeams from "./BracketGameTeams";
import BracketGameHeader from "./BracketGameHeader";
import type { BracketGame, BracketRow } from "../../types";
import { GAME_ELEMENT_ID_PREFIX } from "../../lib/constants/element-id";
import { getRowSpanForGame } from "../lib/getRowSpanForGame";
import { GAME_HEIGHT } from "../../lib/constants/game";
import type { OriginConnection } from "@/entities/Bracket/BracketGameConnections";
import { Nullable } from "@/shared/types";

export default function BracketGame({
  available,
  children,
  className = "",
  drawNumber,
  game,
  loserConnection,
  onClick = () => {},
  originConnections,
  readableId,
  rows,
  selected,
  winnerConnection,
}: {
  available?: boolean;
  children?: React.ReactNode;
  className?: string;
  drawNumber: number;
  game: BracketGame;
  loserConnection: Nullable<string>;
  onClick?: (game: BracketGame) => void;
  originConnections: OriginConnection[];
  readableId: string;
  rows: BracketRow;
  selected: boolean;
  winnerConnection: Nullable<string>;
}) {
  function getClassName() {
    const base = [
      "BRACKET_GAME flex group game__container--outer relative ",
      className || "",
      " ",
    ];
    if (available) {
      base.push("available");
    } else if (selected) {
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
              " flex flex-col text-foreground p-2  game__container  relative bg-glass text-glass-foreground backdrop-blur-sm shadow-sm " +
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
            {isFinal && children}
          </div>
        </div>
      </div>
    </div>
  );
}
