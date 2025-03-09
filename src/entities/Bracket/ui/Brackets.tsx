import { BracketContext } from "@/shared/Bracket/BracketContext";
import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import type { BracketConnections, BracketGame, BracketRows } from "../lib";
import Bracket from "./Bracket";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import BracketGameInfo from "./BracketGameInfo";
import { scrollToGame } from "../lib/scrollToGame";
export default function Brackets({
  brackets,
  connections,
  infoChildren,
  rows,
  schedule,
  updateRows,
  persistSelection,
}: {
  brackets: BracketGame[][][];
  connections: BracketConnections;
  infoChildren?: React.ReactNode;
  rows: BracketRows;
  schedule: { [gameId: string]: number };
  updateRows: (newRows: BracketRows) => void;
  persistSelection?: boolean;
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

  const [selectedGame, setSelectedGame] = useState<BracketGame | null>(null);

  function cancelSelectedGame(e, force = false) {
    if (!force) {
      const isBracketInfoContainer = Array.from(e.composedPath()).some((el) => {
        if (!el?.id) return false;
        return el.id === "BRACKET_GAME_INFO_CONTAINER";
      });
      if (isBracketInfoContainer) return;
    }
    if (persistSelection) return;
    const el = document.getElementById("BRACKET_GAME_INFO_CONTAINER");
    setSelectedGame(null);

    document.removeEventListener("click", cancelSelectedGame);
  }

  const { lookingForLoserConnection } = useContext(BracketEditingContext);

  return (
    <BracketContext.Provider
      value={{
        brackets,
        selectedGame,
        schedule,
        connections,
        deselectGame: cancelSelectedGame,
        selectGame: (game: BracketGame | null | string) => {
          let gameToSelect = game;
          if (typeof game === "string") {
            gameToSelect = brackets
              .flat()
              .flat()
              .find(({ id }) => id === game);
          } else if (game?.id === undefined) return;
          setSelectedGame(gameToSelect);

          scrollToGame(gameToSelect.id, {
            inline: "center",
            block: "center",
          });
        },
        scrollToBracket,
        scrollToGame,
      }}
    >
      <div className="flex flex-col gap-16 relative  w-fit">
        <div
          id="BRACKET_GAME_INFO_CONTAINER"
          style={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(8.5px)",
            WebkitBackdropFilter: "blur(8.5px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
          className={
            "fixed right-0 md:h-screen  z-50 transition-transform bg-glass w-screen md:w-[min(500px,45vw)] " +
            (selectedGame && !lookingForLoserConnection
              ? "translate-x-[0]"
              : " translate-x-[100%]")
          }
        >
          {selectedGame && (
            <BracketGameInfo
              onBack={(e) => cancelSelectedGame(e.nativeEvent, true)}
            >
              {infoChildren}
            </BracketGameInfo>
          )}
        </div>
        {brackets.map((rounds, bracketIndex) => {
          return (
            <div key={"bracket-" + bracketIndex}>
              <div className="sticky w-screen left-0 top-0 bg-black/10 z-10 p-4 text-3xl font-semibold text-foreground flex gap-2 ">
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

                <div className="ml-2 text-glass-foreground">
                  Bracket {bracketIndex + 1}
                </div>
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
