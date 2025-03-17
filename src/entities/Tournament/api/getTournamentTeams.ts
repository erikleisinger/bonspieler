import { client } from "@/shared/api";
import { TournamentTeam } from "../types";

export async function getTournamentTeams(
  tournamentId: string
): Promise<TournamentTeam[]> {
  const { data } = await client
    .from("teams")
    .select("*")
    .eq("tournament_id", tournamentId);
  if (!data) return [];
  return data.map((t) => ({
    id: t.id,
    name: t.name,
    tournament_id: t.tournament_id,
  }));
}
