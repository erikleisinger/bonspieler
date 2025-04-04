import { useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import type { BracketGameType } from "@/entities/Bracket";
import {
  assignTeamToGame,
  getLookingToAssignTeam,
  setLookingToAssignTeam,
  getBracketEventId,
  getBracketEventTournamentId,
  setNumTeams,
  setNumWinners,
} from "@/entities/BracketEvent";
import {
  setSelectedGame,
  getSelectedGame,
  setViewingNextRoundGameConnection,
} from "@/widgets/Bracket/BracketViewer";
import { Brackets } from "@/shared/Bracket";
import {
  BracketEditorToolbar,
  BracketEditorToolbarState,
  useBracketEditorToolbarState,
} from "@/widgets/Bracket/BracketEditorToolbar";
import EditBracketModalController from "./EditBracketModalController";
import {
  getLookingForLoserConnection,
  setLookingForLoserConnection,
} from "@/widgets/Bracket/BracketEditor";
import { getBracketGames } from "@/entities/Bracket/BracketGame";
import {
  getOriginConnections,
  getWinnerConnections,
  setLoserConnectionForGame,
} from "@/entities/Bracket/BracketGameConnections";
import { CreateBracketEventWizard } from "@/widgets/Bracket/CreateBracketEventWizard";
import { useSetBracketData } from "../../helpers";
import EditableBracketProvider from "@/shared/Bracket/EditableBracketProvider";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { AddBracketOptions } from "@/widgets/Bracket/AddBracket";
import { DeleteBracketOverlay } from "@/features/Bracket/DeleteBracket";
import {
  getBracketEventStartTeams,
  getBracketEventEndTeams,
} from "@/entities/Bracket";

export default function EditBracketStageView({
  onRemoveStage,
}: {
  onRemoveStage: () => void;
}) {
  const dispatch = useAppDispatch();
  const brackets = useAppSelector(getBracketGames);
  const bracketStageId = useAppSelector(getBracketEventId);
  const tournamentId = useAppSelector(getBracketEventTournamentId);
  const originConnections = useAppSelector(getOriginConnections);
  const winnerConnections = useAppSelector(getWinnerConnections);
  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);
  const lookingForLoserConnection = useAppSelector(
    getLookingForLoserConnection
  );
  const selectedGame = useAppSelector(getSelectedGame);

  useEffect(() => {
    dispatch(
      setNumWinners(getBracketEventEndTeams(brackets, winnerConnections))
    );
  }, [winnerConnections, brackets, dispatch]);
  useEffect(() => {
    dispatch(
      setNumTeams(getBracketEventStartTeams(brackets, originConnections))
    );
  }, [originConnections, brackets, dispatch]);

  const { renderBracketsFromWizard } = useSetBracketData();
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

  /** Get stage for Tournament Context */

  const { toolbarState, setToolbarState } = useBracketEditorToolbarState({
    allow: "all",
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
      dispatch(setSelectedGame(game));
    }
  }

  function onBackgroundClick() {
    if (isBracketEditMode) {
      console.log("bracket edit mode!");
    } else {
      setToolbarState(null);
      dispatch(setSelectedGame(null));
      dispatch(setLookingForLoserConnection(null));
    }
  }

  function onGameResultClick(game: BracketGameType) {
    dispatch(setViewingNextRoundGameConnection(game));
  }

  const selectedGameIds = useMemo(() => {
    if (!selectedGame?.id) return [];
    return [selectedGame.id];
  }, [selectedGame?.id]);

  /**
   *
   * Bracket editing
   */

  const isBracketEditMode = useMemo(() => {
    return toolbarState === BracketEditorToolbarState.EditingBrackets;
  }, [toolbarState]);

  const { addBracket } = useSetBracketData();

  function onAddBracket(index, opts) {
    addBracket(index + 1, opts);
  }

  function addBracketElements() {
    if (!isBracketEditMode) return [];
    return Array.from({ length: brackets.length }).map((_, i) => {
      return (
        <div
          key={i}
          className="sticky left-0  w-full py-4   flex justify-center"
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button>+ Add bracket</Button>
            </PopoverTrigger>
            <PopoverContent align="start" side="top" className="w-[400px]">
              <AddBracketOptions onAdd={(opts) => onAddBracket(i, opts)} />
            </PopoverContent>
          </Popover>
        </div>
      );
    });
  }
  return (
    <EditableBracketProvider stageId={bracketStageId}>
      {!!brackets?.length && (
        <div className="sticky left-0 top-0 bg-glass backdrop-blur-sm flex z-50">
          <BracketEditorToolbar
            state={toolbarState}
            setState={setToolbarState}
          />
        </div>
      )}

      <div className="grow relative">
        {brackets.length ? (
          <Brackets
            className={!!toolbarState ? "pr-[500px]" : ""}
            onGameClick={isBracketEditMode ? null : onGameClick}
            onGameResultClick={onGameResultClick}
            onBackgroundClick={onBackgroundClick}
            availableGameIds={availableGameIds}
            tournamentId={tournamentId}
            selectedGameIds={selectedGameIds}
            appendBracketChildren={addBracketElements()}
            bracketOverlayChildren={Array.from({ length: brackets.length }).map(
              (_, i) => (
                <DeleteBracketOverlay
                  bracketIndex={i}
                  key={"delete-bracket-overlay-" + i}
                />
              )
            )}
          />
        ) : (
          <div className="absolute inset-0 overflow-auto">
            <CreateBracketEventWizard
              renderBrackets={renderBracketsFromWizard}
            />
          </div>
        )}
      </div>

      <div className="absolute  top-0 bottom-0 right-0 z-50 min-w-[500px] overflow-hidden pointer-events-none ">
        <EditBracketModalController
          state={toolbarState}
          setState={setToolbarState}
          onRemoveStage={onRemoveStage}
        />
      </div>
    </EditableBracketProvider>
  );
}
