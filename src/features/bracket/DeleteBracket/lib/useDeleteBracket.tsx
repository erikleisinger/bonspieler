import {
  getOriginConnections,
  removeConnections,
} from "@/entities/Bracket/BracketGameConnections";
import { getBracketEventNumSheets } from "@/entities/BracketEvent";
import {
  getBracketGames,
  removeBracketGames,
  setBracketGamesSchedule,
} from "@/entities/Bracket/BracketGame";
import { scheduleTournament } from "@/shared/utils/generateTournament";
import { trimDrawTimesTo } from "@/entities/DrawTime";
import { useAppDispatch, useAppSelector } from "@/lib/store";

export default function useDeleteBracket() {
  const dispatch = useAppDispatch();

  const currentBrackets = useAppSelector(getBracketGames);
  const currentNumSheets = useAppSelector(getBracketEventNumSheets);
  const currentOriginConnections = useAppSelector(getOriginConnections);

  async function deleteBracket(bracketIndex: number) {
    const bracket = currentBrackets[bracketIndex];
    const gameIds = bracket
      .flat()

      .map(({ id }) => id);
    await dispatch(removeConnections(gameIds));
    await dispatch(removeBracketGames(bracketIndex));

    if (currentBrackets.length <= 2) return;
    const { schedule: newSchedule, draws } = scheduleTournament(
      currentOriginConnections,
      currentNumSheets
    );

    const scheduleWithNoEmptyDrawTimes = Object.entries(newSchedule).reduce(
      (all, [key, value]) => {
        if (!value) return all;
        return {
          ...all,
          [key]: value,
        };
      },
      {}
    );
    dispatch(setBracketGamesSchedule(scheduleWithNoEmptyDrawTimes));
    dispatch(trimDrawTimesTo(draws.length));
  }

  return {
    deleteBracket,
  };
}
