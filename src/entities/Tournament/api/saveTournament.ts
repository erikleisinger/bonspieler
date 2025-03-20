import { Tournament } from "@/shared/types/Tournament";
import { addTournament } from "./addTournament";
import { updateTournament } from "./updateTournament";
import { useAppDispatch } from "@/lib/store";
export async function saveTournament(tournament: Tournament) {
  // const { id, stages, name } = tournament;
  // if (!id) {
  //   const tournamentId = await addTournament({
  //     name,
  //     schema: {
  //       stages,
  //     },
  //   });
  //   return tournamentId;
  // } else {
  //   await updateTournament({
  //     id,
  //     name,
  //     updates: {
  //       schema: {
  //         stages,
  //       },
  //     },
  //   });
  //   return null;
  // }
}
