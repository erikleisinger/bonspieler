import { useAppSelector } from "@/lib/store";
import { getReadableGameId } from "@/entities/Bracket/BracketGame";
export default function LoserIndicator({
  loserTo,
}: {
  loserTo: string | null;
}) {
  const readableLoser = useAppSelector((state) =>
    getReadableGameId(state, loserTo)
  );

  const baseButtonStyles =
    "text-destructive  rounded-sm  bracket-game__loser-indicator ";

  return (
    <div className={baseButtonStyles}>
      Loser {loserTo ? readableLoser : "out"}
    </div>
  );
}
