import { BracketGame as BracketGameType } from "@/modules/bracket-manager/shared/types";
import CustomTooltip from "@/shared/ui/custom-tooltip";
import {
  GAME_ELEMENT_ID_PREFIX,
  BRACKET_GAME,
} from "../lib/constants/element-id";
import { cn } from "@/lib/utils";
import { useBracketSelector } from "@/modules/bracket-manager/shared/hooks";
import { useAppSelector } from "@/lib/store";
import {
  getLoserConnectionForGame,
  getWinnerConnectionForGame,
  getOriginConnectionsForGame,
  isLookingForNextStageConnectionForGame,
  isLookingForNextStageConnection,
  doesGameAcceptPrevStage,
  isLookingForNextStageConnectionAnywhere,
  isConnectionMode,
  getReadableId,
} from "@/modules/bracket-manager/shared/store";

import { StageContext } from "@/modules/bracket-manager/shared/lib/context";
import BracketGame from "./BracketGame";
import { BracketContext } from "../lib/context/BracketContext";
import { useContext } from "react";
import { getRowSpanForGame } from "../lib";
export default function BracketGameMini({
  game,
  onClick,
}: {
  game: BracketGameType;
  onClick?: (game: BracketGameType) => void;
}) {
  const { rows = {} } = useContext(BracketContext);
  const rowSpan = getRowSpanForGame(rows[game.id]);

  const showConnections = useAppSelector(isConnectionMode);
  const readableId = useAppSelector((state) => getReadableId(state, game.id));
  const { stageId } = useContext(StageContext);
  const loserConnection = useBracketSelector(
    getLoserConnectionForGame,
    game.id
  );
  const winnerConnection = useBracketSelector(
    getWinnerConnectionForGame,
    game.id
  );

  const originConnections = useBracketSelector(
    getOriginConnectionsForGame,
    game.id
  );

  const lookingForNextStageConnection = useAppSelector(
    isLookingForNextStageConnectionAnywhere
  );

  const gameLookingFor = useAppSelector((state) =>
    isLookingForNextStageConnection(state, stageId)
  );

  const availableAsNextStage = useAppSelector((state) =>
    doesGameAcceptPrevStage(state, game.stageId, game.id)
  );

  function bg() {
    if (!showConnections) return "bg-indigo-500/50";
    if (lookingForNextStageConnection) {
      if (gameLookingFor?.id === game.id) return "bg-indigo-500/50";
      if (!availableAsNextStage) return "bg-gray-500/50";
      return "bg-emerald-500 transition-all hover:bg-amber-500 hover:scale-120";
    }
    if (!winnerConnection?.gameId) return "bg-amber-500";
    if (!!winnerConnection?.stageId) return "bg-indigo-500/50";
    return "bg-indigo-500/50";
  }

  function handleClick() {
    if (!onClick) return;
    onClick(game);
  }

  return (
    <CustomTooltip
      className="bg-transparent text-glass-foreground pr-4"
      tooltip={<BracketGame game={game} />}
      side="right"
    >
      <div
        id={GAME_ELEMENT_ID_PREFIX + game.id}
        className={cn(
          BRACKET_GAME,
          " w-[24px] h-[12px] py-[1px] rounded-xl hover:z-50 flex items-center justify-center",
          bg(),
          onClick && "cursor-pointer"
        )}
        onClick={handleClick}
        style={{
          ...rowSpan,
        }}
      >
        <div className="text-xs font-bold text-white">
          {showConnections && readableId}
        </div>
      </div>
    </CustomTooltip>
  );
}
