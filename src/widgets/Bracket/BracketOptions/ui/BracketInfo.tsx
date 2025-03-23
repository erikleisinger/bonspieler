import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/store";
import { getBracketEventNumWinners } from "@/entities/BracketEvent";
import { getDrawTimes } from "@/entities/DrawTime";
import { getGamesForBracket } from "@/entities/Bracket/BracketGame";
import DrawTime from "@/shared/ui/draw-time";
import Typography from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import { DrawInfo } from "@/features/Stage/SetStageDrawTimes";
export default function BracketInfo({
  className = "",
  bracketIndex,
  editDrawTimes,
  ...props
}: {
  className?: string;
  bracketIndex: number;
  editDrawTimes: () => void;
}) {
  const drawTimes = useAppSelector(getDrawTimes);
  const numWinners = useAppSelector(getBracketEventNumWinners);

  const games = useAppSelector((state) =>
    getGamesForBracket(state, bracketIndex)
  );

  const drawNumbers = useMemo(() => {
    return Array.from({ length: Object.keys(drawTimes).length }).map(
      (_, i) => i + 1
    );
  }, [drawTimes]);

  const bracketWinners = numWinners[bracketIndex];
  const numGames = games?.length || 0;
  return (
    <>
      <div className={cn(" bg-glass p-4 rounded-md", className)} {...props}>
        <div className="flex justify-between">
          Games <strong>{numGames}</strong>
        </div>
        <div className="flex justify-between">
          Teams advancing <strong>{bracketWinners}</strong>
        </div>
      </div>
      <div className="p-4 pt-8 flex justify-between">
        <Typography tag="h4">Draw times ({drawNumbers.length})</Typography>
        <Button variant="ghost" size="icon" onClick={editDrawTimes}>
          <FaPencilAlt />
        </Button>
      </div>
      <div
        className={cn(
          " bg-glass p-4 rounded-md  flex flex-col gap-1",
          className
        )}
        {...props}
      >
        {drawNumbers.map((dn: number) => {
          return (
            <DrawInfo key={dn} drawNumber={dn}>
              <div className="bg-glass rounded-sm h-full flex items-center px-2 text-sm">
                {drawTimes[dn] ? (
                  <DrawTime drawTime={drawTimes[dn]} />
                ) : (
                  <div>No draw time set</div>
                )}
              </div>
            </DrawInfo>
          );
        })}
      </div>
    </>
  );
}
