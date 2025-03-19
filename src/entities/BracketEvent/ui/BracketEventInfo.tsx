import {
  BracketConnections,
  BracketGameType,
  BracketSchedule,
} from "@/entities/Bracket";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";

export default function BracketEventInfo({
  brackets,
  connections,
  schedule,
  winners,
  numTeams,
}: {
  brackets: BracketGameType[][][];
  connections: BracketConnections;
  schedule: BracketSchedule;
  winners: number[];
  numTeams: number;
}) {
  const numDraws = !Object.values(schedule || {})?.length
    ? 0
    : Math.max(...Object.values(schedule || {}));

  const numWinners = getTotalBracketWinners(winners);

  const numBrackets = brackets?.length || 0;
  return (
    <>
      <div className="flex justify-between">
        Teams <strong>{numTeams}</strong>
      </div>
      <div className="flex justify-between">
        Brackets <strong>{numBrackets}</strong>
      </div>
      <div className="flex justify-between">
        Teams advancing <strong>{numWinners}</strong>
      </div>
      <div className="flex justify-between">
        Draws <strong>{numDraws}</strong>
      </div>
    </>
  );
}
