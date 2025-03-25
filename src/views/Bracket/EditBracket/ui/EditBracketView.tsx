import { useAppSelector } from "@/lib/store";
import { getBracketEvent } from "@/entities/BracketEvent";
import { getBracketGames } from "@/entities/Bracket/BracketGame";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import { useSetBracketData } from "@/views/Bracket/helpers";
import BracketEditorView from "./BracketEditorView";
import BracketWizardView from "./BracketWizardView";
import { useGetTournamentStagesQuery } from "@/shared/api";
import {
  TournamentStageListItemContainer,
  TournamentStageListItemContent,
} from "@/features/Tournament/TournamentStageList";
import { getBracketStartTeams } from "../../helpers/getBracketStartTeams";
export default function EditBracketView() {
  const brackets = useAppSelector(getBracketGames);
  /** Get stage for Tournament Context */

  const bracketStage = useAppSelector(getBracketEvent);
  const { tournament_id } = bracketStage;

  const { data: stages } = useGetTournamentStagesQuery(tournament_id, {
    refetchOnMountOrArgChange: false,
    skip: !tournament_id,
  });

  const startTeams = (brackets || []).reduce(
    (all, current) => all + getBracketStartTeams(current),
    0
  );

  const thisStage = stages?.find((s) => s.id === bracketStage.id) || 0;

  const { renderBracketsFromWizard } = useSetBracketData();

  return (
    <TournamentStageContextProvider
      stage={bracketStage}
      tournamentId={tournament_id}
    >
      <div className="absolute inset-0 grid grid-cols-[auto,1fr]">
        <div className="h-full relative z-[-1]">
          <div className="absolute inset-0">
            <TournamentStageListItemContainer />
          </div>

          {thisStage && (
            <TournamentStageListItemContent
              stage={{
                ...thisStage,
                num_start_teams: startTeams,
              }}
              className="pl-4 w-[200px] m-auto"
            />
          )}
        </div>
        <div className="relative">
          {brackets?.length ? (
            <BracketEditorView offsetLeftPx={250}></BracketEditorView>
          ) : (
            <BracketWizardView onRender={renderBracketsFromWizard} />
          )}
        </div>
      </div>
    </TournamentStageContextProvider>
  );
}
