import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getTournamentTeams } from "@/entities/Tournament";
import {
  getLookingToAssignTeam,
  setLookingToAssignTeam,
} from "@/entities/BracketEvent";
export default function EditableBracketTeamList() {
  const dispatch = useAppDispatch();
  const teams = useAppSelector(getTournamentTeams);
  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);

  const teamAssignmentMap: {
    [teamId: number]: string;
  } = useMemo(() => {
    return Object.entries({}).reduce((allAssignments, [gameId, connection]) => {
      const { teams = [] } = connection || {};
      return {
        ...allAssignments,
        ...teams.reduce((all, current) => {
          const { teamId } = current;
          if (!!teamId && teamId !== "seed")
            return {
              ...all,
              [teamId]: gameId,
            };
          return all;
        }, {}),
      };
    }, {});
  }, []);

  function beginLookToAssign(teamId: string) {
    dispatch(setLookingToAssignTeam(teamId));
  }

  return (
    <div className="flex flex-col gap-2">
      {teams.map((t) => {
        return (
          <div
            className="bg-glass backdrop-blur-lg p-2 grid grid-cols-[1fr,auto,auto] gap-8"
            key={t.id}
          >
            <div className="flex items-center">
              <div>{t.name}</div>
            </div>
            <div className="flex items-center">
              <Badge>Confirmed</Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                disabled={!!teamAssignmentMap[t.id] || !!lookingToAssignTeam}
                onClick={() => beginLookToAssign(t.id)}
              >
                <FaPencilAlt />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
