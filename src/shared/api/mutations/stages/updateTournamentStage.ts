import { client, type Tables } from "@/shared/api";
import { STAGE } from "@/shared/api/keys";
import { apiSlice } from "@/shared/api";

async function updateTournamentStageMutation(
  tournamentStageId: string,
  updates: Partial<Tables<"tournament_stages">>
) {
  const { data } = await client
    .from("tournament_stages")
    .update(updates)
    .eq("id", tournamentStageId);

  return data;
}

const updateTournamentStage = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateTournamentStage: builder.mutation({
      queryFn: async ({
        tournamentStageId,
        updates,
      }: {
        tournamentStageId: string;
        updates: Partial<Tables<"tournament_stages">>;
      }) => {
        const data = await updateTournamentStageMutation(
          tournamentStageId,
          updates
        );
        return { data };
      },
      invalidatesTags: (result, _, args) => {
        const { tournamentStageId } = args;
        return [{ type: STAGE, id: tournamentStageId }];
      },
    }),
  }),
});

export const { useUpdateTournamentStageMutation } = updateTournamentStage;
