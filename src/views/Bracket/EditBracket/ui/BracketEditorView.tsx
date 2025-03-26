import { useMemo, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import type { BracketGameType } from "@/entities/Bracket";
import {
  assignTeamToGame,
  getLookingToAssignTeam,
  setLookingToAssignTeam,
} from "@/entities/BracketEvent";
import { setSelectedGame } from "@/widgets/Bracket/BracketViewer";
import { scrollToGame } from "@/entities/Bracket";
import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import { BracketEditorToolbar } from "@/widgets/Bracket/BracketEditorToolbar";
import { useBracketEditorToolbarState } from "../lib";
import useElementSize from "@/shared/hooks/useElementSize";
import EditBracketModalController from "./EditBracketModalController";
import {
  getLookingForLoserConnection,
  setLookingForLoserConnection,
} from "@/widgets/Bracket/BracketEditor";
import { getBracketGames } from "@/entities/Bracket/BracketGame";
import {
  getOriginConnections,
  setLoserConnectionForGame,
} from "@/entities/Bracket/BracketGameConnections";
import { cn } from "@/lib/utils";
import Typography from "@/shared/ui/typography";

export default function BracketEditorView({
  children,
  className,
  offsetLeftPx = 0,
}: {
  children?: React.ReactNode;
  className?: string;
  offsetLeftPx?: number;
}) {
  const dispatch = useAppDispatch();
  const brackets = useAppSelector(getBracketGames);
  const originConnections = useAppSelector(getOriginConnections);
  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);
  const lookingForLoserConnection = useAppSelector(
    getLookingForLoserConnection
  );

  /**
   * Reset editing state
   */

  function resetEditingState() {
    dispatch(setLookingToAssignTeam(null));
    dispatch(setLookingForLoserConnection(null));
    dispatch(setSelectedGame(null));
  }

  useEffect(() => {
    resetEditingState();
  }, []);

  /**
   * Sidebar positioning
   */
  const el = useRef<HTMLDivElement>(null);
  const { height: containerHeight, width: containerWidth } = useElementSize(el);

  const toolbar = useRef<HTMLDivElement>(null);
  const { width: toolbarWidth } = useElementSize(toolbar);

  const modalController = useRef<HTMLDivElement>(null);

  /** Get stage for Tournament Context */

  const { toolbarState, setToolbarState } = useBracketEditorToolbarState({
    onClose: resetEditingState,
    toolbarRefs: [toolbar, modalController],
  });

  const availableGameIds: string[] = useMemo(() => {
    if (!lookingToAssignTeam && !lookingForLoserConnection) return [];
    if (lookingToAssignTeam) {
      return [];
    } else {
      return brackets
        .flat()
        .flat()
        .reduce((all: string[], game: BracketGameType) => {
          if (game.id === lookingForLoserConnection?.id) return all;
          if (game.bracketNumber <= lookingForLoserConnection.bracketNumber)
            return all;
          const thisGameOriginConnections = originConnections[game.id] || [];

          const thisGameOriginsWithTwoConnections = Array.from({
            length: 2,
          }).map((_, i) => thisGameOriginConnections[i] || { gameId: null });
          if (
            !!thisGameOriginsWithTwoConnections &&
            !thisGameOriginsWithTwoConnections.some(({ gameId }) => !gameId)
          )
            return all;
          return [...all, game.id];
        }, []);
    }
  }, [
    lookingToAssignTeam,
    lookingForLoserConnection,
    brackets,
    originConnections,
  ]);

  useEffect(() => {
    if (!availableGameIds?.length) return;
    const [firstAvailableGameId] = availableGameIds;
    scrollToGame(firstAvailableGameId);
  }, [availableGameIds]);

  function onGameClick(game: BracketGameType) {
    if (lookingToAssignTeam) {
      dispatch(
        assignTeamToGame({
          teamId: lookingToAssignTeam,
          gameId: game.id,
        })
      );
      dispatch(setLookingForLoserConnection(null));
    } else if (lookingForLoserConnection?.id) {
      if (!availableGameIds.includes(game.id)) return;
      dispatch(
        setLoserConnectionForGame({
          gameId: lookingForLoserConnection.id,
          destinationGameId: game.id,
        })
      );
      dispatch(setLookingForLoserConnection(null));
    } else {
      dispatch(setLookingForLoserConnection(null));
      dispatch(setSelectedGame(game?.id));
      scrollToGame(game.id);
    }
  }

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        left: offsetLeftPx * -1 + "px",
      }}
    >
      <main
        className="absolute inset-0 overflow-auto grid grid-cols-[auto,auto,1fr,auto] pointer-events-none"
        ref={el}
        style={{
          paddingLeft: offsetLeftPx + "px",
        }}
      >
        {children ? children : <div />}
        <div
          className="sticky left-0 top-0 z-20 pointer-events-auto"
          style={{
            height: containerHeight + "px",
          }}
        >
          <div
            className="absolute  h-full  pointer-events-none z-40 overflow-hidden "
            style={{
              right: (toolbarWidth || 0) + offsetLeftPx + "px",
              width: `calc(${containerWidth}px - ${toolbarWidth}px)`,
              left: offsetLeftPx * -1 + "px",
            }}
          >
            <div ref={modalController} className="pointer-events-auto">
              <EditBracketModalController
                state={toolbarState}
                setState={setToolbarState}
              />
            </div>
          </div>
        </div>

        <BracketViewer
          onGameClick={onGameClick}
          availableGameIds={availableGameIds}
        />

        <div
          className="sticky right-0 top-0 bg-glass z-20 backdrop-blur-md pointer-events-auto "
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
  );
}
