import { BracketContext } from "@/shared/Bracket/BracketContext";
import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import type { BracketConnections, BracketGame, BracketRows } from "../lib";
import Bracket from "./Bracket";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import BracketGameInfo from "./BracketGameInfo";
import { scrollToGame } from "../lib/scrollToGame";
import BracketNavigator from "./BracketNavigator";
import { BRACKET_CONTAINER_ELEMENT_ID_PREFIX } from "../lib/constants/element-id";
export default function Brackets({
  brackets,
  connections,
  infoChildren,
  rows,
  schedule,
  updateRows,
}: {
  brackets: BracketGame[][][];
  connections: BracketConnections;
  infoChildren?: React.ReactNode;
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

  const [selectedGame, setSelectedGame] = useState<BracketGame | null>(null);

  function cancelSelectedGame(e, force = false) {
    if (!force) {
      const isBracketInfoContainer = Array.from(e.composedPath()).some((el) => {
        if (!el?.id) return false;
        return el.id === "BRACKET_GAME_INFO_CONTAINER";
      });
      if (isBracketInfoContainer) return;
    }
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
      <div className="grid grid-rows-[auto_1fr] fixed inset-0">
        <div>
          <BracketNavigator
            numBrackets={brackets?.length || 0}
            goBracket={goBracket}
          />
        </div>
        <div className="relative overflow-auto">
          <div className="flex flex-col gap-16 absolute inset-0">
            <div
              id="BRACKET_GAME_INFO_CONTAINER"
              style={{
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(8.5px)",
                WebkitBackdropFilter: "blur(8.5px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
              }}
              className={
                "fixed right-0 md:h-screen bottom-0  z-50 transition-transform bg-glass w-screen md:w-[min(500px,45vw)] " +
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
                <div key={"bracket-" + bracketIndex} className="w-fit">
                  <div
                    className="p-0 min-h-screen"
                    id={BRACKET_CONTAINER_ELEMENT_ID_PREFIX + bracketIndex}
                  >
                    <Bracket rounds={rounds} setRows={updateRows} rows={rows} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="block md:hidden">
          <BracketNavigator
            numBrackets={brackets?.length || 0}
            goBracket={goBracket}
          />
        </div> */}
      </div>
    </BracketContext.Provider>
  );
}
