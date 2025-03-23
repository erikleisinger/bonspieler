import { useAppDispatch, useAppSelector } from "@/lib/store";

import { getBracketEvent } from "@/entities/BracketEvent";
/**
 * Bracket id & tournament id
 */

import {
  getBracketEventId,
  getBracketEventTournamentId,
  getBracketEventName,
  getBracketEventNumTeams,
  getBracketEventNumWinners,
} from "@/entities/BracketEvent";

/**
 * Connections
 */
import { useSaveBracketConnectionsMutation } from "@/shared/api";
import {
  getLoserConnections,
  getWinnerConnections,
  getOriginConnections,
} from "@/entities/Bracket/BracketGameConnections";

/**
 * Games
 */

import {
  useSaveBracketGamesMutation,
  useDeleteBracketGamesMutation,
  useDeleteBracketConnectionsMutation,
  useUpdateTournamentStageMutation,
} from "@/shared/api";
import {
  getBracketGames,
  getBracketGamesSchedule,
  getBracketGamesReadableIdIndex,
  getRemovedGameIds,
} from "@/entities/Bracket/BracketGame";

export default function useSaveBracket() {
  const dispatch = useAppDispatch();
  const bracketId = useAppSelector(getBracketEventId);
  const tournamentId = useAppSelector(getBracketEventTournamentId);
  const loserConnections = useAppSelector(getLoserConnections);
  const winnerConnections = useAppSelector(getWinnerConnections);
  const originConnections = useAppSelector(getOriginConnections);
  const brackets = useAppSelector(getBracketGames);
  const schedule = useAppSelector(getBracketGamesSchedule);
  const readableIdIndex = useAppSelector(getBracketGamesReadableIdIndex);
  const removedGameIds = useAppSelector(getRemovedGameIds);

  const bracketName = useAppSelector(getBracketEventName);
  const numTeams = useAppSelector(getBracketEventNumTeams);
  const numWinners = useAppSelector(getBracketEventNumWinners);

  const [saveConnections] = useSaveBracketConnectionsMutation();
  const [saveGames] = useSaveBracketGamesMutation();
  const [deleteGames] = useDeleteBracketGamesMutation();
  const [deleteConnections] = useDeleteBracketConnectionsMutation();
  const [updateStage] = useUpdateTournamentStageMutation();

  async function save() {
    await deleteGames({
      bracketStageId: bracketId,
      idsArray: removedGameIds,
    });

    await saveGames({
      tournamentId,
      bracketStageId: bracketId,
      brackets,
      schedule,
      readableIdIndex,
    });

    await deleteConnections({
      bracketStageId: bracketId,
      idsArray: removedGameIds,
    });

    const connections = {
      loserConnections,
      winnerConnections,
      originConnections,
    };
    await saveConnections({
      stageId: bracketId,
      tournamentId,
      connections,
    });

    await updateStage({
      tournamentStageId: bracketId,
      updates: {
        name: bracketName,
        num_start_teams: numTeams,
        num_end_teams: numWinners,
      },
    });
  }

  return {
    save,
  };
}
