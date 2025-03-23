import { client, Tables } from "@/shared/api";
import { apiSlice } from "../../model";
import { TOURNAMENT } from "@/shared/api/keys";
export async function fetchTournaments(): Promise<Tables<"tournaments">[]> {
  const { data } = await client.from("tournaments").select("*");
  return data || [];
}

const getTournaments = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTournaments: builder.query({
      queryFn: async () => {
        const data = await fetchTournaments();
        return { data };
      },
      providesTags: () => {
        return [{ type: TOURNAMENT, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetTournamentsQuery } = getTournaments;
