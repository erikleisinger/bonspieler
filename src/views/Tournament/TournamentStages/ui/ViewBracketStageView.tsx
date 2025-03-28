import ViewBracketModalController from "./ViewBracketModalController";

import LoadBracketViewOnly from "@/widgets/Bracket/BracketViewer/ui/LoadBracketViewOnly";

export default function ViewBracketStageView({ stageId }: { stageId: string }) {
  return (
    <>
      <div className="grow">
        <LoadBracketViewOnly stageId={stageId} />
      </div>

      <div className="fixed sticky top-0 bottom-0 right-0 z-50 min-w-[500px] overflow-hidden pointer-events-none ">
        <ViewBracketModalController />
      </div>
    </>
  );
}
