import { BracketGame } from "@/entities/Bracket";

export default function TotalTeams({
  brackets,
}: {
  brackets: BracketGame[][][];
}) {
  const totalNumTeams =
    brackets
      .flat()
      .flat()
      .flat()
      .filter(({ isSeed }) => !!isSeed)?.length || 0;

  return <div>{totalNumTeams}</div>;
}
