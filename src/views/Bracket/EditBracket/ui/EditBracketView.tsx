import { useAppSelector } from "@/lib/store";
import type { GeneratedBracket } from "@/features/Bracket/GenerateBracket";
import { getBracketEvent } from "@/entities/BracketEvent";
import { getBracketGames } from "@/entities/Bracket/BracketGame";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import { useSetBracketData } from "@/views/Bracket/helpers";
import BracketEditorView from "./BracketEditorView";
import BracketWizardView from "./BracketWizardView";
export default function EditBracketView() {
  const brackets = useAppSelector(getBracketGames);
  /** Get stage for Tournament Context */

  const bracketStage = useAppSelector(getBracketEvent);

  const { renderBracketsFromWizard } = useSetBracketData();

  return (
    <TournamentStageContextProvider stage={bracketStage}>
      {brackets?.length ? (
        <BracketEditorView />
      ) : (
        <BracketWizardView onRender={renderBracketsFromWizard} />
      )}
    </TournamentStageContextProvider>
  );
}
