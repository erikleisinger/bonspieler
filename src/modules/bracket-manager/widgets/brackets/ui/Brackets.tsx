"use client";

import { useRef, useMemo, useId } from "react";
import type {
  BracketDisplaySize,
  BracketGame as BracketGameType,
  BracketMode,
} from "@/modules/bracket-manager/shared/types";
import Bracket from "./Bracket";
import BracketRound from "./BracketRound";
import BracketGame from "./BracketGame";
import BracketGameMini from "./BracketGameMini";
import { cn } from "@/lib/utils";
import { useDraggableBracket } from "../hooks/useDraggableBracket";
import { useBracketData } from "../hooks/useBracketData";
import { useBackgroundClick } from "../hooks/useBackgroundClick";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { useBracketInteractions } from "../hooks/useBracketInteractions";
import { Nullable } from "@/shared/types";
import { calculateRows } from "../lib";
import GameConnections from "./GameConnections";
import { BracketContext } from "../lib/context/BracketContext";
export default function Brackets({
  children,
  className,
  mode = "games",
  size = "full",
  showTitle,
  onAddBracket,
  onBackgroundClick,
  onDeleteBracket,
  extendOnGameClick,
}: {
  children?: React.ReactNode;
  className?: string;
  mode: BracketMode;
  size: BracketDisplaySize;
  showTitle?: boolean;
  onAddBracket?: Nullable<(bracketIndex: number) => void>;
  onBackgroundClick?: () => void;
  onDeleteBracket: Nullable<(bracketIndex: number) => void>;
  extendOnGameClick?: Nullable<(game: Nullable<BracketGameType>) => boolean>;
}) {
  const el = useRef<HTMLElement>(null);
  const containerId = useId();

  /**
   * Store data
   */

  const schedule = {};
  const { brackets, originConnections, bracketName } = useBracketData();

  /**
   * Interaction hooks
   */

  useBackgroundClick({ ref: el, callback: onBackgroundClick });

  useAutoScroll({
    scrollerRef: el,
  });

  const { isDragging } = useDraggableBracket({
    ref: el,
    disabled: size !== "full",
  });

  const { onGameClick } = useBracketInteractions({
    extendOnGameClick,
  });

  const rows = useMemo(() => {
    return brackets.reduce((all, rounds) => {
      return {
        ...all,
        ...calculateRows({
          rounds,
          originConnections,
        }),
      };
    }, {});
  }, [originConnections, brackets, size]);

  return (
    <BracketContext.Provider
      value={{
        rows,
        brackets,
        size,
      }}
    >
      <div
        id={containerId}
        ref={el}
        className={cn(
          "pointer-events-auto absolute inset-0 overflow-auto bg-glass flex flex-col gap-4  ",
          size !== "full"
            ? "unset"
            : isDragging
            ? "cursor-grabbing"
            : "cursor-grab",
          size !== "full" && "gap-1",
          className
        )}
        draggable={size === "full"}
      >
        <GameConnections
          games={brackets.flat().flat()}
          containerId={containerId}
        />

        {brackets?.length ? (
          brackets.map((rounds, bracketIndex) => {
            return (
              <Bracket
                key={"bracket-" + bracketIndex}
                small={size !== "full"}
                bracketNumber={bracketIndex}
              >
                {rounds.map((games, roundIndex) => {
                  return (
                    <BracketRound
                      bracketNumber={bracketIndex}
                      key={"round-" + roundIndex}
                      roundNumber={roundIndex}
                    >
                      {games &&
                        games.map((game: BracketGameType) => {
                          return mode === "connections" ? (
                            <BracketGameMini
                              key={game.id}
                              game={game}
                              onClick={isDragging ? null : onGameClick}
                            />
                          ) : (
                            <BracketGame
                              key={game.id}
                              game={game}
                              onClick={isDragging ? null : onGameClick}
                              drawNumber={schedule[game.id]}
                            />
                          );
                        })}
                    </BracketRound>
                  );
                })}
              </Bracket>
              // {/* </div> */}
              // {onAddBracket && (
              //   <AddBracketButton
              //     className="mt-4"
              //     onClick={() => onAddBracket(bracketIndex + 1)}
              //   />
              // )}
            );
          })
        ) : (
          <div className="absolute inset-0 flex justify-center items-center">
            No brackets
          </div>
        )}
        {children}
      </div>
    </BracketContext.Provider>
  );
}
