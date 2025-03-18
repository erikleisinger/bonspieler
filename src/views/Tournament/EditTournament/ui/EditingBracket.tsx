import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getBracketEventBrackets,
  getSelectedGame,
  setSelectedGame,
  setSelectedDraw,
  getBracketEventNumSheets,
  addBracketToEvent,
  getBracketEventName,
  getBracketEventNumTeams,
  getBracketEventNumWinners,
  setNumSheets,
  setNumTeams,
  setNumWinners,
  setBracketEvent,
  getLookingToAssignTeam,
  assignTeamToGame,
} from "@/entities/BracketEvent";
import { EditDrawNumber } from "@/features/EditDrawNumber";
import { getBracketEvent } from "@/entities/BracketEvent";
import { updateAndSaveTournament } from "@/entities/Tournament";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import { BracketOptions } from "@/widgets/Bracket/BracketOptions";
import { useState } from "react";
import { BracketNavigator } from "@/features/Bracket/BracketNavigator";
import { Button } from "@/shared/ui/button";
import { FaCog } from "react-icons/fa";
import { Nullable } from "@/shared/types";
import { BracketEventOptions } from "@/widgets/Bracket/BracketEventOptions";
import { AddBracket } from "@/widgets/Bracket/AddBracket";
import { generateBracket } from "@/features/Bracket/GenerateBracket";
import { CreateBracketEventWizard } from "@/widgets/Bracket/CreateBracketEventWizard";
import BracketViewLayout from "@/shared/layouts/BracketViewLayout";
import EditingBracketHeader from "./EditingBracketHeader";
import { scrollToGame } from "@/entities/Bracket";
import GameAvailabilityContextProvider from "./GameAvailabilityContextProvider";

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
    dispatch(updateAndSaveTournament(bracketStage));
  }

  function onAddBracket({
    numTeams,
    numWinners,
    isSeeded,
  }: {
    numTeams: number;
    numWinners: number[];
    isSeeded: boolean;
  }) {
    const data = generateBracket({
      numTeams,
      numWinners,
      numSheets,
      isSeeded,
    });
    dispatch(addBracketToEvent(data));
  }

  function renderBracketsFromWizard(newBracketEvent: BracketEvent) {
    dispatch(
      setBracketEvent({
        ...newBracketEvent,
        id,
        order,
        type: TournamentStageType.Bracket,
      })
    );
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
            <BracketOptions
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
              <AddBracket addBracket={onAddBracket} />
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
