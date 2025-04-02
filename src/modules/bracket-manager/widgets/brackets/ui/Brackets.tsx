"use client";

import { useRef, useState } from "react";
import type { BracketRows, BracketRow } from "../types";
import type { BracketGame as BracketGameType } from "@/modules/bracket-manager/shared/types";
import Bracket from "./Bracket";
import BracketRound from "./BracketRound";
import { BracketGame } from "./BracketGame";

import Typography from "@/shared/ui/typography";
import { numberToLetter } from "@/shared/utils/numberToLetter";
import { cn } from "@/lib/utils";
import { BRACKET_CONTAINER_ELEMENT_ID_PREFIX } from "@/entities/Bracket";
import { useDraggableBracket } from "../hooks/useDraggableBracket";
import { useBracketData } from "../hooks/useBracketData";
import { useBackgroundClick } from "../hooks/useBackgroundClick";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { useBracketInteractions } from "../hooks/useBracketInteractions";
import DeleteBracketOverlay from "./DeleteBracketOverlay";
import AddBracketButton from "./AddBracketButton";
import { Nullable } from "@/shared/types";
export default function Brackets({
  children,
  className,
  onAddBracket,
  onBackgroundClick,
  onDeleteBracket,
  extendOnGameClick,
  selectedGameIds = [],
}: {
  children?: React.ReactNode;
  className?: string;
  onAddBracket?: Nullable<(bracketIndex: number) => void>;
  onBackgroundClick?: () => void;
  onDeleteBracket: Nullable<(bracketIndex: number) => void>;
  extendOnGameClick?: Nullable<(game: Nullable<BracketGameType>) => boolean>;
  selectedGameIds: string[];
}) {
  const el = useRef<HTMLElement>(null);

  /**
   * Store data
   */

  const schedule = {};
  const { brackets, originConnections } = useBracketData();

  /**
   * Interaction hooks
   */

  useBackgroundClick({ ref: el, callback: onBackgroundClick });

  useAutoScroll({
    scrollerRef: el,
  });

  const { isDragging } = useDraggableBracket({ ref: el });

  const { onGameClick } = useBracketInteractions({
    extendOnGameClick,
  });

  /**
   *
   * Setting of bracket rows for grid display
   */

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

  return (
    <div
      ref={el}
      className={cn(
        "pointer-events-auto absolute inset-0 overflow-auto bg-glass flex flex-col gap-4  ",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
      draggable={true}
    >
      {onAddBracket && (
        <AddBracketButton className="mt-4" onClick={() => onAddBracket(0)} />
      )}
      {brackets?.length ? (
        brackets.map((rounds, bracketIndex) => {
          return (
            <div
              key={"bracket-" + bracketIndex}
              id={BRACKET_CONTAINER_ELEMENT_ID_PREFIX + bracketIndex}
              className={cn("relative w-max", className)}
            >
              <div
                className={cn(
                  "grid grid-cols-[auto_1fr] w-max  rounded-tl-xl rounded-bl-xl  relative"
                )}
              >
                {onDeleteBracket && (
                  <DeleteBracketOverlay
                    bracketIndex={bracketIndex}
                    onDelete={() => onDeleteBracket(bracketIndex)}
                  />
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
                                  onClick={isDragging ? null : onGameClick}
                                  selected={selectedGameIds.includes(game.id)}
                                  drawNumber={schedule[game.id]}
                                />
                              </div>
                            );
                          })}
                      </BracketRound>
                    );
                  })}
                </Bracket>
              </div>
              {onAddBracket && (
                <AddBracketButton
                  className="mt-4"
                  onClick={() => onAddBracket(bracketIndex + 1)}
                />
              )}
            </div>
          );
        })
      ) : (
        <div className="absolute inset-0 flex justify-center items-center">
          No brackets
        </div>
      )}
      {children}
    </div>
  );
}
