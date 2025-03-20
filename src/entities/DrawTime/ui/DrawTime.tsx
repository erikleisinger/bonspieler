import { useMemo } from "react";
import { useAppSelector } from "@/lib/store";
import { getDrawTimeByNumber } from "../model";
import { format, parseISO } from "date-fns";
export default function DrawTime({ drawNumber }: { drawNumber: number }) {
  const drawTimeIso = useAppSelector((state) =>
    getDrawTimeByNumber(state, drawNumber)
  );
  const drawTime = useMemo(() => {
    if (!drawTimeIso) return "No draw time";
    return format(parseISO(drawTimeIso), "h:mm aaa • EEEE, MMM do");
  }, [drawTimeIso]);

  return (
    <div>
      Draw {drawNumber} • {drawTime}
    </div>
  );
}
