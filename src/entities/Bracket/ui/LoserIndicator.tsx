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
    "text-destructive-foreground px-1 rounded-sm -mt-[2px] bracket-game__loser-indicator bg-red-500/50";

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
