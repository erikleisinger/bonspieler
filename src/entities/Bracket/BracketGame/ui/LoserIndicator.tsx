export default function LoserIndicator({
  loserTo,
}: {
  loserTo: string | null;
}) {
  const baseButtonStyles =
    "text-destructive  rounded-sm  bracket-game__loser-indicator ";

  return <div className={baseButtonStyles}>Loser {loserTo || "out"}</div>;
}
