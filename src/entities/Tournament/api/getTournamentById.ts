import { client } from "@/shared/api";
import { Tournament } from "@/shared/types/Tournament";

async function getTournamentStages(tournamentId: string) {
  const { data } = await client
    .from("tournament_stages")
    .select("*")
    .eq("tournament_id", tournamentId);
  return data?.reduce((all, cur) => {
    const { schema, id, name, order, num_start_teams, type } = cur;
    const parsedSchema = JSON.parse(schema);
    return [
      ...all,
      {
        ...parsedSchema,
        id,
        name,
        order,
        numTeams: num_start_teams,
        type,
      },
    ].sort((a, b) => a.order - b.order);
  }, []);
}

async function getTournamentGames(tournamentId: string) {
  const { data } = await client
    .from("games")
    .select("*")
    .eq("tournament_id", tournamentId);
  return data;
}

async function getTournamentGameConnections(tournamentId: string) {
  const { data } = await client
    .from("game_connections")
    .select("*")
    .eq("tournament_id", tournamentId);
  return data;
}

export async function getTournamentById(
  tournamentId: string
): Promise<Tournament> {
  const { data } = await client
    .from("tournaments")
    .select("*")
    .eq("id", tournamentId)
    .single();
  const { id, name, start_date, end_date } = data;
  const stages = await getTournamentStages(id);
  const games = await getTournamentGames(id);
  const connections = await getTournamentGameConnections(id);

  return {
    id,
    name,
    start_date,
    end_date,
    stages,
  };
}
