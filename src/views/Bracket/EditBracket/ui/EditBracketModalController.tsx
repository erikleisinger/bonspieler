import { BracketEditorToolbarState } from "@/widgets/Bracket/BracketEditorToolbar";
import { BracketEventOptions } from "@/widgets/Bracket/BracketEventOptions";
import { BracketScheduler } from "@/widgets/Bracket/BracketScheduler";
import { AddBracketOptions } from "@/widgets/Bracket/AddBracket";
import Slideout from "@/shared/ui/slide-out";
import Typography from "@/shared/ui/typography";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { AssignTeams } from "@/widgets/Bracket/AssignTeams";
import { BracketOptions } from "@/widgets/Bracket/BracketOptions";
export default function EditBracketModalController({
  setState,
  state,
}: {
  nudgeLeftPx?: number;
  setState: (state: BracketEditorToolbarState) => void;
  state: BracketEditorToolbarState;
}) {
  return (
    <>
      <div className="pointer-events-auto">
        <Slideout
          fullHeight={true}
          visible={state === BracketEditorToolbarState.ViewingEvent}
        >
          <BracketEventOptions onClose={() => setState(null)} />
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
          <AddBracketOptions />
        </Slideout>
        <Slideout
          fullHeight={true}
          visible={state === BracketEditorToolbarState.ViewingGame}
        >
          {state === BracketEditorToolbarState.ViewingGame && (
            <BracketGameViewer />
          )}
        </Slideout>
        <Slideout
          fullHeight={true}
          visible={state === BracketEditorToolbarState.ViewingBracket}
        >
          <BracketOptions />
        </Slideout>
      </div>
    </>
  );
}
