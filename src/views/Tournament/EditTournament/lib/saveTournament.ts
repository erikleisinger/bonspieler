import { Tournament } from "@/shared/types/Tournament";
import { addTournament, updateTournament } from "../api";
export async function saveTournament(tournament: Tournament) {
  const { id, stages, name } = tournament;

  if (!id) {
    await addTournament({
      name,
      schema: {
        stages,
      },
    });
  } else {
    await updateTournament({
      id,
      updates: {
        schema: {
          stages,
        },
      },
    });
  }
}
