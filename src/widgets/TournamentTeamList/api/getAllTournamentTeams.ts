import { client, Tables } from "@/shared/api";
export async function getAllTournamentTeams(
  tournamentId: string
): Promise<Tables<"teams">[]> {
  const { data, error } = await client
    .from("teams")
    .select("*")
    .eq("tournament_id", tournamentId);
  return data || [];
}
