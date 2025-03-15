import React, { useContext, useState } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";

import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import type {
  BracketConnections,
  BracketGame,
  BracketRows,
  BracketDrawTimes,
  BracketSchedule,
} from "../lib";
import Bracket from "./Bracket";
import BracketGameInfo from "./BracketGameInfo";
import { scrollToGame } from "../lib/scrollToGame";
import BracketNavigator from "./BracketNavigator";
import { BRACKET_CONTAINER_ELEMENT_ID_PREFIX } from "../lib/constants/element-id";
import Slideout from "@/shared/ui/slide-out";
import Typography from "@/shared/ui/typography";
import { Nullable } from "@/shared/types";

export default function Brackets({
  appendHeaderChildren,
  appendNavigatorChildren,
  backButton,
  brackets,
  children,
  connections,
  drawTimes,
  eventName = "Bracket",
  infoChildren,
  nextStageName,
  prependNavigatorChildren,
  readableIdIndex,
  rows,
  schedule,
  updateRows,
}: {
  appendHeaderChildren?: React.ReactNode;
  appendNavigatorChildren?: React.ReactNode;
  backButton?: React.ReactNode;
  brackets: BracketGame[][][];
  children?: React.ReactNode;
  connections: BracketConnections;
  drawTimes: BracketDrawTimes;
  eventName?: string;
  infoChildren?: React.ReactNode;
  nextStageName: Nullable<string>;
  prependNavigatorChildren?: React.ReactNode;
  readableIdIndex: { [gameId: string]: string };
  rows: BracketRows;
  schedule: BracketSchedule;
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

  const { lookingForLoserConnection, setSelectedDraw } = useContext(
    BracketEditingContext
  );

  const [currentlyViewingBracket, setCurrentlyViewingBracket] = useState(0);

  function selectGame(game: BracketGame | null | string) {
    if (!game) return;
    let gameToSelect = game;
    if (typeof game === "string") {
      gameToSelect =
        brackets
          .flat()
          .flat()
          .find(({ id }) => id === game) || "";
    } else if (game?.id === undefined) return;
    setSelectedGame(gameToSelect);
    setSelectedDraw(null);

    scrollToGame(gameToSelect.id, {
      inline: "center",
      block: "center",
    });
  }

  return (
    <BracketContext.Provider
      value={{
        brackets,
        drawTimes,
        readableIdIndex,
        selectedGame,
        schedule,
        connections,
        nextStageName,
        deselectGame: cancelSelectedGame,
        selectGame,
        scrollToBracket,
        scrollToGame,
        currentlyViewingBracket,
        setCurrentlyViewingBracket,
      }}
    >
      <div className=" grid grid-rows-[auto_1fr] absolute inset-0">
        <header className="flex gap-2 md:gap-4 p-4 md:py-6 items-center bg-primary/5 backdrop-blur-md text-glass-foreground">
          {backButton}
          <Typography tag="h1" className="text-xl md:text-3xl">
            {eventName}
          </Typography>
          {appendHeaderChildren}
        </header>
        <div className="relative overflow-auto">
          <div className="flex flex-col gap-16 absolute inset-0">
            <Slideout
              id="BRACKET_GAME_INFO_CONTAINER"
              visible={!!selectedGame && !lookingForLoserConnection}
              fullHeight={false}
            >
              {selectedGame && (
                <BracketGameInfo
                  onBack={(e) => cancelSelectedGame(e.nativeEvent, true)}
                >
                  {selectedGame && !lookingForLoserConnection && infoChildren}
                </BracketGameInfo>
              )}
            </Slideout>

            {brackets.map((rounds, bracketIndex) => {
              return (
                <div key={"bracket-" + bracketIndex} className="w-fit">
                  <div
                    className="p-0 min-h-screen pr-[100vw] md:pr-[500px]"
                    id={BRACKET_CONTAINER_ELEMENT_ID_PREFIX + bracketIndex}
                  >
                    <Bracket
                      rounds={rounds}
                      setRows={updateRows}
                      rows={rows}
                      bracketNumber={bracketIndex}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {
          <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-40 flex flex-col gap-2 ">
            <div className="flex gap-2 items-center justify-end">
              {prependNavigatorChildren}
              <BracketNavigator
                numBrackets={brackets?.length || 0}
                goBracket={goBracket}
              />
              {appendNavigatorChildren}
            </div>
            {children}
          </div>
        }
      </div>
    </BracketContext.Provider>
  );
}
