import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { getAllTournamentTeams } from "@/widgets/TournamentTeamList/api/getAllTournamentTeams";
import type { Nullable } from "@/shared/types";
import type { Tables } from "@/shared/api";
import { useContext } from "react";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { scrollToGame } from "@/entities/Bracket/lib/scrollToGame";
export default function EditableBracketTeamList({
  tournamentId,
}: {
  tournamentId: Nullable<string>;
}) {
  const [teams, setTeams] = useState<Tables<"teams">[]>([]);
  useEffect(() => {
    if (!tournamentId) return;
    getAllTournamentTeams(tournamentId).then((t) => setTeams(t));
  }, [tournamentId]);

  const { lookingToAssignTeam, lookToAssignTeam, availableGames } = useContext(
    BracketEditingContext
  );

  const { connections } = useContext(BracketContext);

  const teamAssignmentMap: {
    [teamId: number]: string;
  } = useMemo(() => {
    return Object.entries(connections).reduce(
      (allAssignments, [gameId, connection]) => {
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
      },
      {}
    );
  }, [JSON.stringify(connections)]);

  function beginLookToAssign(teamId: string) {
    lookToAssignTeam({
      teamId,
    });
    setTimeout(() => {
      const [firstGameId] = availableGames;
      console.log(availableGames);
      if (firstGameId) scrollToGame(firstGameId);
    });
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
