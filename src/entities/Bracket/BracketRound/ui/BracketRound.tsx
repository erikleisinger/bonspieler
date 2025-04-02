import type { BracketGame as BracketGameType, BracketRows } from "../../types";
import BracketRoundRow from "./BracketRoundRow";
import BracketRoundHeader from "./BracketRoundHeader";

export default function BracketRound({
  children,
  games,
  rows,
  roundIndex,
}: {
  children?: React.ReactNode;
  games: BracketGameType[];
  rows: BracketRows;
  roundIndex: number;
}) {
  return (
    <div className="pointer-events-none bracket-row z-10">
      <div className="h-8" />
      <BracketRoundRow roundIndex={roundIndex} games={games} rows={rows}>
        {children}
      </BracketRoundRow>
    </div>
  );
}
