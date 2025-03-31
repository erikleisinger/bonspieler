export default function BracketRoundHeader({
  roundNumber,
}: {
  roundNumber: number;
}) {
  return (
    <header className="sticky   top-2 z-[1] p-2 text-glass-foreground font-semibold bg-glass shadow-sm backdrop-blur-sm text-center mx-1 rounded-sm pointer-events-auto">
      <div>Round {roundNumber}</div>
    </header>
  );
}
