import { useReducer } from "react";
import { bracketEditorReducer } from "../reducer";
import { DEFAULT_BRACKET_EDITOR_STATE } from "../reducer";
import { BracketConnections, BracketGame } from "@/entities/Bracket";
import {
  BracketReadableIdIndex,
  BracketSchedule,
} from "@/entities/Bracket/lib";

// Define a custom hook to use your reducer
export function useBracketEditorReducer({
  brackets,
  connections,
  numSheets,
  readableIdIndex,
  schedule,
}: {
  brackets: BracketGame[][][];
  connections: BracketConnections;
  numSheets: number;
  readableIdIndex: BracketReadableIdIndex;
  schedule: BracketSchedule;
}) {
  const [bracketState, dispatch] = useReducer(bracketEditorReducer, {
    ...JSON.parse(JSON.stringify(DEFAULT_BRACKET_EDITOR_STATE)),
    ...{
      brackets: brackets,
      connections: connections,
      numSheets: numSheets,
      readableIdIndex: readableIdIndex,
      schedule: schedule,
    },
    editing: true,
  });

  return { bracketState, dispatch };
}
