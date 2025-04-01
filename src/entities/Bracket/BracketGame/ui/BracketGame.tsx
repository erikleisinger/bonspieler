import "./game.scss";
import { useEffect, useState, useRef } from "react";
import BracketGameTeams from "./BracketGameTeams";
import BracketGameHeader from "./BracketGameHeader";
import type { BracketGame } from "../../types";
import { GAME_ELEMENT_ID_PREFIX } from "../../lib/constants/element-id";
import type {
  OriginConnection,
  DestinationConnection,
} from "@/entities/Bracket/BracketGameConnections";
import { cn } from "@/lib/utils";
import { BRACKET_GAME } from "../../lib/constants/element-id";
import { GAME_PADDING } from "../../lib/constants/style";

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
  function handleClick(e: MouseEvent<HTMLElement>) {
    if (!onClick) return;

    onClick(game);
  }

  return (
    <div
      className="grid grid-cols-[30px,1fr] w-[220px]"
      id={GAME_ELEMENT_ID_PREFIX + game.id}
    >
      <div className="h-fit w-fit m-auto flex items-center justify-center m-auto  rounded-xl z-10  text-xs font-bold">
        <div>{game.readableId}</div>
      </div>
      <div
        onClick={handleClick}
        className={cn(
          BRACKET_GAME,
          " text-xs pointer-events-auto relative shadow-md min-w-[200px] bg-glass backdrop-blur-sm game__container",
          background && "opacity-50",
          onClick && "cursor-pointer",
          available && "available",
          selected && "selected"
        )}
        style={{
          transform: `scale(${scale}) `,
          padding: `${GAME_PADDING}px 0`,
        }}
      >
        <BracketGameTeams
          originConnections={originConnections}
          isSeed={game.isSeed}
        />
      </div>
    </div>
  );
}
