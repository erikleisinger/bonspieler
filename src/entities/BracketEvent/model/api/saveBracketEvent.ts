import { client, Tables } from "@/shared/api";

export async function saveBracketEvent(event: Tables<"tournament_stages">) {
  const { data, error } = await client
    .from("tournament_stages")
    .upsert(event)
    .select("*")
    .single();

  return data;
}
