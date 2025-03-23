import { client } from "@/shared/api";
import { apiSlice } from "@/shared/api";
import { BRACKET_GAMES } from "../../keys";

async function deleteBracketGamesFromDb(idArray: string[]) {
  const { data } = await client
    .from("games")
    .delete()
    .in("id", idArray)
    .select("id");
  return data;
}

const deleteBracketGames = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    deleteBracketGames: build.mutation({
      queryFn: async ({
        idsArray,
        bracketStageId,
      }: {
        idsArray: string[];
        bracketStageId: string;
      }) => {
        const data = await deleteBracketGamesFromDb(idsArray);
        return { data };
      },
      invalidatesTags: (result, _, { bracketStageId }) => {
        return [{ type: BRACKET_GAMES, id: bracketStageId }];
      },
    }),
  }),
});

export const { useDeleteBracketGamesMutation } = deleteBracketGames;
