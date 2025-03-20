import { client } from "@/shared/api";
import type { Tables } from "@/shared/api";

async function insertBracketConnections(
  connections: Partial<Tables<"game_connections">>[],
  stageId: string
) {
  await client
    .from("game_connections")
    .delete()
    .eq("tournament_stage_id", stageId);
  const { data } = await client
    .from("game_connections")
    .insert(connections)
    .select("*");
  return data;
}

export async function saveBracketConnections(
  games: Partial<Tables<"game_connections">>[],
  stageId: string
) {
  await insertBracketConnections(games, stageId);
}
