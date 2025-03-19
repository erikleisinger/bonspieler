import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getSelectedGame,
  setSelectedGame,
  getBracketEvent,
  getBracketEventBrackets,
  getBracketEventName,
} from "@/entities/BracketEvent";
import { TournamentStageContextProvider } from "@/shared/TournamentStage";
import { BracketNavigator } from "@/features/Bracket/BracketNavigator";
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
  const brackets = useAppSelector(getBracketEventBrackets);
  const eventName = useAppSelector(getBracketEventName);

  function cancelSelectedGame() {
    dispatch(setSelectedGame(null));
  }

  function onGameClick(game: BracketGameType) {
    dispatch(setSelectedGame(game));
    scrollToGame(game.id);
  }

  return (
    <TournamentStageContextProvider stage={bracketStage}>
      <div className="absolute inset-0">
        <BracketViewLayout>
          <ViewingBracketHeader onBack={onEndView} eventName={eventName} />
          <BracketViewer onGameClick={onGameClick}></BracketViewer>
        </BracketViewLayout>

        <Slideout visible={!!selectedGame} fullHeight={false}>
          {selectedGame && <BracketGameViewer onBack={cancelSelectedGame} />}
        </Slideout>
        {
          <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 z-40 flex flex-col gap-2 ">
            <div className="flex gap-2 items-center justify-end">
              <BracketNavigator numBrackets={brackets?.length || 0} />
            </div>
          </div>
        }
      </div>
    </TournamentStageContextProvider>
  );
}
