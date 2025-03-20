import { client, Tables } from "@/shared/api";

export async function updateTournamentStages(
  stageUpdates: Partial<Tables<"tournament_stages">>[]
) {
  const { data } = await client
    .from("tournament_stages")
    .upsert(stageUpdates)
    .select(`*, games(count), draws(count)`);
  return data?.map((stage) => ({
    ...stage,
    games: stage?.games[0]?.count || 0,
    draws: stage?.draws[0]?.count || 0,
  }));
}
