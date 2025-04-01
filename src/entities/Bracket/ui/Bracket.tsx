import { useEffect } from "react";
import type { BracketGame, BracketRows } from "../types";
import GameConnections from "./GameConnections";

import type { OriginConnections } from "@/entities/Bracket/BracketGameConnections";
import { calculateRows } from "../lib/calculateRows";
import { ROUND_GAP } from "../lib/constants/style";

export interface BracketProps {
  children?: React.ReactNode;
  rounds: BracketGame[][];
  rows: BracketRows;
  originConnections: OriginConnections;
  setRows: (newRows: BracketRows) => void;
  stageId: string;
  scale: number;
}

export default function Bracket({
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
      <div className="p-0 ">
        <div
          className="flex relative "
          style={{
            gap: ROUND_GAP + "px",
          }}
        >
          {children}

          <GameConnections
            originConnections={originConnections}
            games={rounds.flat()}
            rows={rows}
            stageId={stageId}
            scale={scale}
          />
        </div>
      </div>
    </div>
  );
}
