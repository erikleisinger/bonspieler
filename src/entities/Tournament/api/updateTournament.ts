import { client, type TablesUpdate } from "@/shared/api";
import { TournamentStage } from "../types";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";

export async function updateTournamentStages(
  tournamentId: string,
  stages: TournamentStage
) {
  const toInsert = stages.filter(
    (stage) => stage.id.split("DRAFT-").length === 2
  );
  const toUpdate = stages.filter(
    (stage) => stage.id.split("DRAFT-").length !== 2
  );
  const { data, error } = await client
    .from("tournament_stages")
    .upsert(
      toUpdate.map((stage) => {
        const { id, name, order, numTeams, numWinners, ...rest } = stage;
        return {
          id,
          name,
          order,
          num_start_teams: numTeams,
          num_end_teams: getTotalBracketWinners(numWinners),
          schema: JSON.stringify({
            ...rest,
            numWinners,
          }),
          tournament_id: tournamentId,
        };
      })
    )
    .select("*");

  await client.from("tournament_stages").insert(
    toInsert.map((stage) => {
      const { id, name, order, numTeams, numWinners, ...rest } = stage;
      return {
        name,
        order,
        num_start_teams: numTeams,
        num_end_teams: getTotalBracketWinners(numWinners),
        schema: JSON.stringify({
          ...rest,
          numWinners,
        }),
        tournament_id: tournamentId,
      };
    })
  );
}
export async function updateTournament({
  id,
  name,
  updates,
}: {
  id: string;
  name: string;
  updates: TablesUpdate<"tournaments">;
}) {
  const { data, error } = await client
    .from("tournaments")
    .update({
      name,
    })
    .eq("id", id)
    .select("id")
    .single();
  const { schema } = updates || {};
  const { stages = [] } = schema || {};
  await updateTournamentStages(id, stages);
  return data.id;
}
