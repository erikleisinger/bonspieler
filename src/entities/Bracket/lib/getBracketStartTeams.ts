import { BracketGameType } from "@/entities/Bracket";

export function getBracketStartTeams(bracket: BracketGameType[][]) {
  const startRoundGames = bracket[0]?.length;
  const startRoundSeedGames =
    bracket[0]?.filter((game) => game.isSeed).length || 0;
  const secondRoundSeedGames =
    bracket[1]?.filter((game) => game.isSeed).length || 0;

  const secondRoundNonSeedGames =
    bracket[1]?.filter((game) => !game.isSeed).length || 0;

  const numSeedsStartRound = startRoundSeedGames * 2;
  const numSeedsSecondRound =
    secondRoundSeedGames * 2 - (startRoundGames - secondRoundNonSeedGames * 2);

  const numSeeds = numSeedsStartRound + numSeedsSecondRound;
  return numSeeds;
}
