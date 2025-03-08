import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketGame } from "../lib";

export default function LoserIndicator({
  loserTo,
  game,
}: {
  loserTo: string | null;
  game: BracketGame;
}) {
  const { editing, lookingForLoserConnection, lookForLoserConnection } =
    useContext(BracketEditingContext);

  const baseButtonStyles =
    "text-white px-1 rounded-sm -mt-[2px] bracket-game__loser-indicator bg-red-500/50";

  const isChangable = editing && !lookingForLoserConnection;
  return (
    <div className={isChangable ? "group/loser" : ""}>
      <div className={baseButtonStyles + " group-hover/loser:hidden"}>
        Loser {loserTo || "out"}
      </div>
      <div
        className={
          baseButtonStyles +
          " hidden group-hover/loser:block hover:bg-red-500/70"
        }
        onClick={() =>
          lookForLoserConnection({
            gameId: game.id,
            bracketNumber: game.bracketNumber,
          })
        }
      >
        Change
      </div>
    </div>
  );
}
