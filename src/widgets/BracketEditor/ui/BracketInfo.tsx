import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/store";
import {
  getBracketEventBrackets,
  getBracketEventDrawTimes,
  getBracketEventSchedule,
} from "@/entities/BracketEvent";
import DrawTime from "@/shared/ui/draw-time";
import Typography from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import { DrawInfo } from "@/features/SetEventDrawTimes";
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
  const brackets = useAppSelector(getBracketEventBrackets);
  const schedule = useAppSelector(getBracketEventSchedule);
  const drawTimes = useAppSelector(getBracketEventDrawTimes);
  const numWinners = useAppSelector(getNumWinners);

  const games = brackets[bracketIndex].flat() || [];

  const drawNumbers = useMemo(() => {
    return games
      .reduce((all, { id }) => {
        const drawNum = schedule[id];
        if (!all.includes(drawNum)) return [...all, drawNum];
        return all;
      }, [])
      .sort((a, b) => a - b);
  }, [games, schedule]);

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
