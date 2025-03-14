import { useContext } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";

export default function LoserIndicator({
  loserTo,
}: {
  loserTo: string | null;
}) {
  const { readableIdIndex } = useContext(BracketContext);

  const baseButtonStyles =
    "text-destructive  rounded-sm  bracket-game__loser-indicator ";

  return (
    <div className={baseButtonStyles}>
      Loser {loserTo ? readableIdIndex[loserTo] : "out"}
    </div>
  );
}
