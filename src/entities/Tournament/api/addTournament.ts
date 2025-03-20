/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/shared/api";
import type { Tournament, TournamentStage } from "../types";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";
import {
  formatStagesForSave,
  formatGamesForSave,
  formatGameConnectionsForSave,
} from "../lib/formatTournamentForSave";
async function addTournamentStages(
  tournamentId: string,
  stages: TournamentStage[]
) {
  const { toInsert } = formatStagesForSave(tournamentId, stages);
  const { data } = await client
    .from("tournament_stages")
    .insert(toInsert)
    .select("*");

  return data;
}

async function addTournamentGames(
  stages: TournamentStage[],
  tournamentId: string
) {
  const { toInsert } = formatGamesForSave(stages, tournamentId);
  const { data } = await client.from("games").insert(toInsert).select("*");
  return data;
}

async function addTournamentGameConnections(tournamentId: string, connections) {
  await client
    .from("game_connections")
    .delete()
    .eq("tournament_id", tournamentId);
  const { data } = await client
    .from("game_connections")
    .insert(connections)
    .select("*");
  return data;
}

export async function addTournament(params: Tournament) {
  const { name, schema } = params;
  const { stages } = schema;
  const { data: createdTournament, error } = await client
    .from("tournaments")
    .insert([
      {
        name,
      },
    ])
    .select("id")
    .single();
  const { id: tournamentId } = createdTournament;

  if (!tournamentId) {
    console.warn("no id return after tournament creation");
    return;
  }
  const insertedStages = await addTournamentStages(tournamentId, stages);
  if (!insertedStages) {
    console.warn("no stages inserted");
    return;
  }
  const stagesWithDbIds = stages.map(
    (stage: TournamentStage, index: number) => {
      const { id, ...rest } = stage;
      return {
        ...rest,
        id: insertedStages[index].id,
      };
    }
  );

  const games = await addTournamentGames(stagesWithDbIds, tournamentId);
  const idIndex = games.reduce((all, current) => {
    return {
      ...all,
      [current["temp_id"]]: current.id,
    };
  }, {});

  const connections = formatGameConnectionsForSave(
    stagesWithDbIds,
    idIndex,
    tournamentId
  );

  await addTournamentGameConnections(tournamentId, connections);

  const formattedUpdates = stagesWithDbIds.map((stage) => {
    const stageConnections = games?.reduce((all, current) => {
      const { tournament_stage_id } = current;
      if (tournament_stage_id !== stage.id) return all;
      return {
        ...all,
        [current.id]: {
          winnerTo: null,
          loserTo: null,
          teams: [
            {
              teamId: null,
              gameId: null,
              isWinner: false,
            },
            {
              teamId: null,
              gameId: null,
              isWinner: false,
            },
          ],
        },
      };
    }, {});

    connections.forEach((connection) => {
      if (!stageConnections) return;
      const { tournament_stage_id } = connection;
      if (tournament_stage_id === stage.id) {
        const { origin_game_id, destination_game_id, winner } = connection;

        if (winner && destination_game_id) {
          stageConnections[origin_game_id].winnerTo = destination_game_id;
          const i = stageConnections[destination_game_id].teams.findIndex(
            ({ gameId }) => !gameId
          );
          stageConnections[destination_game_id].teams[i].gameId =
            origin_game_id;
          stageConnections[destination_game_id].teams[i].isWinner = true;
        } else if (destination_game_id) {
          stageConnections[origin_game_id].loserTo = destination_game_id;
          const i = stageConnections[destination_game_id].teams.findIndex(
            ({ gameId }) => !gameId
          );
          stageConnections[destination_game_id].teams[i].gameId =
            origin_game_id;
        }
      }
    });
    const { id, name, ...rest } = stage;
    return {
      id,
      name,
      schema: JSON.stringify({
        ...rest,
        brackets: stage.brackets.map((bracket) => {
          return bracket.map((round) => {
            return round.map((game) => {
              const realId = games?.find(
                ({ temp_id }) => temp_id === game.id
              )?.id;
              if (realId)
                return {
                  ...game,
                  id: realId,
                };
              return game;
            });
          });
        }),
        connections: stageConnections,
        readableIdIndex: Object.entries(stage.readableIdIndex).reduce(
          (all, [tempGameId, readableId]) => {
            return {
              ...all,
              [idIndex[tempGameId]]: readableId,
            };
          },
          {}
        ),
        schedule: Object.entries(stage.schedule).reduce(
          (all, [tempGameId, schedule]) => {
            return {
              ...all,
              [idIndex[tempGameId]]: schedule,
            };
          },
          {}
        ),
      }),
    };
  });

  await client.from("tournament_stages").upsert(formattedUpdates);

  return tournamentId;
}
