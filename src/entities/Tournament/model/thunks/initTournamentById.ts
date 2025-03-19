import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTournamentById, getTournamentTeams } from "../../api";
export const initTournamentById = createAsyncThunk(
  "tournament/initTournamentById",
  async (tournamentId: string) => {
    const [tournament, teams] = await Promise.all([
      getTournamentById(tournamentId),
      getTournamentTeams(tournamentId),
    ]);
    return { tournament, teams };
  }
);
