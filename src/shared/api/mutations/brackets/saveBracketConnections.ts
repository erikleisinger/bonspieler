import { client, Tables } from "@/shared/api";
import { apiSlice } from "../../model";
import { BRACKET_CONNECTIONS } from "../../keys";
import {
  LoserConnections,
  OriginConnections,
  WinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";
import { formatConnectionsForSave } from "./helpers/formatConnectionsForSave";
export async function updateBracketConnectionsMutation({
  tournamentStageId,
  connections,
}: {
  tournamentStageId: string;
  connections: Tables<"game_connections">[];
}) {
  const { data } = await client.from("game_connections").upsert(connections, {
    onConflict: "origin_game_id,winner",
  });
  return data;
}

export async function insertBracketConnectionsMutation({
  tournamentStageId,
  connections,
}: {
  tournamentStageId: string;
  connections: Tables<"game_connections">[];
}) {
  const { data } = await client.from("game_connections").insert(connections);
  return data;
}

async function deleteBracketConnectionsMutation({
  tournamentStageId,
  gameIds,
}: {
  tournamentStageId: string;
  gameIds: string[];
}) {
  const { data } = await client
    .from("game_connections")
    .delete()
    .in("origin_game_id", gameIds);
  return data;
}
const saveBracketConnections = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    saveBracketConnections: build.mutation({
      queryFn: async ({
        tournamentId,
        stageId,
        connections,
        initialConnectionGameIds,
      }: {
        tournamentId: string;
        stageId: string;
        connections: {
          loserConnections: LoserConnections;
          winnerConnections: WinnerConnections;
          originConnections: OriginConnections;
        };
        initialConnectionGameIds: string[];
      }) => {
        const { toDelete, toInsert, toUpdate } = formatConnectionsForSave({
          connections,
          bracketStageId: stageId,
          tournamentId,
          initialConnectionGameIds,
        });
        const data = await Promise.all([
          updateBracketConnectionsMutation({
            tournamentStageId: stageId,
            connections: toUpdate,
          }),
          insertBracketConnectionsMutation({
            tournamentStageId: stageId,
            connections: toInsert,
          }),
          deleteBracketConnectionsMutation({
            tournamentStageId: stageId,
            connections: toDelete,
          }),
        ]);

        return { data };
      },
      invalidatesTags: (result, _, { stageId }) => {
        return [{ type: BRACKET_CONNECTIONS, id: stageId }];
      },
    }),
  }),
});
export const { useSaveBracketConnectionsMutation } = saveBracketConnections;
