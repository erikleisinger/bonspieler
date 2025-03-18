import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getSelectedGame,
  setSelectedGame,
  getBracketEvent,
} from "@/entities/BracketEvent";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
export default function ViewingBracket({
  onEndView,
}: {
  onEndView: () => void;
}) {
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(getSelectedGame);
  const bracketStage = useAppSelector(getBracketEvent);

  function cancelSelectedGame() {
    dispatch(setSelectedGame(null));
  }
  return (
    <TournamentStageContextProvider stage={bracketStage}>
      <div className="fixed inset-0">
        <BracketViewer onBack={onEndView}></BracketViewer>
        <Slideout visible={!!selectedGame} fullHeight={false}>
          {selectedGame && <BracketGameViewer onBack={cancelSelectedGame} />}
        </Slideout>
      </div>
    </TournamentStageContextProvider>
  );
}
