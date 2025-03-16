/* eslint-disable @typescript-eslint/no-explicit-any */
import { client, type TablesInsert } from "@/shared/api";

export async function addTournament(params: TablesInsert<"tournaments">) {
  const { data, error } = await client
    .from("tournaments")
    .insert([params])
    .select("id");

  return { data, error };
}
