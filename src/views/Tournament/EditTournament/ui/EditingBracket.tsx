import { BracketEditor } from "@/widgets/Bracket/BracketEditor";
import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getBracketEventBrackets,
  getSelectedGame,
  setSelectedGame,
  setSelectedDraw,
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
export default function EditingBracket({
  onEndView,
}: {
  onEndView: () => void;
}) {
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(getSelectedGame);
  const bracketStage = useAppSelector(getBracketEvent);
  const brackets = useAppSelector(getBracketEventBrackets);
  function cancelSelectedGame() {
    dispatch(setSelectedGame(null));
  }

  async function handleSave() {
    dispatch(updateAndSaveTournament(bracketStage));
  }

  const [bracketToEdit, setBracketToEdit] = useState<Nullable<number>>(null);
  const [showEventEditor, setShowEventEditor] = useState(false);

  return (
    <TournamentStageContextProvider stage={bracketStage}>
      <div className="fixed inset-0">
        <BracketEditor
          onBack={onEndView}
          onSave={handleSave}
          onEditBracket={(bracketIndex: number) =>
            setBracketToEdit(bracketIndex)
          }
        ></BracketEditor>
        <Slideout visible={!!selectedGame} fullHeight={false}>
          {selectedGame && (
            <BracketGameViewer
              onBack={cancelSelectedGame}
              drawTimeChildren={<EditDrawNumber gameId={selectedGame?.id} />}
            />
          )}
        </Slideout>
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
