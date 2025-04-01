import {
  BracketDrawTimes,
  BracketGameType,
  BracketSchedule,
  getBracketEventEndTeams,
  getBracketEventStartTeams,
} from "@/entities/Bracket";
import {
  type LoserConnections,
  type OriginConnections,
  type WinnerConnections,
  removeConnections,
  addConnections,
  getOriginConnections,
} from "@/entities/Bracket/BracketGameConnections";
import {
  initBracketGames,
  setBracketGamesSchedule,
  removeBracketGames,
  getBracketGames,
  addBracketGames,
} from "@/entities/Bracket/BracketGame";
import {
  setDrawTimes,
  addDrawTimes,
  trimDrawTimesTo,
} from "@/entities/DrawTime";

import {
  setNumTeams,
  setNumWinners,
  updateNumTeams,
  updateNumWinners,
  getBracketEventNumSheets,
} from "@/entities/BracketEvent";
import { useAppDispatch, useAppSelector } from "@/lib/store";

import { generateBracket } from "@/features/Bracket/GenerateBracket";
import { getBracketStartTeams, getBracketEndTeams } from "@/entities/Bracket";
import { scheduleTournament } from "@/shared/utils/generateTournament";
export default function useSetBracketData() {
  const dispatch = useAppDispatch();
  const currentBrackets = useAppSelector(getBracketGames);
  const currentNumSheets = useAppSelector(getBracketEventNumSheets);
  const currentOriginConnections = useAppSelector(getOriginConnections);

  async function addBracket(
    index: number,
    {
      numTeams,
      numWinners,
      isSeeded,
    }: {
      numTeams: number;
      numWinners: number[];
      isSeeded: boolean;
    }
  ) {
    const {
      brackets,
      loserConnections,
      originConnections,
      winnerConnections,
      drawTimes,
    } = generateBracket({
      numTeams,
      numWinners,
      numSheets: currentNumSheets,
      isSeeded,
      bracketIndex: index,
    });

    const { schedule: newSchedule } = scheduleTournament(
      originConnections,
      currentNumSheets
    );

    dispatch(setBracketGamesSchedule(newSchedule));

    await dispatch(
      addBracketGames({
        index,
        games: brackets,
      })
    );
    dispatch(
      addConnections({
        originConnections,
        winnerConnections,
        loserConnections,
      })
    );
    dispatch(addDrawTimes(drawTimes));
  }

  async function removeBracket(bracketIndex: number) {
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

  function renderBracketsFromWizard({
    originConnections,
    winnerConnections,
    loserConnections,
    brackets,
    drawTimes,
    schedule,
  }: {
    originConnections: OriginConnections;
    winnerConnections: WinnerConnections;
    loserConnections: LoserConnections;
    brackets: BracketGameType[][][];
    drawTimes: BracketDrawTimes;
    schedule: BracketSchedule;
  }) {
    dispatch(
      addConnections({
        originConnections,
        winnerConnections,
        loserConnections,
      })
    );
    dispatch(initBracketGames(brackets));

    dispatch(setDrawTimes(drawTimes));
    dispatch(setBracketGamesSchedule(schedule));
    dispatch(
      setNumTeams(getBracketEventStartTeams(brackets, originConnections))
    );
    dispatch(
      setNumWinners(getBracketEventEndTeams(brackets, winnerConnections))
    );
  }

  return { renderBracketsFromWizard, removeBracket, addBracket };
}
