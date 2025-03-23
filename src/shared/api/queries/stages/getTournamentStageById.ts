import { client, type Tables } from "@/shared/api";
import { STAGE } from "@/shared/api/keys";
import { apiSlice } from "@/shared/api";

async function fetchTournamentStageById(stageId: string) {
  const { data } = await client
    .from("tournament_stages")
    .select("*")
    .eq("id", stageId)
    .single();

  return data;
}

export const getTournamentStageById = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTournamentStageById: builder.query({
      queryFn: async (stageId: string) => {
        const data = await fetchTournamentStageById(stageId);
        return { data };
      },
      providesTags: (result: Tables<"tournament_stages">, _, stageId) => {
        if (!result) return [];
        return [
          {
            type: STAGE,
            id: stageId,
          },
        ];
      },
    }),
  }),
});

export const { useGetTournamentStageByIdQuery } = getTournamentStageById;
