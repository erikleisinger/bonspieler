import { useAppSelector } from "@/lib/store";
import {
  getBracketEventNumSheets,
  getBracketEventNumTeams,
  getLookingToAssignTeam,
} from "@/entities/BracketEvent";
import {
  getLoserConnections,
  getWinnerConnections,
  getOriginConnections,
} from "@/entities/Bracket/BracketGameConnections";

import { getCurrentTournamentId } from "@/entities/Tournament";
import {
  getBracketGames,
  getBracketGamesReadableIdIndex,
  getBracketGamesSchedule,
  getBracketGameIndex,
} from "@/entities/Bracket/BracketGame";
import { getSelectedGame } from "@/widgets/Bracket/BracketViewer";
import { getDrawTimes } from "@/entities/DrawTime";
import { getBracketEvent } from "@/entities/BracketEvent";

import { getAvailableDrawsForBracketGame } from "@/features/EditDrawNumber";

export default function useBracketData() {
  const selectedGame = useAppSelector(getSelectedGame);
  const bracketStage = useAppSelector(getBracketEvent);
  const brackets = useAppSelector(getBracketGames);
  const numSheets = useAppSelector(getBracketEventNumSheets);
  const numTeams = useAppSelector(getBracketEventNumTeams);
  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);
  const tournamentId = useAppSelector(getCurrentTournamentId);
  const readableIdIndex = useAppSelector(getBracketGamesReadableIdIndex);
  const drawTimes = useAppSelector(getDrawTimes);
  const schedule = useAppSelector(getBracketGamesSchedule);
  const winnerConnections = useAppSelector(getWinnerConnections);
  const loserConnections = useAppSelector(getLoserConnections);
  const originConnections = useAppSelector(getOriginConnections);
  const gameIndex = useAppSelector(getBracketGameIndex);

  // const availableDrawTimes: number[] = getAvailableDrawsForBracketGame({
  //   gameId: selectedGame?.id,
  //   schedule,
  //   winnerConnections,
  //   loserConnections,
  //   originConnections,
  // });
  const availableDrawTimes = [];

  return {
    availableDrawTimes,
    selectedGame,
    bracketStage,
    brackets,
    numSheets,
    numTeams,
    lookingToAssignTeam,
    tournamentId,
    readableIdIndex,
    drawTimes,
    schedule,
    winnerConnections,
    loserConnections,
    originConnections,
    gameIndex,
  };
}
