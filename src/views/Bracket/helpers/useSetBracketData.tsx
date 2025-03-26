import {
  BracketDrawTimes,
  BracketGameType,
  BracketReadableIdIndex,
  BracketSchedule,
} from "@/entities/Bracket";
import {
  LoserConnections,
  OriginConnections,
  WinnerConnections,
  removeConnections,
  addConnections,
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
  setConnections,
  getOriginConnections,
} from "@/entities/Bracket/BracketGameConnections";
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
import { scheduleTournament } from "@erikleisinger/bracket-generator";
import { flattenConnections } from "@/entities/Bracket/BracketGameConnections";
export default function useSetBracketData() {
  const dispatch = useAppDispatch();
  const brackets = useAppSelector(getBracketGames);
  const numSheets = useAppSelector(getBracketEventNumSheets);
  const currentOriginConnections = useAppSelector(getOriginConnections);

  async function addBracket({
    numTeams,
    numWinners,
    isSeeded,
  }: {
    numTeams: number;
    numWinners: number[];
    isSeeded: boolean;
  }) {
    const {
      brackets: newBrackets,
      loserConnections,
      originConnections,
      winnerConnections,
      drawTimes,
    } = generateBracket({
      numTeams,
      numWinners,
      numSheets,
      isSeeded,
      bracketIndex: brackets.length,
    });

    const { schedule: newSchedule } = scheduleTournament(
      flattenConnections({
        brackets: [...brackets, ...newBrackets],
        originConnections: {
          ...currentOriginConnections,
          ...originConnections,
        },
      }),
      numSheets
    );

    console.log("newSchedule", newSchedule);

    dispatch(setBracketGamesSchedule(newSchedule));

    await dispatch(addBracketGames(newBrackets));
    dispatch(updateNumTeams(numTeams));
    dispatch(updateNumWinners(numWinners.reduce((a, c) => a + c, 0)));
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
    const bracket = brackets[bracketIndex];
    const startTeams = getBracketStartTeams(bracket);
    const endTeams = getBracketEndTeams(bracket);
    const gameIds = bracket
      .flat()

      .map(({ id }) => id);
    await dispatch(removeConnections(gameIds));
    await dispatch(removeBracketGames(bracketIndex));
    dispatch(updateNumTeams(startTeams * -1));
    dispatch(updateNumWinners(endTeams * -1));

    const { schedule: newSchedule, draws } = scheduleTournament(
      flattenConnections({
        brackets,
        originConnections: currentOriginConnections,
      }),
      numSheets
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
    numTeams,
    numWinners,
  }: {
    originConnections: OriginConnections;
    winnerConnections: WinnerConnections;
    loserConnections: LoserConnections;
    brackets: BracketGameType[][][];
    readableIdIndex: BracketReadableIdIndex;
    gameIndex: {
      [gameId: string]: BracketGameType;
    };
    drawTimes: BracketDrawTimes;
    schedule: BracketSchedule;
    numTeams: number;
    numWinners: number[];
  }) {
    dispatch(
      setConnections({ originConnections, winnerConnections, loserConnections })
    );
    dispatch(initBracketGames(brackets));

    dispatch(setDrawTimes(drawTimes));
    dispatch(setBracketGamesSchedule(schedule));
    dispatch(setNumTeams(numTeams));
    dispatch(setNumWinners(numWinners.reduce((a, c) => a + c, 0)));
  }

  return { renderBracketsFromWizard, removeBracket, addBracket };
}
