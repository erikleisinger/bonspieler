import { client } from "@/shared/api";
import { apiSlice } from "@/shared/api";
import { BRACKET_GAMES } from "../../keys";
import type { BracketGameType } from "@/entities/Bracket";
import type { BracketSchedule } from "@/entities/Bracket";
import { formatGameForDisplay } from "@/entities/Bracket/BracketGame";

export async function fetchBracketGames(bracketStageId: string) {
  const { data } = await client
    .from("games")
    .select("*")
    .eq("tournament_stage_id", bracketStageId);
  return data;
}

const getBracketGames = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBracketGames: build.query({
      queryFn: async (bracketStageId: string) => {
        const games = (await fetchBracketGames(bracketStageId)) || [];

        const brackets: BracketGameType[][][] = [];
        games?.forEach((game) => {
          const { group_number = 0, round_number = 0 } = game;

          if (!brackets[group_number]) {
            brackets[group_number] = [];
          }

          if (!brackets[group_number][round_number]) {
            brackets[group_number][round_number] = [];
          }

          brackets[group_number][round_number].push(formatGameForDisplay(game));
        });

        const { schedule } = games.reduce<{
          schedule: BracketSchedule;
        }>(
          (acc, game) => {
            return {
              ...acc,
              schedule: {
                ...acc.schedule,
                [game.id]: game.draw_number || null,
              },
            };
          },
          {
            schedule: {},
          }
        );
        return {
          data: {
            brackets,
            schedule,
            stageId: bracketStageId,
          },
        };
      },
      providesTags: (result, _, bracketStageId) => {
        return [{ type: BRACKET_GAMES, id: bracketStageId }];
      },
    }),
  }),
});

export const { useGetBracketGamesQuery } = getBracketGames;
