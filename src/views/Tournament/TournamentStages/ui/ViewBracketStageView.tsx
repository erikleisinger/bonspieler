import ViewBracketModalController from "./ViewBracketModalController";
import BracketProvider from "@/shared/Bracket/BracketProvider";
import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import { useBracketEditorToolbarState } from "@/widgets/Bracket/BracketEditorToolbar";
export default function ViewBracketStageView({
  tournamentId,
  stageId,
}: {
  tournamentId: string;
  stageId: string;
}) {
  const { toolbarState } = useBracketEditorToolbarState();
  return (
    <>
      <BracketProvider stageId={stageId}>
        <div className="grow flex">
          <BracketViewer
            tournamentId={tournamentId}
            className={!!toolbarState ? "pr-[500px]" : ""}
          />
        </div>

        <div className="fixed sticky top-0 bottom-0 right-0 z-50 min-w-[500px] overflow-hidden pointer-events-none ">
          <ViewBracketModalController />
        </div>
      </BracketProvider>
    </>
  );
}
