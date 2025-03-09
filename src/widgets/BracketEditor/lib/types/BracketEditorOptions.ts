export interface BracketEditorOptionsProps {
  teamCount: number;
  updateTeamCount: (e: string) => void;
  numWinners: number[];
  updateNumWinners: (e: string, index: number) => void;
  renderBrackets: () => void;
  numBrackets: number;
  updateNumBrackets: (e: string) => void;
}
