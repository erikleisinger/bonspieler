import { client, type Tables } from "@/shared/api";

export async function getTournamentTeams(
  tournamentId: number
): Promise<Tables<"teams">> {
  const { data } = await client
    .from("teams")
    .select("*")
    .eq("tournament_id", tournamentId);
  return data;
}
