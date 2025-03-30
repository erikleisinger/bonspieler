import ViewBracketModalController from "./ViewBracketModalController";
import BracketProvider from "@/shared/Bracket/BracketProvider";
import { BracketViewer } from "@/widgets/Bracket/BracketViewer";

export default function ViewBracketStageView({
  tournamentId,
  stageId,
}: {
  tournamentId: string;
  stageId: string;
}) {
  return (
    <>
      <BracketProvider stageId={stageId}>
        <div className="grow">
          <BracketViewer stageId={stageId} tournamentId={tournamentId} />
        </div>

        <div className="fixed sticky top-0 bottom-0 right-0 z-50 min-w-[500px] overflow-hidden pointer-events-none ">
          <ViewBracketModalController />
        </div>
      </BracketProvider>
    </>
  );
}
