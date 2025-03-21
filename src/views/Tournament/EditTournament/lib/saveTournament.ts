import { updateTournament } from "../api";
import type { Tournament } from "@/entities/Tournament";
export async function saveTournament(tournament: Tournament) {
  const { id, name, start_date, end_date } = tournament;

  await updateTournament({
    id,
    name,
    start_date,
    end_date,
  });
}
