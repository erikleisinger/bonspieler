import { MAX_BRACKET_COUNT } from "@/entities/Bracket";
export function getNewBracketAndWinnerCount(
  newBracketCount: string,
  currentBracketCount: number,
  currentWinners: number[]
) {
  const newValue = parseInt(newBracketCount);

  let returnValue = {
    brackets: currentBracketCount,
    winners: currentWinners,
  };
  if (isNaN(newValue)) return returnValue;
  if (newValue < 1) return returnValue;
  if (newValue > MAX_BRACKET_COUNT) return returnValue;

  if (currentWinners.length - 1 < newValue) {
    const newWinners = [...currentWinners];
    newWinners.push(1);
    returnValue.winners = newWinners;
  } else if (currentWinners.length > newValue) {
    const newWinners = [...currentWinners];
    newWinners.pop();
    returnValue.winners = newWinners;
  }

  returnValue.brackets = newValue;

  return returnValue;
}
