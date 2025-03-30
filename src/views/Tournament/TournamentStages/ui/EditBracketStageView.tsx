import { useMemo, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import type { BracketGameType } from "@/entities/Bracket";
import {
  assignTeamToGame,
  getLookingToAssignTeam,
  setLookingToAssignTeam,
  getBracketEventOrder,
  getBracketEventId,
  getBracketEventTournamentId,
} from "@/entities/BracketEvent";
import {
  getSelectedDraw,
  setSelectedGame,
  getSelectedGame,
  setViewingNextRoundGameConnection,
} from "@/widgets/Bracket/BracketViewer";
import { scrollToGame } from "@/entities/Bracket";
import { Brackets } from "@/shared/Bracket";
import {
  BracketEditorToolbar,
  useBracketEditorToolbarState,
} from "@/widgets/Bracket/BracketEditorToolbar";
import EditBracketModalController from "./EditBracketModalController";
import {
  getLookingForLoserConnection,
  setLookingForLoserConnection,
} from "@/widgets/Bracket/BracketEditor";
import {
  getBracketGames,
  getBracketGamesSchedule,
} from "@/entities/Bracket/BracketGame";
import {
  getOriginConnections,
  setLoserConnectionForGame,
  getLoserConnections,
  getWinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";
import { CreateBracketEventWizard } from "@/widgets/Bracket/CreateBracketEventWizard";
import { Nullable } from "@/shared/types";
import { useSetBracketData } from "../helpers";
export default function EditBracketStageView() {
  const dispatch = useAppDispatch();

  const brackets = useAppSelector(getBracketGames);
  const bracketStageId = useAppSelector(getBracketEventId);
  const tournamentId = useAppSelector(getBracketEventTournamentId);
  const originConnections = useAppSelector(getOriginConnections);
  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);
  const lookingForLoserConnection = useAppSelector(
    getLookingForLoserConnection
  );
  const order = useAppSelector(getBracketEventOrder);

  const schedule = useAppSelector(getBracketGamesSchedule);
  const winnerConnections = useAppSelector(getWinnerConnections);
  const loserConnections = useAppSelector(getLoserConnections);
  const selectedDraw = useAppSelector(getSelectedDraw);
  const selectedGame = useAppSelector(getSelectedGame);

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
      dispatch(setSelectedGame(game));
      scrollToGame(game.id);
    }
  }

  function onBackgroundClick() {
    setToolbarState(null);
    dispatch(setSelectedGame(null));
  }

  const [viewingGameResult, setViewingGameResult] =
    useState<Nullable<BracketGameType>>(null);

  function onGameResultClick(game: BracketGameType) {
    dispatch(setViewingNextRoundGameConnection(game));
  }

  return (
    <>
      <div className="grow">
        {brackets.length ? (
          <Brackets
            schedule={schedule}
            winnerConnections={winnerConnections}
            loserConnections={loserConnections}
            brackets={brackets}
            originConnections={originConnections}
            onGameClick={onGameClick}
            onGameResultClick={onGameResultClick}
            onBackgroundClick={onBackgroundClick}
            availableGameIds={availableGameIds}
            tournamentId={tournamentId}
            stageId={bracketStageId}
          />
        ) : (
          <CreateBracketEventWizard renderBrackets={renderBracketsFromWizard} />
        )}
      </div>

      <div className="fixed sticky top-0 bottom-0 right-[66px] z-50 min-w-[500px] overflow-hidden pointer-events-none ">
        <EditBracketModalController
          state={toolbarState}
          setState={setToolbarState}
        />
      </div>

      <div className="sticky right-0 top-0 bg-glass backdrop-blur-sm flex z-50">
        <BracketEditorToolbar state={toolbarState} setState={setToolbarState} />
      </div>
    </>
  );
}
