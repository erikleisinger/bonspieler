import { useAppDispatch, useAppSelector } from "@/lib/store";

import {
  getBracketEventEndTeams,
  getBracketEventStartTeams,
} from "@/entities/Bracket";
/**
 * Bracket id & tournament id
 */

import {
  getBracketEventId,
  getBracketEventTournamentId,
  getBracketEventName,
  setNumTeams,
  setNumWinners,
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
  resetRemovedGameIds,
} from "@/entities/Bracket/BracketGame";
import {} from "../../helpers";

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

  const [saveConnections] = useSaveBracketConnectionsMutation();
  const [saveGames] = useSaveBracketGamesMutation();
  const [deleteGames] = useDeleteBracketGamesMutation();
  const [deleteConnections] = useDeleteBracketConnectionsMutation();
  const [updateStage] = useUpdateTournamentStageMutation();

  async function save() {
    await saveGames({
      tournamentId,
      bracketStageId: bracketId,
      brackets,
      schedule,
      readableIdIndex,
    });

    dispatch(resetRemovedGameIds());

    await saveConnections({
      tournamentId,
      stageId: bracketId,
      connections: {
        originConnections,
        winnerConnections,
        loserConnections,
      },
    });

    const startTeams = getBracketEventStartTeams(brackets);
    const endTeams = getBracketEventEndTeams(brackets);
    await updateStage({
      tournamentStageId: bracketId,
      updates: {
        name: bracketName,
        num_start_teams: startTeams,
        num_end_teams: endTeams,
      },
    });
    dispatch(setNumTeams(startTeams));
    dispatch(setNumWinners(endTeams));
  }

  return {
    save,
  };
}
