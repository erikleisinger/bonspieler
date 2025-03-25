import { client } from "@/shared/api";
import { TOURNAMENT_STAGES } from "@/shared/api/keys";
import { apiSlice } from "@/shared/api";
import { reorderStages } from "./reorderStages";
async function removeTournamentStagesMutation(
  tournamentId: string,
  tournamentStageIds: string[]
) {
  const { data } = await client
    .from("tournament_stages")
    .delete()
    .in("id", tournamentStageIds);
  return data;
}

const removeTournamentStages = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    removeTournamentStages: builder.mutation({
      queryFn: async ({
        tournamentId,
        tournamentStageIds,
      }: {
        tournamentId: string;
        tournamentStageIds: string[];
      }) => {
        const data = await removeTournamentStagesMutation(
          tournamentId,
          tournamentStageIds
        );
        return { data };
      },
      invalidatesTags: (result, _, { tournamentId }) => {
        return [{ type: TOURNAMENT_STAGES, id: tournamentId }];
      },
    }),
  }),
});

export const { useRemoveTournamentStagesMutation } = removeTournamentStages;
