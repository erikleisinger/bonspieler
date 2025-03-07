import { MAX_WINNER_COUNT } from "./constants";
export function getNewWinnerCount(
  newWinnerCount: string,
  currentWinnerCount: number[],
  indexToModify: number
): number[] {
  const newValue = parseInt(newWinnerCount);

  if (newValue < 1) return currentWinnerCount;
  if (newValue > MAX_WINNER_COUNT) return currentWinnerCount;
  const newArray = [...currentWinnerCount];
  newArray[indexToModify] = newValue;
  return newArray;
}
