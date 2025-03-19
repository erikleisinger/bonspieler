import { useState } from "react";

// Types & enums

import type { BracketEvent, BracketGameType } from "@/entities/Bracket";
import type { Nullable } from "@/shared/types";

/* Store */

import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getBracketEventBrackets,
  getSelectedGame,
  setSelectedGame,
  setSelectedDraw,
  getBracketEventNumSheets,
  getBracketEventName,
  getBracketEventNumTeams,
  getBracketEventNumWinners,
  setNumSheets,
  setNumTeams,
  setNumWinners,
  getLookingToAssignTeam,
  assignTeamToGame,
  updateBracketEvent,
} from "@/entities/BracketEvent";
import { getBracketEvent } from "@/entities/BracketEvent";
import { updateAndSaveTournament } from "@/entities/Tournament";

/* Context */

import GameAvailabilityContextProvider from "./GameAvailabilityContextProvider";

/* Components */

import { AddBracket } from "@/widgets/Bracket/AddBracket";
import { BracketEditor } from "@/widgets/Bracket/BracketEditor";
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

export default function EditingBracket({
  onEndView,
}: {
  onEndView: () => void;
}) {
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(getSelectedGame);
  const bracketStage = useAppSelector(getBracketEvent);
  const brackets = useAppSelector(getBracketEventBrackets);
  const numSheets = useAppSelector(getBracketEventNumSheets);
  const numTeams = useAppSelector(getBracketEventNumTeams);
  const numWinners = useAppSelector(getBracketEventNumWinners);
  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);

  function cancelSelectedGame() {
    dispatch(setSelectedGame(null));
  }

  async function handleSave() {
    if (!bracketStage) return;
    dispatch(updateAndSaveTournament(bracketStage));
  }

  function renderBracketsFromWizard(newBracketEvent: BracketEvent) {
    dispatch(updateBracketEvent(newBracketEvent));
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
      dispatch(setSelectedGame(game));
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

  return (
    <TournamentStageContextProvider stage={bracketStage}>
      <div className="absolute inset-0 grid grid-cols-[auto,1fr] ">
        <div className="p-2 px-4 sticky top-0 flex flex-col gap-2">
          <Button size="icon" variant="ghost" onClick={onEndView}>
            <FaArrowLeft />
          </Button>
          <div className="h-2" />

          <Button
            size="icon"
            variant={showWizard ? "default" : "secondary"}
            onClick={() => setShowWizard(!showWizard)}
            disabled={!brackets?.length}
          >
            <FaWandMagicSparkles />
          </Button>
          {!showWizard && (
            <>
              <AddBracket />
              <Button
                size="icon"
                variant={
                  showEventEditor && editorTab === "schedule"
                    ? "default"
                    : "secondary"
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
                    : "secondary"
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
                    : "secondary"
                }
                onClick={() => toggleEventEditor("overview")}
              >
                <FaCog />
              </Button>
            </>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-0 overflow-auto">
            {showWizard ? (
              <CreateBracketEventWizard
                teamCount={numTeams}
                updateTeamCount={(e) => dispatch(setNumTeams(e))}
                numWinners={numWinners}
                updateNumWinners={(e) => dispatch(setNumWinners(e))}
                renderBrackets={renderBracketsFromWizard}
                numSheets={numSheets}
                updateNumSheets={(e) => dispatch(setNumSheets(e))}
              />
            ) : (
              <GameAvailabilityContextProvider>
                <BracketViewer onGameClick={onGameClick}></BracketViewer>
              </GameAvailabilityContextProvider>
            )}
          </div>
        </div>
      </div>

      {/* 
        Game edit options 
        */}

      <Slideout visible={!!selectedGame} fullHeight={false}>
        {selectedGame && (
          <BracketGameViewer
            onBack={cancelSelectedGame}
            drawTimeChildren={<EditDrawNumber gameId={selectedGame?.id} />}
          />
        )}
      </Slideout>

      {/*
            Bracket edit options
            */}

      <Slideout visible={bracketToEdit !== null}>
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

      <Slideout visible={showEventEditor}>
        {showEventEditor && (
          <BracketEventOptions
            initialTab={editorTab}
            onSave={handleSave}
            onClose={closeEventEditor}
            onEndView={onEndView}
          />
        )}
      </Slideout>

      {/*
          Bracket navigation
          */}
      {
        <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-40 flex flex-col gap-2 ">
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
