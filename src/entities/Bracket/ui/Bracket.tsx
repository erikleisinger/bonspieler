import { useEffect, useCallback } from "react";
import { calculateRowSpanForGame } from "../lib/calculateRowSpanForGame";
import type { BracketGame, BracketRowWithId, BracketRows } from "../types";
import GameConnections from "./GameConnections";
import { BRACKET_CONTAINER_ELEMENT_ID_PREFIX } from "../lib/constants/element-id";

import type { OriginConnections } from "@/entities/Bracket/BracketGameConnections";
import { calculateRows } from "../lib/calculateRows";

export interface BracketProps {
  bracketNumber: number;
  children?: React.ReactNode;
  rounds: BracketGame[][];
  rows: BracketRows;
  originConnections: OriginConnections;
  setRows: (newRows: BracketRows) => void;
  stageId: string;
  scale: number;
}

export default function Bracket({
  bracketNumber,
  children,
  rounds,
  rows,
  originConnections,
  setRows,
  stageId,
  scale,
}: BracketProps) {
  useEffect(() => {
    setRows(
      calculateRows({
        originConnections,
        rounds,
        stageId,
      })
    );
  }, [JSON.stringify(originConnections), rounds, stageId]);

  return (
    <div>
      <div
        className="p-0 min-h-screen pr-[100vw] md:pr-[500px]"
        id={BRACKET_CONTAINER_ELEMENT_ID_PREFIX + bracketNumber}
      >
        <div className="flex relative">
          <GameConnections
            originConnections={originConnections}
            games={rounds.flat()}
            rows={rows}
            stageId={stageId}
            scale={scale}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
