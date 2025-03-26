import { client } from "@/shared/api";
import { apiSlice } from "../../model";
import { BRACKET_CONNECTIONS } from "../../keys";
export async function fetchBracketEventConnections(bracketEventId: string) {
  const { data, error } = await client
    .from("game_connections")
    .select("*")
    .eq("tournament_stage_id", bracketEventId);
  return data;
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
        const viewableConnections = connections?.reduce<ViewableConnections>(
          (acc, connection) => {
            const { id, winner, origin_game_id, destination_game_id } =
              connection;
            if (destination_game_id) {
              if (winner) {
                acc.winnerConnections[origin_game_id] = destination_game_id;
              } else {
                acc.loserConnections[origin_game_id] = destination_game_id;
              }
            }

            if (origin_game_id && destination_game_id) {
              if (!acc.originConnections[destination_game_id])
                acc.originConnections[destination_game_id] = [];
              acc.originConnections[destination_game_id].push({
                gameId: origin_game_id,
                isWinner: winner,
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
