import type { BracketGame as BracketGameType, BracketRows } from "../../types";
import BracketRoundRow from "./BracketRoundRow";
import BracketRoundHeader from "./BracketRoundHeader";
export default function BracketRound({
  children,
  games,
  rows,
  roundIndex,
  scale,
}: {
  children?: React.ReactNode;
  games: BracketGameType[];
  rows: BracketRows;
  roundIndex: number;
  scale: number;
}) {
  return (
    <div className="pointer-events-none">
      <BracketRoundHeader roundNumber={roundIndex + 1} />
      <div className="h-8" />
      <BracketRoundRow
        roundIndex={roundIndex}
        games={games}
        rows={rows}
        scale={scale}
      >
        {children}
      </BracketRoundRow>
    </div>
  );
}
