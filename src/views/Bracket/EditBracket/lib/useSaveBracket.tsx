import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getBracketEvent,
  getBracketEventBrackets,
} from "@/entities/BracketEvent";
import {
  saveBracketGames,
  getBracketEventReadableIdIndex,
} from "@/entities/Bracket/BracketGame";
import { saveBracketConnections } from "@/entities/Bracket/BracketGameConnections";
import { getCurrentTournamentId } from "@/entities/Tournament";
import { saveDrawTimes, getDrawTimes } from "@/entities/DrawTime";
export default function useSaveBracket() {
  const dispatch = useAppDispatch();

  const tournamentId = useAppSelector(getCurrentTournamentId);
  const bracketStage = useAppSelector(getBracketEvent);
  const brackets = useAppSelector(getBracketEventBrackets);
  const readableIdIndex = useAppSelector(getBracketEventReadableIdIndex);
  const drawTimes = useAppSelector(getDrawTimes);

  async function save() {
    if (!bracketStage) return;
    const { id, connections } = bracketStage;
    console.log(bracketStage);
    await dispatch(
      saveBracketGames({
        tournamentId,
        bracketStageId: id,
        brackets,
        readableIdIndex,
      })
    );

    await dispatch(
      saveBracketConnections({
        tournamentId,
        bracketStageId: id,
        connections,
      })
    );
    await dispatch(
      saveDrawTimes({
        tournamentId,
        stageId: id,
        drawTimes,
      })
    );
    await dispatch(saveBracketEvent());
  }

  return {
    save,
  };
}
