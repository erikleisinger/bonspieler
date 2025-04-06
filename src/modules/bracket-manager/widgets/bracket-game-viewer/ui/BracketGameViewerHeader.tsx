import type { BracketGameType } from "@/entities/Bracket";
import { useAppSelector } from "@/lib/store";
import { getReadableId } from "@/modules/bracket-manager/shared/store";
export default function BracketGameViewerHeader({
  children,
  game,
}: {
  children?: React.ReactNode;

  game: BracketGameType;
}) {
  const drawTimes = {};
  const schedule = {};
  const readableId = useAppSelector((state) => getReadableId(state, game?.id));
  return (
    <header className="flex justify-between  p-4 px-6 ">
      <div>
        <div className="flex gap-2 items-end">
          <h2 className="text-3xl font-bold cursor-pointer">{readableId}</h2>
        </div>
        <div className="text-muted text-sm flex gap-2 items-center"></div>
      </div>
    </header>
  );
}
