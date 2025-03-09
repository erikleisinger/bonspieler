import { useContext } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";

export default function LoserIndicator({
  loserTo,
}: {
  loserTo: string | null;
}) {
  const { scrollToGame } = useContext(BracketContext);
  const { lookingForLoserConnection } = useContext(BracketEditingContext);

  const baseButtonStyles =
    "text-destructive  rounded-sm  bracket-game__loser-indicator ";

  function onClick(e) {
    if (!loserTo) return;
    if (lookingForLoserConnection) return;
    e.stopPropagation();
    scrollToGame(loserTo, {
      block: "center",
      inline: "center",
    });
  }

  return (
    <div className={baseButtonStyles} onClick={onClick}>
      Loser {loserTo || "out"}
    </div>
  );
}
