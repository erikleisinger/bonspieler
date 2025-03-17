import React, { useContext, useState, useEffect } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";

import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import type {
  BracketConnections,
  BracketGame,
  BracketDrawTimes,
  BracketSchedule,
} from "../types";
import BracketGameInfo from "./BracketGameInfo";
import { scrollToGame } from "../lib/scrollToGame";
import Slideout from "@/shared/ui/slide-out";
import { Nullable } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getSelectedGame, setSelectedGame } from "@/entities/BracketEvent";

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
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(getSelectedGame);

  function cancelSelectedGame() {
    dispatch(setSelectedGame(null));
  }

  const { lookingForLoserConnection, availableGames } = useContext(
    BracketEditingContext
  );
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
        currentlyViewingBracket,
        setCurrentlyViewingBracket,
      }}
    >
      <div className="relative overflow-auto">
        <div className="flex flex-col gap-16 absolute inset-0">
          <Slideout
            visible={!!selectedGame && !lookingForLoserConnection}
            fullHeight={false}
          >
            {selectedGame && (
              <BracketGameInfo onBack={cancelSelectedGame}>
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
