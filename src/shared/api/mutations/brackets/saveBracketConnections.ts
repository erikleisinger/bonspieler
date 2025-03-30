import { client, Tables } from "@/shared/api";
import { apiSlice } from "../../model";
import { BRACKET_CONNECTIONS } from "../../keys";
import {
  LoserConnections,
  OriginConnections,
  WinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";
import { formatConnectionsForSave } from "./helpers/formatConnectionsForSave";
export async function saveBracketConnectionsMutation(
  connections: Tables<"game_connections">[]
) {
  const { data } = await client.from("game_connections").upsert(connections, {
    onConflict: "origin_game_id,winner",
  });

  return data;
}
const saveBracketConnections = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    saveBracketConnections: build.mutation({
      queryFn: async ({
        tournamentId,
        stageId,
        connections,
      }: {
        tournamentId: string;
        stageId: string;
        connections: {
          loserConnections: LoserConnections;
          winnerConnections: WinnerConnections;
          originConnections: OriginConnections;
        };
      }) => {
        const formatted = formatConnectionsForSave({
          connections,
          tournamentId,
        });
        const data = await saveBracketConnectionsMutation(formatted);

        return { data };
      },
      invalidatesTags: (result, _, { stageId }) => {
        return [{ type: BRACKET_CONNECTIONS, id: stageId }];
      },
    }),
  }),
});
export const { useSaveBracketConnectionsMutation } = saveBracketConnections;
