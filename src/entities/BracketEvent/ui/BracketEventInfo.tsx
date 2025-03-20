import {
  BracketConnections,
  BracketGameType,
  BracketSchedule,
} from "@/entities/Bracket";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";

export default function BracketEventInfo({
  numStartTeams,
  numDraws,
  numEndTeams,
  numBrackets,
}: {
  numStartTeams: number;
  numDraws: number;
  numEndTeams: number;
  numBrackets: number;
}) {
  return (
    <>
      <div className="flex justify-between">
        Teams <strong>{numStartTeams}</strong>
      </div>
      <div className="flex justify-between">
        Brackets <strong>{numBrackets}</strong>
      </div>
      <div className="flex justify-between">
        Teams advancing <strong>{numEndTeams}</strong>
      </div>
      <div className="flex justify-between">
        Draws <strong>{numDraws}</strong>
      </div>
    </>
  );
}
