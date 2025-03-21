import { Tournament } from "@/shared/types/Tournament";

import { updateTournament } from "./updateTournament";

export async function saveTournament(tournament: Tournament) {
  const { id, name } = tournament;

  await updateTournament({
    id,
    name,
  });
}
