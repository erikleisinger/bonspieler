import { client } from "@/shared/api";

export async function getTournamentStages(tournamentId: string) {
  const { data } = await client
    .from("tournament_stages")
    .select(`*, games(count), draws(count)`)
    .eq("tournament_id", tournamentId);
  return data?.map((stage) => ({
    ...stage,
    games: stage.games[0].count,
    draws: stage.draws[0].count,
  }));
}
