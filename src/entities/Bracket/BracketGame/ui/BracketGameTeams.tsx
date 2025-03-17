import { BracketConnectionTeam } from "../../types";
import BracketGameTeam from "./BracketGameTeam";
export default function BracketGameTeams({
  readableId,
  teams,
}: {
  readableId: string;
  teams: BracketConnectionTeam[];
}) {
  const atLeastTwoTeams = new Array(2)
    .fill({
      teamId: null,
      gameId: null,
      isWinner: false,
    })
    .map((e, i) => {
      if (teams[i]) return teams[i];
      return e;
    });

  return (
    <div className="mt-2 flex flex-col gap-1">
      {atLeastTwoTeams.map((team, index) => {
        return (
          <BracketGameTeam
            team={team}
            key={"team-" + index}
            readableId={readableId}
            className="grow"
          />
        );
      })}
    </div>
  );
}
