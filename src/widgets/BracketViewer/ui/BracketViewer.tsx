import type {
  BracketConnections,
  BracketGame,
  BracketRows,
} from "@/entities/Bracket";
import { Brackets } from "@/entities/Bracket";
import { useState } from "react";
import testTourney from "../lib/test-tourney.json";

/**
 * Will accept props in production state;
 * for now just use test json to ensure it works
 */

// export default function BracketViewer({
//   connections,
//   brackets,
//   schedule,
// }: {
//   connections: BracketConnections;
//   brackets: BracketGame[][][];
//   schedule: { [gameId: string]: number };
// }) {
export default function BracketViewer() {
  const { connections, brackets, schedule, readableIdIndex, drawTimes } =
    testTourney;
  const [rows, setRows] = useState({});
  function updateRows(newRows: BracketRows) {
    setRows((prevRows) => {
      return {
        ...prevRows,
        ...newRows,
      };
    });
  }

  return (
    <Brackets
      brackets={brackets}
      connections={connections}
      schedule={schedule}
      rows={rows}
      updateRows={updateRows}
      readableIdIndex={readableIdIndex}
      drawTimes={drawTimes}
    />
  );
}
