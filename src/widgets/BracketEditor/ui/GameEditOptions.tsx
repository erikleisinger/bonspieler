import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { useContext, useEffect } from "react";
import { Button } from "@/shared/ui/button";

export default function GameEditOptions() {
  function onKeyDown(e) {
    if (e.key === "Delete") handleRemoveGame(e);
  }
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  const { lookForLoserConnection, removeLoserConnection, removeGameFromRound } =
    useContext(BracketEditingContext);

  const { brackets, connections, selectedGame, deselectGame } =
    useContext(BracketContext);

  const isLastBracket =
    (brackets?.length || 1) - 1 === selectedGame?.bracketNumber;

  const gameConnections = connections[selectedGame?.id];
  const loserTo = gameConnections?.loserTo;

  function handleRemoveGame(e) {
    const { id, bracketNumber, roundNumber } = { ...selectedGame };
    deselectGame(e.nativeEvent, true);
    removeGameFromRound({
      gameId: id,
      bracketNumber,
      roundNumber,
    });
  }

  return (
    <div className="grid grid-rows-1 pb-4">
      <div className="flex justify-center items-end">
        <Button
          className="w-[300px]"
          variant="destructive"
          onClick={handleRemoveGame}
        >
          Delete game
        </Button>
      </div>
    </div>
  );
}
