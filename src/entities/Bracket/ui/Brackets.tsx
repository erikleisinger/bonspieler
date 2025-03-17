import React, { useContext, useState, useEffect } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";

import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import type {
  BracketConnections,
  BracketGame,
  BracketRows,
  BracketDrawTimes,
  BracketSchedule,
} from "../lib";
import BracketGameInfo from "./BracketGameInfo";
import { scrollToGame } from "../lib/scrollToGame";
import Slideout from "@/shared/ui/slide-out";
import { Nullable } from "@/shared/types";

export default function Brackets({
  brackets,
  children,
  connections,
  drawTimes,
  infoChildren,
  nextStageName,
  readableIdIndex,
  schedule,
}: {
  backButton?: React.ReactNode;
  brackets: BracketGame[][][];
  children?: React.ReactNode;
  connections: BracketConnections;
  drawTimes: BracketDrawTimes;
  infoChildren?: React.ReactNode;
  nextStageName: Nullable<string>;
  prependNavigatorChildren?: React.ReactNode;
  readableIdIndex: { [gameId: string]: string };
  schedule: BracketSchedule;
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

  const { lookingForLoserConnection, setSelectedDraw, availableGames } =
    useContext(BracketEditingContext);

  const [currentlyViewingBracket, setCurrentlyViewingBracket] = useState(0);

  useEffect(() => {
    if (!availableGames.length) return;
    const [firstGameId] = availableGames;
    if (!firstGameId) return;
    scrollToGame(firstGameId);
  }, [availableGames.length]);

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
        scrollToBracket,
        scrollToGame,
        currentlyViewingBracket,
        setCurrentlyViewingBracket,
      }}
    >
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

          {children}
        </div>
      </div>
    </BracketContext.Provider>
  );
}
