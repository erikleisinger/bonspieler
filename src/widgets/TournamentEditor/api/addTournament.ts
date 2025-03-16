/* eslint-disable @typescript-eslint/no-explicit-any */
import { client, type TablesInsert } from "@/shared/api";

export async function addTournament(params: TablesInsert<"tournament_schema">) {
  const { data, error } = await client
    .from("tournament_schema")
    .insert([params])
    .select("id");

  return { data, error };
}
