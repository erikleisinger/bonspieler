import { client } from "@/shared/api";

async function fetchBracketEventGames(bracketEventId: string) {
  const { data, error } = await client
    .from("games")
    .select("*")
    .eq("tournament_stage_id", bracketEventId);
  return data;
}

async function fetchBracketEventConnections(bracketEventId: string) {
  const { data, error } = await client
    .from("game_connections")
    .select("*")
    .eq("tournament_stage_id", bracketEventId);
  return data;
}

export async function fetchBracketEvent(id: string) {
  const games = await fetchBracketEventGames(id);
  const connections = await fetchBracketEventConnections(id);

  return { games, connections };
}
