export interface CustomizeBracketEventProps {
  teamCount: number;
  updateTeamCount: (e: number) => void;
  numWinners: number[];
  updateNumWinners: (e: number, index: number) => void;
  numSheets: number;
  updateNumSheets: (e: number) => void;
  numBrackets: number;
  updateNumBrackets: (e: number) => void;
}
