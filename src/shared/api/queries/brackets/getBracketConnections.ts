import { client } from "@/shared/api";
import { apiSlice } from "../../model";
import { BRACKET_CONNECTIONS } from "../../keys";
export async function fetchBracketEventConnections(bracketEventId: string) {
  const { data, error } = await client
    .from("game_connections")
    .select(
      `
      *, 
      origin_stage_info:origin_game_id!inner(
      tournament_stage_id
      ),
      destination_stage_info:destination_game_id!inner(
      tournament_stage_id
      )
      `
    )
    .eq(`origin_stage_info.tournament_stage_id`, bracketEventId);
  const { data: prevData } = await client
    .from("game_connections")
    .select(
      `
      *, 
      origin_stage_info:origin_game_id!inner(
      tournament_stage_id
      ),
      destination_stage_info:destination_game_id!inner(
      tournament_stage_id
      )
      `
    )
    .eq(`destination_stage_info.tournament_stage_id`, bracketEventId)
    .neq("origin_stage_info.tournament_stage_id", bracketEventId);
  return [...(data || []), ...(prevData || [])];
}
const getBracketConnections = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBracketConnections: build.query({
      queryFn: async (bracketEventId: string) => {
        const connections = await fetchBracketEventConnections(bracketEventId);
        if (!connections) {
          return {
            data: {
              id: null,
              winnerConnections: {},
              loserConnections: {},
              originConnections: {},
              connections: [],
            },
          };
        }
        const viewableConnections = connections
          ?.map((c) => ({
            ...c,
            origin_stage_id: c.origin_stage_info?.tournament_stage_id || null,
            destination_stage_id:
              c.destination_stage_info?.tournament_stage_id || null,
          }))
          .reduce<ViewableConnections>(
            (acc, connection) => {
              const {
                id,
                winner,
                origin_game_id,
                destination_game_id,
                origin_stage_id,
                destination_stage_id,
              } = connection;
              if (destination_game_id) {
                if (winner) {
                  acc.winnerConnections[origin_game_id] = {
                    gameId: destination_game_id,
                    stageId: destination_stage_id,
                  };
                } else {
                  acc.loserConnections[origin_game_id] = {
                    gameId: destination_game_id,
                    stageId: destination_stage_id,
                  };
                }
              }

              if (origin_game_id && destination_game_id) {
                if (!acc.originConnections[destination_game_id])
                  acc.originConnections[destination_game_id] = [];
                acc.originConnections[destination_game_id].push({
                  gameId: origin_game_id,
                  isWinner: winner,
                  stageId: origin_stage_id,
                });
              }
              acc.connections.push(connection);
              return acc;
            },
            {
              winnerConnections: {},
              loserConnections: {},
              originConnections: {},
              connections: [],
            }
          );
        return {
          data: {
            ...viewableConnections,
            connections,
            id: connections?.id,
          },
        };
      },
      providesTags: (result, _, bracketEventId) => {
        if (result) {
          return [{ type: BRACKET_CONNECTIONS, id: bracketEventId }];
        } else {
          return [];
        }
      },
    }),
  }),
});
export const { useGetBracketConnectionsQuery } = getBracketConnections;
