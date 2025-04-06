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
  getLoserConnectionForGame,
} from "@/modules/bracket-manager/shared/store/selectors";
import { FaHeartBroken } from "react-icons/fa";
import { Tooltip } from "@/shared/ui/tooltip";
import { getRowSpanForGame } from "../lib";
import { BracketContext } from "../lib/context/BracketContext";
import { useContext } from "react";

export default function BracketGame({
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
  const { rows = {} } = useContext(BracketContext);
  const rowSpan = getRowSpanForGame(rows[game.id]);
  const selected = useBracketSelector(isGameSelected, game.id);
  const available = useBracketSelector(isGameAvailable, game.id);
  const loserConnection = useBracketSelector(
    getLoserConnectionForGame,
    game.id
  );

  function handleClick() {
    if (!onClick) return;

    onClick(game);
  }

  return (
    <div
      className={cn(
        "grid grid-cols-[30px,1fr] transition-all",
        background ? "w-[30px]" : " w-[220px]"
      )}
      style={{
        ...rowSpan,
      }}
      id={GAME_ELEMENT_ID_PREFIX + game.id}
    >
      <div
        className={cn(
          "h-fit w-fit m-auto flex items-center justify-center m-auto  rounded-xl z-10  text-xs font-bold text-primary",
          background &&
            "bg-primary/80 px-2 text-[0.6rem] text-white min-w-[16px] min-h-[12px] "
        )}
      >
        {!background && <div>{game.readableId}</div>}
      </div>
      {!background && (
        <div
          onClick={handleClick}
          className={cn(
            BRACKET_GAME,
            " text-xs pointer-events-auto relative shadow-md  bg-glass backdrop-blur-sm game__container",
            background ? "min-w-[50px]" : "min-w-[200px]",
            onClick && "cursor-pointer",
            available && "available",
            selected && "selected"
          )}
          style={{
            padding: `${GAME_PADDING}px 0`,
          }}
        >
          {!loserConnection?.gameId && (
            <div className="absolute right-0 top-0 bottom-0 m-auto z-50 h-fit translate-x-[50%]">
              <Tooltip text="Loser eliminated">
                <FaHeartBroken className="text-red-500" />
              </Tooltip>
            </div>
          )}
          <BracketGameTeams gameId={game.id} isSeed={game.isSeed} />
        </div>
      )}
    </div>
  );
}
