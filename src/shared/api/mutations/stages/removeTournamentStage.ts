import { client } from "@/shared/api";
import { TOURNAMENT_STAGES } from "@/shared/api/keys";
import { apiSlice } from "@/shared/api";
import { reorderStages } from "./reorderStages";
async function removeTournamentStageMutation(tournamentStageId: string) {
  const { data } = await client
    .from("tournament_stages")
    .delete()
    .eq("id", tournamentStageId)
    .select("tournament_id")
    .single();
  const { tournament_id: tournamentId } = data;
  await reorderStages(tournamentId);
  return data;
}

const removeTournamentStage = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    removeTournamentStage: builder.mutation({
      queryFn: async (tournamentStageId: string) => {
        const data = await removeTournamentStageMutation(tournamentStageId);
        return { data };
      },
      invalidatesTags: (result) => {
        const { tournament_id } = result || {};
        return [{ type: TOURNAMENT_STAGES, id: tournament_id }];
      },
    }),
  }),
});

export const { useRemoveTournamentStageMutation } = removeTournamentStage;
