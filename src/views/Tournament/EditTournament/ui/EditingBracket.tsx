import { useState, useRef } from "react";

// Types & enums

import type { BracketGameType, BracketSchedule } from "@/entities/Bracket";
import type { Nullable } from "@/shared/types";

/* Store */

import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getSelectedGame,
  setSelectedGame,
  setSelectedDraw,
  getBracketEventNumSheets,
  getBracketEventNumTeams,
  setNumTeams,
  setNumWinners,
  getLookingToAssignTeam,
  assignTeamToGame,
  saveBracketEvent,
  updateBracketEvent,
} from "@/entities/BracketEvent";
import {
  setWinnerConnections,
  setLoserConnections,
  setOriginConnections,
  getLoserConnections,
  getWinnerConnections,
  getOriginConnections,
} from "@/entities/Bracket/BracketGameConnections";

import { getCurrentTournamentId } from "@/entities/Tournament";
import {
  getBracketEventBrackets,
  saveBracketGames,
  setBracketEventBrackets,
  getBracketEventReadableIdIndex,
  setBracketEventReadableIdIndex,
  setBracketEventSchedule,
  setBracketEventGameIndex,
  getBracketEventSchedule,
} from "@/entities/Bracket/BracketGame";
import { setDrawTimes } from "@/entities/DrawTime";
import { saveBracketConnections } from "@/entities/Bracket/BracketGameConnections";
import { getBracketEvent } from "@/entities/BracketEvent";
import { getDrawTimes, saveDrawTimes } from "@/entities/DrawTime";

/* Context */

import GameAvailabilityContextProvider from "./GameAvailabilityContextProvider";

/* Components */

import { AddBracket } from "@/widgets/Bracket/AddBracket";
import { BracketEditor } from "@/widgets/Bracket/BracketOptions";
import { BracketEventOptions } from "@/widgets/Bracket/BracketEventOptions";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { BracketNavigator } from "@/features/Bracket/BracketNavigator";
import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import { Button } from "@/shared/ui/button";
import { CreateBracketEventWizard } from "@/widgets/Bracket/CreateBracketEventWizard";
import { EditDrawNumber } from "@/features/EditDrawNumber";
import {
  FaArrowLeft,
  FaCog,
  FaCalendarAlt,
  FaUserFriends,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import Slideout from "@/shared/ui/slide-out";

/* Utils */

import { scrollToGame } from "@/entities/Bracket";
import { GeneratedBracket } from "@/features/Bracket/GenerateBracket";
import { getAvailableDrawsForBracketGame } from "@/features/EditDrawNumber";
import useElementSize from "@/shared/hooks/useElementSize";
import { cn } from "@/lib/utils";

export default function EditingBracket({
  onEndView,
}: {
  onEndView: () => void;
}) {
  const scroller = useRef(null);
  const { height } = useElementSize(scroller);

  const sidebar = useRef(null);
  const { width: sidebarWidth } = useElementSize(sidebar);

  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(getSelectedGame);
  const bracketStage = useAppSelector(getBracketEvent);
  const brackets = useAppSelector(getBracketEventBrackets);
  const numSheets = useAppSelector(getBracketEventNumSheets);
  const numTeams = useAppSelector(getBracketEventNumTeams);
  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);
  const tournamentId = useAppSelector(getCurrentTournamentId);
  const readableIdIndex = useAppSelector(getBracketEventReadableIdIndex);
  const drawTimes = useAppSelector(getDrawTimes);
  const schedule = useAppSelector(getBracketEventSchedule);
  const winnerConnections = useAppSelector(getWinnerConnections);
  const loserConnections = useAppSelector(getLoserConnections);
  const originConnections = useAppSelector(getOriginConnections);

  const availableDrawTimes: number[] = getAvailableDrawsForBracketGame({
    gameId: selectedGame?.id,
    schedule,
    winnerConnections,
    loserConnections,
    originConnections,
  });

  function cancelSelectedGame() {
    dispatch(setSelectedGame(null));
  }

  async function handleSave() {
    if (!bracketStage) return;
    const { id, connections } = bracketStage;
    await dispatch(
      saveBracketGames({
        tournamentId,
        bracketStageId: id,
        brackets,
        readableIdIndex,
      })
    );

    await dispatch(
      saveBracketConnections({
        tournamentId,
        bracketStageId: id,
        connections,
      })
    );
    await dispatch(
      saveDrawTimes({
        tournamentId,
        stageId: id,
        drawTimes,
      })
    );
    await dispatch(saveBracketEvent());
    // dispatch(updateAndSaveTournament(bracketStage));
  }

  function renderBracketsFromWizard(newBracketEvent: GeneratedBracket) {
    const {
      brackets,
      originConnections,
      winnerConnections,
      loserConnections,
      gameIndex,
      readableIdIndex,
      drawTimes,
      schedule,
      numTeams,
      numWinners,
    } = newBracketEvent;
    dispatch(setOriginConnections(originConnections));
    dispatch(setWinnerConnections(winnerConnections));
    dispatch(setLoserConnections(loserConnections));
    dispatch(setBracketEventBrackets(brackets));
    dispatch(setBracketEventReadableIdIndex(readableIdIndex));
    dispatch(setBracketEventGameIndex(gameIndex));
    dispatch(updateBracketEvent(newBracketEvent));
    dispatch(setDrawTimes(drawTimes));
    dispatch(setBracketEventSchedule(schedule));
    dispatch(setNumTeams(numTeams));
    dispatch(setNumWinners(numWinners.reduce((a, c) => a + c, 0)));
    setShowWizard(false);
  }

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

  const [bracketToEdit, setBracketToEdit] = useState<Nullable<number>>(null);
  const [showEventEditor, setShowEventEditor] = useState(false);

  const [showWizard, setShowWizard] = useState(!brackets?.length);
  const [editorTab, setEditorTab] = useState("overview");

  function closeEventEditor() {
    setShowEventEditor(false);
    setEditorTab("overview");
  }

  function toggleEventEditor(tab: string) {
    if (!showEventEditor) {
      setEditorTab(tab);
      setShowEventEditor(true);
    } else {
      if (editorTab === tab) {
        closeEventEditor();
      } else {
        setEditorTab(tab);
      }
    }
  }

  function handleUpdateDrawTime(newTime: number) {
    if (!selectedGame?.id) return;
    const newSchedule = {
      ...schedule,
      [selectedGame.id]: newTime,
    };
    dispatch(setBracketEventSchedule(newSchedule));
  }

  const anyModalOpen =
    !!selectedGame?.id || bracketToEdit !== null || showEventEditor;

  return (
    <TournamentStageContextProvider stage={bracketStage}>
      <div
        className="absolute inset-0 grid  overflow-auto "
        style={{
          gridTemplateColumns: `1fr ${sidebarWidth}px`,
        }}
        ref={scroller}
      >
        {showWizard ? (
          <CreateBracketEventWizard
            renderBrackets={renderBracketsFromWizard}
            initialTeamCount={numTeams}
          />
        ) : (
          <GameAvailabilityContextProvider>
            <BracketViewer onGameClick={onGameClick}></BracketViewer>
          </GameAvailabilityContextProvider>
        )}
        <div
          className="sticky right-0 top-0   z-20 grid grid-cols-[auto,1fr]"
          style={{
            height: height + "px",
          }}
        >
          <div
            ref={sidebar}
            className={cn(
              " backdrop-blur-md  shadow-lg py-2  px-4   flex flex-col gap-2 z-10",
              anyModalOpen ? "bg-white/70" : "bg-glass"
            )}
          >
            <Button size="icon" variant="ghost" onClick={onEndView}>
              <FaArrowLeft />
            </Button>
            <div className="h-2" />

            <Button
              size="icon"
              variant={
                showWizard ? "default" : anyModalOpen ? "secondary" : "ghost"
              }
              onClick={() => setShowWizard(!showWizard)}
              disabled={!brackets?.length}
            >
              <FaWandMagicSparkles />
            </Button>
            {!showWizard && (
              <>
                <AddBracket
                  buttonVariant={anyModalOpen ? "secondary" : "ghost"}
                />
                <Button
                  size="icon"
                  variant={
                    showEventEditor && editorTab === "schedule"
                      ? "default"
                      : anyModalOpen
                      ? "secondary"
                      : "ghost"
                  }
                  onClick={() => toggleEventEditor("schedule")}
                >
                  <FaCalendarAlt />
                </Button>
                <Button
                  size="icon"
                  variant={
                    showEventEditor && editorTab === "teams"
                      ? "default"
                      : anyModalOpen
                      ? "secondary"
                      : "ghost"
                  }
                  onClick={() => toggleEventEditor("teams")}
                >
                  <FaUserFriends />
                </Button>
                <Button
                  size="icon"
                  variant={
                    showEventEditor && editorTab === "overview"
                      ? "default"
                      : anyModalOpen
                      ? "secondary"
                      : "ghost"
                  }
                  onClick={() => toggleEventEditor("overview")}
                >
                  <FaCog />
                </Button>
              </>
            )}
          </div>
          <div
            className="relative"
            style={{
              height: height + "px",
            }}
          >
            {/* 
        Game edit options 
        */}

            <Slideout
              visible={!!selectedGame}
              fullHeight={false}
              nudgeLeftPx={sidebarWidth}
            >
              {selectedGame && (
                <BracketGameViewer
                  onBack={cancelSelectedGame}
                  drawTimeChildren={
                    <EditDrawNumber
                      gameId={selectedGame?.id}
                      availableDrawTimes={availableDrawTimes}
                      setDrawTime={handleUpdateDrawTime}
                      drawTime={schedule[selectedGame.id]}
                    />
                  }
                />
              )}
            </Slideout>
            {/*
            Bracket edit options
            */}

            <Slideout
              visible={bracketToEdit !== null}
              nudgeLeftPx={sidebarWidth}
            >
              {bracketToEdit !== null && (
                <BracketEditor
                  onClose={() => {
                    setBracketToEdit(null);
                    dispatch(setSelectedDraw(null));
                  }}
                  editDrawTimes={() => toggleEventEditor("schedule")}
                />
              )}
            </Slideout>

            {/*
            Bracket stage edit options
            */}

            <Slideout visible={showEventEditor} nudgeLeftPx={sidebarWidth}>
              {showEventEditor && (
                <BracketEventOptions
                  initialTab={editorTab}
                  onSave={handleSave}
                  onClose={closeEventEditor}
                  onEndView={onEndView}
                />
              )}
            </Slideout>
          </div>
        </div>
      </div>

      {/*
          Bracket navigation
          */}
      {
        <div className="fixed right-4 bottom-4 md:right-24 md:bottom-8 z-10 flex flex-col gap-2 ">
          <div className="flex gap-2 items-center justify-end">
            <BracketNavigator
              numBrackets={brackets?.length || 0}
              onBracketClick={(bracketIndex: number) =>
                setBracketToEdit(bracketIndex)
              }
            />
          </div>
        </div>
      }
    </TournamentStageContextProvider>
  );
}
