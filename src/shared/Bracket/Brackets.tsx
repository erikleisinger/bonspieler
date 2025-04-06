"use client";

import { useEffect, useRef, useState, useContext, useMemo } from "react";
import type { BracketRows, BracketGameType } from "@/entities/Bracket";
import {
  Bracket,
  BracketRound,
  BracketGame,
  BracketRow,
} from "@/entities/Bracket";

import { DestinationConnection } from "@/entities/Bracket/BracketGameConnections";

import BracketGameFinalResult from "@/entities/Bracket/BracketGame/ui/BracketGameFinalResult";
import { Nullable } from "@/shared/types";

import { BracketContext } from "./BracketContext";
import Typography from "../ui/typography";
import { numberToLetter } from "../utils/numberToLetter";
import { cn } from "@/lib/utils";
import {
  BRACKET_GAME,
  BRACKET_GAME_FINAL_RESULT,
  BRACKET_CONTAINER_ELEMENT_ID_PREFIX,
} from "@/entities/Bracket";
import { scrollToGame, scrollToBracket } from "@/entities/Bracket/lib/scroll";
import useDraggableBracket from "./useDraggableBracket";

export default function Brackets({
  availableGameIds = [],
  backgroundGameIds,
  backgroundSelectable = false,
  bracketOverlayChildren = [],
  className,
  gameResultChildren,
  onBackgroundClick,
  onGameClick,
  onGameResultClick = () => {},

  selectedGameIds = [],
  tournamentId,
  appendBracketChildren = [],
}: {
  availableGameIds: string[];
  backgroundGameIds?: Nullable<string[]>;
  backgroundSelectable?: boolean;
  bracketOverlayChildren?: React.ReactNode[];
  className?: string;
  gameResultChildren?: React.ReactNode;
  onBackgroundClick?: () => void;
  onGameClick?: (game: BracketGameType) => void;
  onGameResultClick?: (game: BracketGameType) => void;
  selectedGameIds: string[];
  tournamentId: string;
  appendBracketChildren?: React.ReactNode[];
}) {
  const {
    originConnections,
    winnerConnections,
    loserConnections,
    brackets,
    schedule,
    stageId,
  } = useContext(BracketContext);

  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;
    if (availableGameIds.length) {
      scrollToGame(availableGameIds[0], el);
    } else if (selectedGameIds.length) {
      scrollToGame(selectedGameIds[0], el);
    }
  }, [availableGameIds, selectedGameIds, el]);

  const bracketIds = useMemo(() => {
    return brackets.map((rounds) => rounds.flat()[0].id);
  }, [brackets]);

  const [oldBracketIds, setOldBracketIds] = useState<string[]>([]);

  useEffect(() => {
    const firstNewBracketIndex = bracketIds.findIndex(
      (id) => !oldBracketIds.includes(id)
    );

    if (firstNewBracketIndex !== -1) {
      scrollToBracket(firstNewBracketIndex, el);
    }
    setOldBracketIds(bracketIds);
  }, [bracketIds]);

  function getRowSpanForGame(rows: BracketRow) {
    const { rowStart = 1, rowEnd = 2 } = rows || {};
    return {
      gridRow: `${rowStart} / ${rowEnd}`,
    };
  }

  const [rows, setRows] = useState<BracketRows>({});

  function updateRows(rows: BracketRows) {
    setRows((prev) => ({
      ...prev,
      ...rows,
    }));
  }

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!onBackgroundClick) return;
      const paths = e
        .composedPath()
        .map((el) => Array.from(el?.classList || []))
        .flat();
      if (
        paths.includes(BRACKET_GAME) ||
        paths.includes(BRACKET_GAME_FINAL_RESULT)
      )
        return;
      onBackgroundClick();
    }

    if (onBackgroundClick && el?.current)
      el.current.addEventListener("click", onClick);

    return () => {
      if (el?.current) el.current.removeEventListener("click", onClick);
    };
  }, [el, onBackgroundClick]);

  const { isDragging } = useDraggableBracket({ ref: el });

  function isFinalResult(winnerConnection: DestinationConnection) {
    const { gameId: winnerGameId, stageId: winnerStageId } =
      winnerConnection || {};
    return !winnerGameId || (!!winnerStageId && winnerStageId !== stageId);
  }

  return (
    <div
      ref={el}
      className={cn(
        "pointer-events-auto absolute inset-0 overflow-auto bg-glass flex flex-col gap-2 ",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
      draggable={true}
    >
      {brackets?.length ? (
        brackets.map((rounds, bracketIndex) => {
          return (
            <div
              key={"bracket-" + bracketIndex}
              id={BRACKET_CONTAINER_ELEMENT_ID_PREFIX + bracketIndex}
              className={cn(
                "relative w-max",
                className,
                backgroundSelectable && "hover:bg-indigo-500/10 cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "grid grid-cols-[auto_1fr] w-max  rounded-tl-xl rounded-bl-xl  relative"
                )}
              >
                {bracketOverlayChildren?.length ? (
                  bracketOverlayChildren[bracketIndex]
                ) : (
                  <div className="absolute" />
                )}
                <div
                  className={cn(
                    "h-full relative  p-4  flex items-center  z-20  bg-indigo-500/5 bracket-label"
                  )}
                >
                  <Typography tag="h2" className="text-center">
                    {numberToLetter(bracketIndex + 1)}
                  </Typography>
                </div>
                <Bracket
                  originConnections={originConnections}
                  rounds={rounds}
                  setRows={updateRows}
                  rows={rows}
                  stageId={stageId}
                >
                  {rounds.map((games, roundIndex) => {
                    return (
                      <BracketRound
                        games={games}
                        key={"round-" + roundIndex}
                        rows={rows}
                        roundIndex={roundIndex}
                      >
                        {games &&
                          games.map((game: BracketGameType) => {
                            return (
                              <div
                                className="flex items-center pointer-events-auto justify-center"
                                key={game.id}
                                style={{
                                  ...getRowSpanForGame(rows[game.id]),
                                }}
                              >
                                <BracketGame
                                  game={game}
                                  winnerConnection={
                                    winnerConnections[game.id] || {}
                                  }
                                  loserConnection={
                                    loserConnections[game.id] || {}
                                  }
                                  originConnections={
                                    originConnections[game.id] || []
                                  }
                                  onClick={isDragging ? null : onGameClick}
                                  selected={selectedGameIds.includes(game.id)}
                                  drawNumber={schedule[game.id]}
                                  available={availableGameIds.includes(game.id)}
                                  background={
                                    !!backgroundGameIds &&
                                    backgroundGameIds.includes(game.id)
                                  }
                                />
                                {isFinalResult(winnerConnections[game.id]) && (
                                  <div
                                    className="relative"
                                    onClick={() => onGameResultClick(game)}
                                  >
                                    {gameResultChildren || (
                                      <BracketGameFinalResult
                                        connection={winnerConnections[game.id]}
                                        tournamentId={tournamentId}
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </BracketRound>
                    );
                  })}
                </Bracket>
              </div>
              {appendBracketChildren[bracketIndex] &&
                appendBracketChildren[bracketIndex]}
            </div>
          );
        })
      ) : (
        <div className="absolute inset-0 flex justify-center items-center">
          No brackets
        </div>
      )}
    </div>
  );
}
