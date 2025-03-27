import { useAppSelector } from "@/lib/store";
import { getBracketEvent, getBracketEventId } from "@/entities/BracketEvent";
import { getBracketGames } from "@/entities/Bracket/BracketGame";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import { useSetBracketData } from "@/views/Bracket/helpers";
import BracketEditorView from "./BracketEditorView";
import BracketWizardView from "./BracketWizardView";
import {
  useGetTournamentStagesQuery,
  useGetTournamentStageByIdQuery,
} from "@/shared/api";
import {
  TournamentStageList2,
  TournamentStageListItem,
  TournamentStageListItemContainer,
  TournamentStageListItemContent,
  TournamentStageSelectionList,
} from "@/features/Tournament/TournamentStageList";
import { getBracketStartTeams, getBracketEndTeams } from "@/entities/Bracket";
import { EditStageName } from "@/features/Stage/EditStageName";
import { useState } from "react";
import { LoadBracket } from "@/widgets/Bracket/BracketEditor";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import Typography from "@/shared/ui/typography";

export default function EditBracketView({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const brackets = useAppSelector(getBracketGames);
  /** Get stage for Tournament Context */

  const { data: stages } = useGetTournamentStagesQuery(tournamentId, {
    refetchOnMountOrArgChange: false,
    skip: !tournamentId,
  });

  // const startTeams = (brackets || []).reduce(
  //   (all, current) => all + getBracketStartTeams(current),
  //   0
  // );
  // const endTeams = (brackets || []).reduce(
  //   (all, current) => all + getBracketEndTeams(current),
  //   0
  // );

  const [selectedStage, setSelectedStage] = useState(null);

  const { renderBracketsFromWizard } = useSetBracketData();

  return !selectedStage ? (
    <div className="w-fit m-auto max-w-screen">
      <TournamentStageList2 stages={stages} onEditStage={setSelectedStage} />
    </div>
  ) : (
    <div className="relative grow h-full">
      <LoadBracket stageId={selectedStage.id}>
        <TournamentStageContextProvider
          stage={selectedStage}
          tournamentId={tournamentId}
        >
          <div className="absolute inset-0 grid grid-cols-[auto,1fr] pointer-events-none">
            <div className="h-full relative   z-50 pointer-events-none backdrop-blur-sm">
              <div className="absolute inset-0 pointer-events-none">
                <TournamentStageListItemContainer />
              </div>
              <div className="p-4 py-2 relative pointer-events-auto ">
                <div className=" flex items-center mb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedStage(null)}
                  >
                    <FaArrowLeft />
                  </Button>
                  <Typography tag="overline" className="px-4 ">
                    Viewing Stage
                  </Typography>
                </div>
                <div>
                  <TournamentStageSelectionList
                    stages={stages}
                    selectedStage={selectedStage}
                    onSelectStage={setSelectedStage}
                  />
                </div>

                {selectedStage && (
                  <div className="px-4 mt-4">
                    <Typography tag="h2">{selectedStage.name}</Typography>
                  </div>
                )}
              </div>
            </div>
            <div className="relative z-40">
              {brackets?.length ? (
                <BracketEditorView
                  offsetLeftPx={250}
                  tournamentId={tournamentId}
                  bracketStageId={selectedStage.id}
                ></BracketEditorView>
              ) : (
                <div className="pointer-events-auto">
                  {" "}
                  <BracketWizardView onRender={renderBracketsFromWizard} />
                </div>
              )}
            </div>
          </div>
        </TournamentStageContextProvider>
      </LoadBracket>
    </div>
  );
}
