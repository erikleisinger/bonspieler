import { useAppSelector } from "@/lib/store";
import { getBracketGames } from "@/entities/Bracket/BracketGame";
import { useSetBracketData } from "@/views/Bracket/helpers";
import BracketEditorView from "./BracketEditorView";
import BracketWizardView from "./BracketWizardView";
import { LoadBracket } from "@/widgets/Bracket/BracketEditor";
export default function EditBracketView({
  stageId,
  tournamentId,
}: {
  stageId: string;
  tournamentId: string;
}) {
  const brackets = useAppSelector(getBracketGames);

  const { renderBracketsFromWizard } = useSetBracketData();

  return (
    <LoadBracket stageId={stageId}>
      {brackets?.length ? (
        <BracketEditorView
          offsetLeftPx={250}
          tournamentId={tournamentId}
          bracketStageId={stageId}
        ></BracketEditorView>
      ) : (
        <div className="pointer-events-auto">
          <BracketWizardView onRender={renderBracketsFromWizard} />
        </div>
      )}
    </LoadBracket>
  );
}
