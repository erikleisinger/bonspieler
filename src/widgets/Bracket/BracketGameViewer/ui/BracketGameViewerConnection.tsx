import { BracketGameType } from "@/entities/Bracket";
import { FaTrophy, FaHeartBroken } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getBracketEventConnections,
  setSelectedGame,
  getReadableGameId,
} from "@/entities/BracketEvent";
export default function BracketGameViewerConnection({
  game,
  isWinner = false,
  isLoser = false,
}: {
  game: BracketGameType;
  isWinner?: boolean;
  isLoser?: boolean;
}) {
  const dispatch = useAppDispatch();
  const gameConnection = useAppSelector(getBracketEventConnections)[game.id];
  const readableId = useAppSelector(getReadableGameId)(
    isWinner ? gameConnection.winnerTo : gameConnection.loserTo
  );

  function icon() {
    if (isLoser) {
      return <FaHeartBroken className="text-red-500 text-xl" />;
    }
    if (isWinner) {
      return <FaTrophy className="text-amber-500 text-xl" />;
    }
  }

  function text() {
    if (isLoser) {
      if (readableId) {
        return readableId;
      }
      return "Out";
    }
    if (isWinner) {
      if (readableId) {
        return readableId;
      }
      return "Advances";
    }
  }

  function onClick() {
    if (isLoser && !gameConnection.loserTo) return;
    if (isWinner && !gameConnection.winnerTo) return;
    dispatch(
      setSelectedGame(
        isLoser ? gameConnection.loserTo : gameConnection.winnerTo
      )
    );
  }

  return (
    <div
      className="flex gap-4 items-center rounded-md hover:bg-white/50 p-2 cursor-pointer"
      onClick={onClick}
    >
      {icon()}

      <div>
        <div className="text-xs text-muted">{isLoser ? "Loser" : "Winner"}</div>
        <div className="text-xl font-semibold ">{text()}</div>
      </div>
    </div>
  );
}
