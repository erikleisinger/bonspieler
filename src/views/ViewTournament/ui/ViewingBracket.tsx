import { TournamentBracketStage } from "@/entities/Tournament/types/TournamentStage";
import { BracketViewer } from "@/widgets/BracketViewer";
import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/BracketGameViewer";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getSelectedGame, setSelectedGame } from "@/entities/BracketEvent";

export default function ViewingBracket({
  bracketStage,
  onEndView,
}: {
  bracketStage: TournamentBracketStage;
  onEndView: () => void;
}) {
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(getSelectedGame);

  function cancelSelectedGame() {
    dispatch(setSelectedGame(null));
  }
  return (
    <div className="fixed inset-0">
      <BracketViewer stage={bracketStage} onBack={onEndView}></BracketViewer>
      <Slideout visible={!!selectedGame} fullHeight={false}>
        {selectedGame && <BracketGameViewer onBack={cancelSelectedGame} />}
      </Slideout>
    </div>
  );
}
