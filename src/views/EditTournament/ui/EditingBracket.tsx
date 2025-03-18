import { TournamentStageType } from "@/entities/Tournament/types/TournamentStage";
import { BracketEditor } from "@/widgets/BracketEditor";
import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/BracketGameViewer";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getSelectedGame, setSelectedGame } from "@/entities/BracketEvent";
import { getTournamentContextForStage } from "@/shared/Tournament/getTournamentContextForStage";
import { getCurrentTournament } from "@/entities/Tournament";
import { EditDrawNumber } from "@/features/EditDrawNumber";
import { saveTournament } from "../lib";
import { getBracketEvent } from "@/entities/BracketEvent";
import {
  updateTournamentStage,
  updateAndSaveTournament,
} from "@/entities/Tournament";

export default function EditingBracket({
  onEndView,
}: {
  onEndView: () => void;
}) {
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(getSelectedGame);
  const tournament = useAppSelector(getCurrentTournament);
  const stages = tournament?.stages || [];
  const tournamentId = tournament?.id;

  const bracketStage = useAppSelector(getBracketEvent);
  function cancelSelectedGame() {
    dispatch(setSelectedGame(null));
  }

  const tournamentContext = getTournamentContextForStage(
    {
      ...bracketStage,
      type: TournamentStageType.Bracket,
    },
    stages,
    tournamentId
  );

  async function handleSave() {
    dispatch(updateAndSaveTournament(bracketStage));
  }

  return (
    <div className="fixed inset-0">
      <BracketEditor
        tournamentContext={tournamentContext}
        data={bracketStage}
        onBack={onEndView}
        onSave={handleSave}
      ></BracketEditor>
      <Slideout visible={!!selectedGame} fullHeight={false}>
        {selectedGame && (
          <BracketGameViewer
            onBack={cancelSelectedGame}
            drawTimeChildren={<EditDrawNumber gameId={selectedGame?.id} />}
          />
        )}
      </Slideout>
    </div>
  );
}
