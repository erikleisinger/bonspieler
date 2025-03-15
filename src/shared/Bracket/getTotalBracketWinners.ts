export function getTotalBracketWinners(winnersArray: number[]) {
  if (!winnersArray) return 0;
  return winnersArray.reduce((all, current) => all + current, 0);
}
