import { useAppSelector } from "@/lib/store";
import { getReadableGameId } from "@/entities/BracketEvent";
export default function LoserIndicator({
  loserTo,
}: {
  loserTo: string | null;
}) {
  const readableLoser = useAppSelector(getReadableGameId)(loserTo);

  const baseButtonStyles =
    "text-destructive  rounded-sm  bracket-game__loser-indicator ";

  return (
    <div className={baseButtonStyles}>
      Loser {loserTo ? readableLoser : "out"}
    </div>
  );
}
