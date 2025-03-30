import { BracketGameType } from "@/entities/Bracket";
import { apiSlice, client, Tables } from "@/shared/api";
import { formatBracketGamesForSave } from "./helpers/formatBracketGamesForSave";
async function updateBracketGames(
  games: Partial<Tables<"games">>[],
  bracketStageId: string
) {
  const gameIds = games.map((game) => game.id).join(",");
  await client
    .from("games")
    .delete()
    .eq("tournament_stage_id", bracketStageId)
    .not("id", "in", `(${gameIds})`);
  const { error } = await client.from("games").upsert(games).select("*");
  return error;
}

const saveBracketGames = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveBracketGames: builder.mutation({
      queryFn: async ({
        tournamentId,
        bracketStageId,
        brackets,
        schedule,
      }: {
        tournamentId: string;
        bracketStageId: string;
        brackets: BracketGameType[][][];
        schedule: BracketSchedule;
      }) => {
        const games = formatBracketGamesForSave({
          tournamentId,
          bracketStageId,
          brackets,
          schedule,
        });
        const data = await updateBracketGames(games, bracketStageId);
        return { data };
      },
      invalidatesTags: (result, _, { bracketStageId }) => {
        return [{ type: "BracketGames", id: bracketStageId }];
      },
    }),
  }),
});

export const { useSaveBracketGamesMutation } = saveBracketGames;
