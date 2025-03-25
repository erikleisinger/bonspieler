import { client, type Tables } from "@/shared/api";
import { STAGE, TOURNAMENT_STAGES } from "@/shared/api/keys";
import { apiSlice } from "@/shared/api";

async function addTournamentStagesMutation(
  stages: Partial<Tables<"tournament_stages">>[]
) {
  const { error } = await client.from("tournament_stages").insert(stages);

  return !!error;
}

const addTournamentStages = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTournamentStages: builder.mutation({
      queryFn: async ({
        tournamentId,
        stages,
      }: {
        tournamentId: string;
        stages: Partial<Tables<"tournament_stages">>[];
      }) => {
        const data = await addTournamentStagesMutation(stages);
        return { data };
      },
      invalidatesTags: (result, _, args) => {
        const { tournamentId } = args;
        return [{ type: TOURNAMENT_STAGES, id: tournamentId }];
      },
    }),
  }),
});

export const { useAddTournamentStagesMutation } = addTournamentStages;
