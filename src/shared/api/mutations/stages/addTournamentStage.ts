import { client, type Tables } from "@/shared/api";
import { TOURNAMENT_STAGES } from "@/shared/api/keys";
import { apiSlice } from "@/shared/api";

async function addTournamentStageMutation(
  tournamentId: string,
  stageToAdd: Partial<Tables<"tournament_stages">>
) {
  const { data } = await client.from("tournament_stages").insert({
    ...stageToAdd,
    tournament_id: tournamentId,
  });

  return data;
}

const addTournamentStage = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTournamentStage: builder.mutation({
      queryFn: async ({
        tournamentId,
        stageToAdd,
      }: {
        tournamentId: string;
        stageToAdd: Partial<Tables<"tournament_stages">>;
      }) => {
        const data = await addTournamentStageMutation(tournamentId, stageToAdd);
        return { data };
      },
      invalidatesTags: (result, _, args) => {
        const { tournamentId } = args;
        return [{ type: TOURNAMENT_STAGES, id: tournamentId }];
      },
    }),
  }),
});

export const { useAddTournamentStageMutation } = addTournamentStage;
