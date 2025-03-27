export default function BracketRoundHeader({
  roundNumber,
}: {
  bracketNumber: number;
}) {
  // const roundDrawTimes = useMemo(() => {
  //     const times: number[] = [];
  //     games.forEach(({ id }) => {
  //       const drawNum = schedule[id];
  //       if (!times.includes(drawNum)) times.push(drawNum);
  //     });

  //     return times.map((num) => drawTimes[num]).filter(Boolean);
  //   }, [games, schedule, drawTimes]);

  return (
    <header className="sticky  right-0 top-2 z-[1] p-2 text-glass-foreground font-semibold bg-glass shadow-sm backdrop-blur-sm text-center mx-1 rounded-sm pointer-events-auto">
      <div>Round {roundNumber}</div>
    </header>
  );
}
