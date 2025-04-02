export interface CustomizeBracketProps {
  className?: string;
  teamsEditable: boolean;
  teamCount: number;
  updateTeamCount: (e: number) => void;
  numBrackets: number;
  updateNumBrackets: (e: number) => void;
  bracketIndex: number;
}
