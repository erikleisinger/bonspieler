import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { useContext, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { HiCog } from "react-icons/hi";

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
    <div>
      <div className="flex gap-2 items-center p-2 py-4 px-4 ">
        <HiCog className="text-3xl" />
        <div className="flex text-2xl">Settings</div>
      </div>
      {selectedGame?.id && (
        <div className="p-4">
          {!isLastBracket && (
            <Button
              variant="destructive"
              size="lg"
              onClick={() =>
                lookForLoserConnection({
                  gameId: selectedGame.id,
                  bracketNumber: selectedGame.bracketNumber,
                })
              }
            >
              Update loser
            </Button>
          )}
          {loserTo && (
            <Button
              variant="destructive"
              size="lg"
              onClick={() => removeLoserConnection(selectedGame.id)}
            >
              Remove loser
            </Button>
          )}
        </div>
      )}
      <div className="flex justify-center">
        <Button variant="destructive" onClick={handleRemoveGame}>
          Delete
        </Button>
      </div>
    </div>
  );
}
