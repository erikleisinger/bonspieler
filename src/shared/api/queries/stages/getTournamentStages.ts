import { client, type Tables } from "@/shared/api";
import { STAGE, TOURNAMENT_STAGES } from "@/shared/api/keys";
import { apiSlice } from "@/shared/api";

async function fetchTournamentStages(tournamentId: string) {
  const { data } = await client
    .from("tournament_stages")
    .select("*")
    .eq("tournament_id", tournamentId)
    .order("order", { ascending: true });

  return data;
}

export const getTournamentStages = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTournamentStages: builder.query({
      queryFn: async ({ tournamentId }: { tournamentId: string }) => {
        const data = await fetchTournamentStages(tournamentId);
        return { data };
      },

      providesTags: (
        result: Tables<"tournament_stages">[],
        _,
        { tournamentId }
      ) => {
        if (!result) return [];

        return [
          ...result.map((stage: Tables<"tournament_stages">) => ({
            type: STAGE,
            id: stage.id,
          })),
          {
            type: TOURNAMENT_STAGES,
            id: tournamentId,
          },
        ];
      },
    }),
  }),
});

export const { useGetTournamentStagesQuery } = getTournamentStages;
