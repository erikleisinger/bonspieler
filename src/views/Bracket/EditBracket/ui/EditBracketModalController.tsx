import { BracketEditorToolbarState } from "@/widgets/Bracket/BracketEditorToolbar";
import { BracketEventOptions } from "@/widgets/Bracket/BracketEventOptions";
import { BracketScheduler } from "@/widgets/Bracket/BracketScheduler";
import { AddBracketOptions } from "@/widgets/Bracket/AddBracket";
import Slideout from "@/shared/ui/slide-out";
import Typography from "@/shared/ui/typography";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { AssignTeams } from "@/widgets/Bracket/AssignTeams";
import { BracketOptions } from "@/widgets/Bracket/BracketOptions";
import { useSaveBracket } from "../lib";
import { EditDrawNumber } from "@/features/EditDrawNumber";
import { useBracketData, useSetBracketData } from "../../helpers";
import { BracketGameType } from "@/entities/Bracket";
import { useAppDispatch } from "@/lib/store";
import { setLookingForLoserConnection } from "@/widgets/Bracket/BracketEditor";
import { removeLoserConnectionForGame } from "@/entities/Bracket/BracketGameConnections";
export default function EditBracketModalController({
  setState,
  state,
}: {
  nudgeLeftPx?: number;
  setState: (state: BracketEditorToolbarState) => void;
  state: BracketEditorToolbarState;
}) {
  const dispatch = useAppDispatch();

  const { save: saveBracket } = useSaveBracket();

  const { availableDrawTimes, brackets, selectedGame } = useBracketData();
  const { removeBracket, addBracket } = useSetBracketData();

  function handleRemoveBracket(bracketIndex: number) {
    removeBracket(bracketIndex);
  }

  function handleAddBracket({
    numTeams,
    numWinners,
    isSeeded,
  }: {
    numTeams: number;
    numWinners: number[];
    isSeeded: boolean;
  }) {
    addBracket({
      numTeams,
      numWinners,
      isSeeded,
    });

    setState(null);
  }

  function lookForLoserConnection(game: BracketGameType) {
    dispatch(setLookingForLoserConnection(game));
  }
  const handleLookForLoserConnection = !selectedGame
    ? null
    : selectedGame?.bracketNumber === brackets.length - 1
    ? null
    : lookForLoserConnection;

  function handleRemoveLoserConnection(game: BracketGameType) {
    if (!game?.id) return;
    dispatch(removeLoserConnectionForGame(game.id));
  }

  return (
    <>
      <div className="pointer-events-auto">
        <Slideout
          fullHeight={true}
          visible={state === BracketEditorToolbarState.ViewingEvent}
        >
          <BracketEventOptions
            onClose={() => setState(null)}
            onSave={saveBracket}
          />
        </Slideout>
        <Slideout
          fullHeight={true}
          visible={state === BracketEditorToolbarState.ViewingSchedule}
        >
          <div className="p-4">
            <header className="p-2 px-2">
              <Typography tag="h2">Schedule</Typography>
            </header>

            <BracketScheduler />
          </div>
        </Slideout>
        <Slideout
          fullHeight={true}
          visible={state === BracketEditorToolbarState.ViewingTeams}
        >
          <div className="p-4">
            <header className="p-2 px-2">
              <Typography tag="h2">Team Assignment</Typography>
            </header>

            <AssignTeams />
          </div>
        </Slideout>
        <Slideout
          fullHeight={true}
          visible={state === BracketEditorToolbarState.AddingBracket}
        >
          <AddBracketOptions onAdd={handleAddBracket} />
        </Slideout>
        <Slideout
          fullHeight={true}
          visible={state === BracketEditorToolbarState.ViewingGame}
        >
          {state === BracketEditorToolbarState.ViewingGame && selectedGame && (
            <BracketGameViewer
              onEditLoserConnection={handleLookForLoserConnection}
              onRemoveLoserConnection={handleRemoveLoserConnection}
              drawTimeChildren={
                <EditDrawNumber availableDrawTimes={availableDrawTimes} />
              }
            />
          )}
        </Slideout>
        <Slideout
          fullHeight={true}
          visible={state === BracketEditorToolbarState.ViewingBracket}
        >
          <BracketOptions
            brackets={brackets}
            removeBracket={handleRemoveBracket}
          />
        </Slideout>
      </div>
    </>
  );
}
