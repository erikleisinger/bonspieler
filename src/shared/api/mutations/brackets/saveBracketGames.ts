import { BracketGameType, BracketReadableIdIndex } from "@/entities/Bracket";
import { apiSlice, client, Tables } from "@/shared/api";
import { formatBracketGamesForSave } from "./helpers/formatBracketGamesForSave";
async function updateBracketGames(games: Partial<Tables<"games">>[]) {
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
        readableIdIndex,
        schedule,
      }: {
        tournamentId: string;
        bracketStageId: string;
        brackets: BracketGameType[][][];
        readableIdIndex: BracketReadableIdIndex;
        schedule: BracketSchedule;
      }) => {
        const games = formatBracketGamesForSave({
          tournamentId,
          bracketStageId,
          brackets,
          readableIdIndex,
          schedule,
        });
        const data = await updateBracketGames(games);
        return { data };
      },
      invalidatesTags: (result, _, { bracketStageId }) => {
        return [{ type: "BracketGames", id: bracketStageId }];
      },
    }),
  }),
});

export const { useSaveBracketGamesMutation } = saveBracketGames;
