export interface BracketEditorOptionsProps {
  teamCount: number;
  updateTeamCount: (e: number) => void;
  numWinners: number[];
  updateNumWinners: (e: number[]) => void;
  renderBrackets: () => void;
  numBrackets: number;
  updateNumBrackets: (e: number) => void;
  numSheets: number;
  updateNumSheets: (e: number) => void;
  maxTeams: number | null;
  targetEndTeams: number | null;
}
