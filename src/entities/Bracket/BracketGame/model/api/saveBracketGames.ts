import { client, Tables } from "@/shared/api";

async function updateBracketGames(games: Partial<Tables<"games">>[]) {
  const { error } = await client.from("games").upsert(games).select("*");
  return error;
}

export async function saveBracketGames(games: Partial<Tables<"games">>[]) {
  await updateBracketGames(games);
}
