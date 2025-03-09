import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { useContext } from "react";
import { Button } from "@/shared/ui/button";
import { HiCog } from "react-icons/hi";
export default function GameEditOptions() {
  const { lookForLoserConnection, removeLoserConnection } = useContext(
    BracketEditingContext
  );

  const { brackets, connections, selectedGame } = useContext(BracketContext);

  const isLastBracket =
    (brackets?.length || 1) - 1 === selectedGame?.bracketNumber;

  const gameConnections = connections[selectedGame?.id];
  const loserTo = gameConnections?.loserTo;

  return (
    <div>
      <div className="flex gap-2 items-center p-2 py-4 px-4 bg-black/20">
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
    </div>
  );
}
