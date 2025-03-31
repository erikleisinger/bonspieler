import "./game.scss";
import { useEffect, useState, useRef } from "react";
import BracketGameTeams from "./BracketGameTeams";
import BracketGameHeader from "./BracketGameHeader";
import type { BracketGame } from "../../types";
import { GAME_ELEMENT_ID_PREFIX } from "../../lib/constants/element-id";
import { GAME_HEIGHT } from "../../lib/constants/game";
import type {
  OriginConnection,
  DestinationConnection,
} from "@/entities/Bracket/BracketGameConnections";
import { cn } from "@/lib/utils";

export default function BracketGame({
  available,
  background = false,
  className = "",
  drawNumber,
  game,
  loserConnection,
  onClick,
  originConnections,
  selected,
  scale,
}: {
  available?: boolean;
  background?: boolean;
  className?: string;
  drawNumber: number;
  game: BracketGame;
  loserConnection: DestinationConnection;
  onClick?: (game: BracketGame) => void;
  originConnections: OriginConnection[];
  selected: boolean;
  scale: number;
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

  function handleClick(e: MouseEvent<HTMLElement>) {
    if (!onClick) return;
    e.stopPropagation();
    onClick(game);
  }

  return (
    <div
      className={cn(
        "flex flex-col justify-center BRACKET_GAME",
        background && "opacity-50"
      )}
      style={{
        transform: `scale(${scale}) `,
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
            className={cn(
              "flex flex-col text-foreground p-2  game__container  relative bg-glass text-glass-foreground backdrop-blur-sm shadow-sm",
              onClick && "cursor-pointer",
              className
            )}
            id={GAME_ELEMENT_ID_PREFIX + game.id}
            onMouseDown={handleClick}
          >
            <BracketGameHeader
              readableId={game.readableId}
              drawNumber={drawNumber}
              loserTo={loserConnection.gameId}
            />

            <BracketGameTeams
              originConnections={originConnections}
              isSeed={game.isSeed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
