import { client } from "@/shared/api";
import { apiSlice } from "@/shared/api";
import { BRACKET_CONNECTIONS } from "../../keys";

async function deleteBracketConnectionsFromDb(idArray: string[]) {
  const { data } = await client
    .from("game_connections")
    .delete()
    .in("id", idArray)
    .select("id");
  return data;
}

const deleteBracketConnections = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    deleteBracketConnections: build.mutation({
      queryFn: async ({
        idsArray,
        bracketStageId,
      }: {
        idsArray: string[];
        bracketStageId: string;
      }) => {
        const data = await deleteBracketConnectionsFromDb(idsArray);
        return { data };
      },
      invalidatesTags: (result, _, { bracketStageId }) => {
        return [{ type: BRACKET_CONNECTIONS, id: bracketStageId }];
      },
    }),
  }),
});

export const { useDeleteBracketConnectionsMutation } = deleteBracketConnections;
