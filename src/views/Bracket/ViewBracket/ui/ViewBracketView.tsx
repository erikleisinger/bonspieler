import { useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import type { BracketGameType } from "@/entities/Bracket";
import {
  getSelectedGame,
  setSelectedGame,
} from "@/widgets/Bracket/BracketViewer";
import { scrollToGame } from "@/entities/Bracket";
import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import useElementSize from "@/shared/hooks/useElementSize";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import Slideout from "@/shared/ui/slide-out";

export default function ViewBracketView() {
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(getSelectedGame);

  /**
   * Sidebar positioning
   */
  const el = useRef<HTMLDivElement>(null);
  const { height: containerHeight, width: containerWidth } = useElementSize(el);

  /** Get stage for Tournament Context */

  function onGameClick(game: BracketGameType) {
    dispatch(setSelectedGame(game?.id));
    scrollToGame(game.id);
  }

  return (
    <div className="absolute inset-0">
      <main
        className="absolute inset-0 overflow-auto grid grid-cols-[auto,1fr,auto]"
        ref={el}
      >
        <div
          className="sticky left-0 top-0 z-20"
          style={{
            height: containerHeight + "px",
          }}
        >
          <div
            className="absolute  left-0 h-full  pointer-events-none z-40 overflow-hidden "
            style={{
              right: 0,
              width: `calc(${containerWidth}px)`,
            }}
          >
            <Slideout
              visible={!!selectedGame?.id}
              autoClose={true}
              onAutoClose={() => dispatch(setSelectedGame(null))}
              className="pointer-events-auto"
            >
              {selectedGame?.id && <BracketGameViewer />}
            </Slideout>
          </div>
        </div>

        <BracketViewer
          onGameClick={onGameClick}
          selectedGameId={selectedGame?.id}
        />
      </main>
    </div>
  );
}
