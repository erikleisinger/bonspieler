import "./game.scss";
import BracketGameTeams from "@/modules/bracket-manager/shared/ui/BracketGameTeams";
import type { BracketGame } from "../../../shared/types";
import {
  GAME_ELEMENT_ID_PREFIX,
  BRACKET_GAME,
} from "../lib/constants/element-id";

import { cn } from "@/lib/utils";
import { GAME_PADDING } from "../lib/constants/style";
import { useBracketSelector } from "@/modules/bracket-manager/shared/hooks";
import {
  isGameSelected,
  isGameAvailable,
} from "@/modules/bracket-manager/shared/store/selectors";

export function BracketGame({
  background = false,
  game,
  onClick,
}: {
  background?: boolean;
  className?: string;
  drawNumber: number;
  game: BracketGame;
  onClick?: (game: BracketGame) => void;
}) {
  const selected = useBracketSelector(isGameSelected, game.id);
  const available = useBracketSelector(isGameAvailable, game.id);

  function handleClick() {
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
          padding: `${GAME_PADDING}px 0`,
        }}
      >
        <BracketGameTeams gameId={game.id} isSeed={game.isSeed} />
      </div>
    </div>
  );
}
