import { client, Tables } from "@/shared/api";
import { apiSlice } from "../../model";
import { BRACKET_CONNECTIONS } from "../../keys";
import {
  LoserConnections,
  OriginConnections,
  WinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";
import { formatConnectionsForSave } from "./helpers/formatConnectionsForSave";
export async function saveBracketConnectionsMutation({
  tournamentStageId,
  connections,
}: {
  tournamentStageId: string;
  connections: Tables<"game_connections">[];
}) {
  await client
    .from("game_connections")
    .delete()
    .eq("tournament_stage_id", tournamentStageId);
  const { data } = await client.from("game_connections").insert(connections);
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
          bracketStageId: stageId,
          tournamentId,
        });
        const data = await saveBracketConnectionsMutation({
          tournamentStageId: stageId,
          connections: formatted,
        });

        return { data };
      },
      invalidatesTags: (result, _, { stageId }) => {
        return [{ type: BRACKET_CONNECTIONS, id: stageId }];
      },
    }),
  }),
});
export const { useSaveBracketConnectionsMutation } = saveBracketConnections;
