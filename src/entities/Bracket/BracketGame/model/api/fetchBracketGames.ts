import { client } from "@/shared/api";

export async function fetchBracketGames(bracketStageId: string) {
  const { data } = await client
    .from("games")
    .select("*")
    .eq("tournament_stage_id", bracketStageId);
  return data;
}
