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
  getBracketEventId,
  getBracketEventOrder,
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
import { FaCog } from "react-icons/fa";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import BracketViewLayout from "@/shared/layouts/BracketViewLayout";
import EditingBracketHeader from "./EditingBracketHeader";
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
  const eventName = useAppSelector(getBracketEventName);
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

  const [showWizard, setShowWizard] = useState(false);

  return (
    <TournamentStageContextProvider stage={bracketStage}>
      <div className="fixed inset-0">
        <BracketViewLayout>
          <EditingBracketHeader
            eventName={eventName}
            onBack={showWizard ? onEndView : () => setShowWizard(true)}
            onNext={showWizard ? () => setShowWizard(false) : null}
            onSave={showWizard ? null : handleSave}
          />

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
        </BracketViewLayout>

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
            />
          )}
        </Slideout>

        {/*
            Bracket stage edit options
            */}

        <Slideout visible={showEventEditor}>
          {showEventEditor && (
            <BracketEventOptions
              initialTab={"overview"}
              onClose={() => {
                setShowEventEditor(false);
              }}
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
              <AddBracket />
            </div>
            <Button onClick={() => setShowEventEditor(true)}>
              <FaCog />
              Event options
            </Button>
          </div>
        }
      </div>
    </TournamentStageContextProvider>
  );
}
