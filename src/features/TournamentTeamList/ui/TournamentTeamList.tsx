import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { TournamentContext } from "@/entities/Tournament/lib";
export default function TournamentTeamList({
  controlChildren,
}: {
  controlChildren?: React.ReactNode;
}) {
  const { teams } = useContext(TournamentContext);
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
              {controlChildren}
              <Button size="icon" variant="ghost">
                <FaTrash />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
