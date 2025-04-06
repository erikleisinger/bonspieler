import { useBracketSelector } from "@/modules/bracket-manager/shared/hooks";
import { getWinnerConnectionForGame } from "@/modules/bracket-manager/shared/store";
import Xarrow from "react-xarrows";
export default function GameConnection2({ gameId }: { gameId: string }) {
  const winnerConnection = useBracketSelector(
    getWinnerConnectionForGame,
    gameId
  );

  return (
    <Xarrow
      showXarrow={!!winnerConnection?.gameId && !winnerConnection?.stageId}
      start={"BRACKET-GAME-" + gameId}
      end={"BRACKET-GAME-" + winnerConnection?.gameId}
      headSize={1}
      strokeWidth={2}
      path="grid"
    />
  );
}
