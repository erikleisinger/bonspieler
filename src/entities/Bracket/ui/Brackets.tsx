import { BracketContext } from "@/shared/Bracket/BracketContext";
import type { BracketConnections, BracketGame, BracketRows } from "../lib";
import Bracket from "./Bracket";
import { Button } from "@/shared/ui/button";
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
  function scrollToBracket(bracketIndex: number) {
    const bracketHeaderEl = document.getElementById(
      "BRACKET-CONTAINER-" + bracketIndex
    );
    if (!bracketHeaderEl) return;
    bracketHeaderEl.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }

  function goBracket(inc: number, bracketIndex: number) {
    const newBracketIndex = bracketIndex + inc;
    if (newBracketIndex < 0 || newBracketIndex >= brackets.length) return;
    scrollToBracket(newBracketIndex);
  }
  return (
    <BracketContext.Provider
      value={{
        schedule,
        connections,
        scrollToBracket,
      }}
    >
      <div className="flex flex-col gap-16 relative  w-fit">
        {brackets.map((rounds, bracketIndex) => {
          return (
            <div key={"bracket-" + bracketIndex}>
              <div className="sticky w-screen left-0 top-0 bg-black/10 z-10 p-4 text-3xl font-semibold text-white flex gap-2 ">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => goBracket(-1, bracketIndex)}
                  disabled={bracketIndex === 0}
                >
                  {"<"}
                </Button>

                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => goBracket(+1, bracketIndex)}
                  disabled={bracketIndex === brackets.length - 1}
                >
                  {">"}
                </Button>

                <div className="ml-2">Bracket {bracketIndex + 1}</div>
              </div>
              <div
                className="p-8 pt-16 min-h-screen"
                id={"BRACKET-CONTAINER-" + bracketIndex}
              >
                <Bracket rounds={rounds} setRows={updateRows} rows={rows} />
              </div>
            </div>
          );
        })}
      </div>
    </BracketContext.Provider>
  );
}
