import { useRef, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import type { BracketGameType } from "@/entities/Bracket";
import {
  getBracketEvent,
  assignTeamToGame,
  getSelectedGame,
  setSelectedGame,
  getLookingToAssignTeam,
} from "@/entities/BracketEvent";
import { scrollToGame } from "@/entities/Bracket";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import GameAvailabilityContextProvider from "./GameAvailabilityContextProvider";
import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import { BracketEditorToolbar } from "@/widgets/Bracket/BracketEditorToolbar";
import { useBracketEditorToolbarState } from "../lib";
import useElementSize from "@/shared/hooks/useElementSize";
import EditBracketModalController from "./EditBracketModalController";
export default function EditBracketView() {
  const dispatch = useAppDispatch();
  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);

  /**
   * Sidebar positioning
   */
  const el = useRef<HTMLDivElement>(null);
  const { height: containerHeight, width: containerWidth } = useElementSize(el);

  const toolbar = useRef<HTMLDivElement>(null);
  const { width: toolbarWidth } = useElementSize(toolbar);

  const modalController = useRef<HTMLDivElement>(null);

  /** Get stage for Tournament Context */

  const bracketStage = useAppSelector(getBracketEvent);

  const { toolbarState, setToolbarState } = useBracketEditorToolbarState({
    toolbarRefs: [toolbar, modalController],
  });

  function onGameClick(game: BracketGameType) {
    if (lookingToAssignTeam) {
      dispatch(
        assignTeamToGame({
          teamId: lookingToAssignTeam,
          gameId: game.id,
        })
      );
    } else {
      dispatch(setSelectedGame(game.id));
      scrollToGame(game.id);
    }
  }

  return (
    <TournamentStageContextProvider stage={bracketStage}>
      <GameAvailabilityContextProvider>
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
                  right: toolbarWidth + "px",
                  width: `calc(${containerWidth}px - ${toolbarWidth}px)`,
                }}
              >
                <div ref={modalController}>
                  <EditBracketModalController
                    state={toolbarState}
                    setState={setToolbarState}
                  />
                </div>
              </div>
            </div>

            <BracketViewer onGameClick={onGameClick} />
            <div
              className="sticky right-0 top-0 bg-glass z-20 backdrop-blur-md "
              ref={toolbar}
              style={{
                height: containerHeight + "px",
              }}
            >
              <BracketEditorToolbar
                state={toolbarState}
                setState={setToolbarState}
              />
            </div>
          </main>
        </div>
      </GameAvailabilityContextProvider>
    </TournamentStageContextProvider>
  );
}
