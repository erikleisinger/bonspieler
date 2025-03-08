import { BracketContext } from "@/shared/Bracket/BracketContext";
import type { BracketConnections, BracketGame, BracketRows } from "../lib";
import Bracket from "./Bracket";
export default function Brackets({
  brackets,
  connections,
  rows,
  schedule,
  updateRows,
}: {
  brackets: BracketGame[][][];
  connections: BracketConnections;
  rows: BracketRows;
  schedule: { [gameId: string]: number };
  updateRows: (newRows: BracketRows) => void;
}) {
  return (
    <BracketContext.Provider
      value={{
        schedule,
        connections,
      }}
    >
      <div className="flex flex-col gap-16 relative  w-fit">
        {brackets.map((rounds, bracketIndex) => {
          return (
            <div className="m-8" key={"bracket-" + bracketIndex}>
              <Bracket rounds={rounds} setRows={updateRows} rows={rows} />
            </div>
          );
        })}
      </div>
    </BracketContext.Provider>
  );
}
