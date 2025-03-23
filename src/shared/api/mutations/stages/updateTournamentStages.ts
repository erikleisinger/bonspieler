import { client, type Tables } from "@/shared/api";
import { STAGE, TOURNAMENT_STAGES } from "@/shared/api/keys";
import { apiSlice } from "@/shared/api";

async function updateTournamentStagesMutation(
  tournamentId: string,
  updates: Partial<Tables<"tournament_stages">>[]
) {
  const { data } = await client
    .from("tournament_stages")
    .upsert(updates)
    .eq("tournament_id", tournamentId);

  return data;
}

const updateTournamentStages = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateTournamentStages: builder.mutation({
      queryFn: async ({
        tournamentId,
        updates,
      }: {
        tournamentId: string;
        updates: Partial<Tables<"tournament_stages">>[];
      }) => {
        const data = await updateTournamentStagesMutation(
          tournamentId,
          updates
        );
        return { data };
      },
      invalidatesTags: (result, _, args) => {
        const { tournamentId } = args;
        return [{ type: TOURNAMENT_STAGES, id: tournamentId }];
      },
    }),
  }),
});

export const { useUpdateTournamentStagesMutation } = updateTournamentStages;
