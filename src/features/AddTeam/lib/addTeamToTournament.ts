import { client, Tables, TablesInsert } from "@/shared/api";
export async function addTeamToTournament(
  tournamentId: string,
  {
    team,
    teamMembers,
  }: {
    team: TablesInsert<"teams">;
    teamMembers: TablesInsert<"team_members">[];
  }
) {
  const { data, error } = await client
    .from("teams")
    .insert({
      ...team,
      tournament_id: tournamentId,
    })
    .select("id")
    .single();
  const { id: teamId } = data;

  await client.from("team_members").insert(
    teamMembers.map((t) => ({
      ...t,
      team_id: teamId,
    }))
  );
}
