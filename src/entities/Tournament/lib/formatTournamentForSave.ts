import { BracketGameType } from "@/entities/Bracket";
import {
  type TournamentStage,
  TournamentStageType,
  type Tournament,
} from "../types";
import type { Tables } from "@/shared/api";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";
export function formatStagesForSave(
  tournamentId: string,
  stages: TournamentStage[]
) {
  function isDraftStage(stageId: string) {
    return stageId.split("DRAFT-").length === 2;
  }

  const formattedStages = stages.map((stage) => {
    const { id, name, order, numTeams, numWinners, ...rest } = stage;
    const formatted = {
      tournament_id: tournamentId,
      name,
      order,
      num_start_teams: numTeams,
      num_end_teams: getTotalBracketWinners(numWinners),
      schema: JSON.stringify({
        ...rest,
        numWinners,
      }),
    };
    if (!isDraftStage(id)) {
      formatted[id] = id;
    }
    return formatted;
  });

  return {
    toUpdate: formattedStages.filter((stage) => stage.id),
    toInsert: formattedStages.filter((stage) => !stage.id),
  };
}

export function formatGamesForSave(
  stages: TournamentStage[],
  tournamentId: string
) {
  function isDraftGame(game: BracketGameType) {
    return game.id.split("game-").length === 2;
  }
  const games = [];
  stages.forEach((stage) => {
    const { type } = stage;
    if (type === TournamentStageType.Bracket) {
      const { brackets, readableIdIndex } = stage;
      brackets
        .flat()
        .flat()
        .forEach((game: BracketGameType) => {
          const { id, isSeed } = game;
          const formatted = {
            is_seed: isSeed,
            tournament_stage_id: stage.id,
            readable_id: readableIdIndex[id],
            tournament_id: tournamentId,
          };
          if (!isDraftGame(game)) {
            formatted[id] = id;
          } else {
            formatted["temp_id"] = id;
          }
          games.push(formatted);
        });
    }
  });
  return {
    toUpdate: games.filter((game) => !!game.id),
    toInsert: games.filter((games) => !games.id),
  };
}

export function formatGameConnectionsForSave(
  stages: TournamentStage[],
  idIndex: {
    [tempId: string]: string;
  },
  tournamentId: string
) {
  const connectionsToAdd = [];

  stages.forEach((stage) => {
    const { connections } = stage;
    Object.entries(connections).forEach(([tempId, connection]) => {
      const { winnerTo, loserTo, teams } = connection;

      if (winnerTo) {
        connectionsToAdd.push({
          winner: true,
          origin_game_id: idIndex[tempId],
          destination_game_id: idIndex[winnerTo],
          tournament_stage_id: stage.id,
          tournament_id: tournamentId,
        });
      } else {
        connectionsToAdd.push({
          winner: false,
          origin_game_id: idIndex[tempId],
          destination_game_id: idIndex[loserTo],
          tournament_stage_id: stage.id,
          tournament_id: tournamentId,
        });
      }
    });
  });

  return connectionsToAdd;
}

export function formatTournamentForSave(tournament: Tournament) {
  const stages = formatStagesForSave(tournament);
}
