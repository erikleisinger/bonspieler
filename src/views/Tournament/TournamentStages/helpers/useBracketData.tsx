import { useAppSelector } from "@/lib/store";
import {
  getBracketEventNumSheets,
  getBracketEventNumTeams,
  getLookingToAssignTeam,
  getBracketEventOrder,
} from "@/entities/BracketEvent";
import {
  getLoserConnections,
  getWinnerConnections,
  getOriginConnections,
} from "@/entities/Bracket/BracketGameConnections";

import {
  getBracketGames,
  getBracketGamesSchedule,
  getBracketGameIndex,
} from "@/entities/Bracket/BracketGame";
import {
  getSelectedGame,
  getViewingNextRoundGameConnection,
} from "@/widgets/Bracket/BracketViewer";
import { getDrawTimes } from "@/entities/DrawTime";
import { getBracketEvent } from "@/entities/BracketEvent";
import { isLookingForLoserConnection } from "@/widgets/Bracket/BracketEditor";
import { useGetTournamentStagesQuery } from "@/shared/api";

export default function useBracketData() {
  const selectedGame = useAppSelector(getSelectedGame);
  const bracketStage = useAppSelector(getBracketEvent);
  const bracketStageId = bracketStage?.id;
  const brackets = useAppSelector(getBracketGames);
  const numSheets = useAppSelector(getBracketEventNumSheets);
  const numTeams = useAppSelector(getBracketEventNumTeams);
  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);
  const tournamentId = bracketStage?.tournament_id;
  const drawTimes = useAppSelector(getDrawTimes);
  const schedule = useAppSelector(getBracketGamesSchedule);
  const winnerConnections = useAppSelector(getWinnerConnections);
  const loserConnections = useAppSelector(getLoserConnections);
  const originConnections = useAppSelector(getOriginConnections);
  const gameIndex = useAppSelector(getBracketGameIndex);
  const lookingForLoserConnection = useAppSelector(isLookingForLoserConnection);
  const viewingNextRoundGameConnection = useAppSelector(
    getViewingNextRoundGameConnection
  );
  const order = useAppSelector(getBracketEventOrder);

  const { data: stages = [] } = useGetTournamentStagesQuery(tournamentId, {
    skip: !tournamentId,
    refetchOnMountOrArgChange: true,
  });

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
    drawTimes,
    schedule,
    winnerConnections,
    loserConnections,
    originConnections,
    gameIndex,
    lookingForLoserConnection,
    viewingNextRoundGameConnection,
    tournamentId,
    bracketStageId,
  };
}
