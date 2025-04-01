import type { BracketGameType } from "@/entities/Bracket";
import { getDrawTimes } from "@/entities/DrawTime";
import { getBracketGamesSchedule } from "@/entities/Bracket/BracketGame";
import { useAppSelector } from "@/lib/store";
import { DrawTime } from "@/entities/DrawTime";
export default function BracketGameViewerHeader({
  children,
  game,
}: {
  children?: React.ReactNode;

  game: BracketGameType;
}) {
  const drawTimes = useAppSelector(getDrawTimes);
  const schedule = useAppSelector(getBracketGamesSchedule);
  return (
    <header className="flex justify-between  p-4 px-6 ">
      <div>
        <div className="flex gap-2 items-end">
          <h2 className="text-3xl font-bold cursor-pointer">
            {game.readableId}
          </h2>
        </div>
        <div className="text-muted text-sm flex gap-2 items-center">
          {children ? (
            children
          ) : (
            <DrawTime
              gameId={game.id}
              schedule={schedule}
              drawTimes={drawTimes}
            />
          )}
        </div>
      </div>
    </header>
  );
}
