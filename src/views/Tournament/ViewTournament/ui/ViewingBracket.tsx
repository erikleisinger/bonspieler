import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getBracketEvent, getBracketEventName } from "@/entities/BracketEvent";
import { getBracketGames } from "@/entities/Bracket/BracketGame";
import {
  getSelectedGame,
  setSelectedGame,
} from "@/widgets/Bracket/BracketViewer";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";

import BracketViewLayout from "@/shared/layouts/BracketViewLayout";
import ViewingBracketHeader from "./ViewingBracketHeader";
import { BracketGameType, scrollToGame } from "@/entities/Bracket";
export default function ViewingBracket({
  onEndView,
}: {
  onEndView: () => void;
}) {
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(getSelectedGame);
  const bracketStage = useAppSelector(getBracketEvent);
  const tournamentId = bracketStage?.tournament_id;
  const brackets = useAppSelector(getBracketGames);
  const eventName = useAppSelector(getBracketEventName);

  function cancelSelectedGame() {
    dispatch(setSelectedGame(null));
  }

  function onGameClick(game: BracketGameType) {
    dispatch(setSelectedGame(game));
    scrollToGame(game.id);
  }

  return (
    <TournamentStageContextProvider tournamentId={tournamentId}>
      <div className="absolute inset-0">
        <BracketViewLayout>
          <ViewingBracketHeader onBack={onEndView} eventName={eventName} />
          <BracketViewer tournamentId={tournamentId}></BracketViewer>
        </BracketViewLayout>

        <Slideout visible={!!selectedGame} fullHeight={false}>
          {selectedGame && <BracketGameViewer onBack={cancelSelectedGame} />}
        </Slideout>
      </div>
    </TournamentStageContextProvider>
  );
}
