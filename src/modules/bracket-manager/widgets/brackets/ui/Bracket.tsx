import { useEffect } from "react";
import type { BracketRows } from "../types";
import type { BracketGame } from "@/modules/bracket-manager/shared/types";
import GameConnections from "./GameConnections";

import type { OriginConnections } from "@/entities/Bracket/BracketGameConnections";
import { calculateRows } from "../lib";
import { ROUND_GAP } from "../lib/constants/style";
import { useContext } from "react";
import { StageContext } from "@/modules/bracket-manager/shared/lib/context";

export interface BracketProps {
  children?: React.ReactNode;
  rounds: BracketGame[][];
  rows: BracketRows;
  originConnections: OriginConnections;
  setRows: (newRows: BracketRows) => void;
  stageId: string;
}

export default function Bracket({
  children,
  rounds,
  rows,
  originConnections,
  setRows,
}: BracketProps) {
  const { stageId } = useContext(StageContext);

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
          />
        </div>
      </div>
    </div>
  );
}
