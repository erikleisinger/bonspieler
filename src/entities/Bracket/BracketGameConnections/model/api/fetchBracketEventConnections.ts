import { client } from "@/shared/api";
export async function fetchBracketEventConnections(bracketEventId: string) {
  const { data, error } = await client
    .from("game_connections")
    .select("*")
    .eq("tournament_stage_id", bracketEventId);
  return data;
}
