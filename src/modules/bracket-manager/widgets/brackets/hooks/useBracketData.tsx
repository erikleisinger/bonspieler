import { useMemo } from "react";
import { useBracketSelector } from "@/modules/bracket-manager/shared/hooks";
import {
  getBrackets,
  getConnections,
  getBracketName,
} from "@/modules/bracket-manager/shared/store";
export function useBracketData() {
  const brackets = useBracketSelector(getBrackets);
  const connections = useBracketSelector(getConnections);
  const bracketName = useBracketSelector(getBracketName);
  const { originConnections, loserConnections, winnerConnections } =
    useMemo(() => {
      if (!connections)
        return {
          originConnections: {},
          loserConnections: {},
          winnerConnections: {},
        };
      return connections;
    }, [connections]);

  return {
    brackets,
    originConnections,
    loserConnections,
    winnerConnections,
    bracketName,
  };
}
