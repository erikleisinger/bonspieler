import { Button } from "@/shared/ui/button";
import { HiOutlinePlus } from "react-icons/hi";
import { scrollToGame } from "@/entities/Bracket";
import type { BracketGameType } from "@/entities/Bracket";
import {
  getReadableGameId,
  getBracketEventSchedule,
  getBracketEventDrawTimes,
} from "@/entities/BracketEvent";
import { useAppSelector } from "@/lib/store";
import { DrawTime } from "@/entities/DrawTime";
export default function BracketGameViewerHeader({
  children,
  close,
  game,
}: {
  children?: React.ReactNode;
  close: () => void;
  game: BracketGameType;
}) {
  const readableId = useAppSelector(getReadableGameId)(game.id);
  const drawTimes = useAppSelector(getBracketEventDrawTimes);
  const schedule = useAppSelector(getBracketEventSchedule);
  return (
    <header className="flex justify-between  p-4 px-6 ">
      <div>
        <div className="flex gap-2 items-end">
          <h2
            className="text-3xl font-bold cursor-pointer"
            onClick={() => scrollToGame(game.id)}
          >
            {readableId}
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

      <Button variant="ghost" size="icon" onClick={close}>
        <HiOutlinePlus
          className="rotate-45"
          style={{ width: "1.5rem", height: "1.5rem" }}
        />
      </Button>
    </header>
  );
}
