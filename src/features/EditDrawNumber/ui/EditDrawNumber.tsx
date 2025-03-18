"use client";
import { DrawTime } from "@/entities/DrawTime";
import { useState, useRef, useEffect, useMemo } from "react";
import { useAppDispatch } from "@/lib/store";
import { setBracketSchedule } from "@/entities/BracketEvent";
import { Button } from "@/shared/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useAppSelector } from "@/lib/store";
import {
  getBracketEventDrawTimes,
  getBracketEventSchedule,
} from "@/entities/BracketEvent";
export default function EditDrawNumber({ gameId }: { gameId: string }) {
  const dispatch = useAppDispatch();

  const schedule = useAppSelector(getBracketEventSchedule);
  const drawTimes = useAppSelector(getBracketEventDrawTimes);
  const [editing, setEditing] = useState(false);
  const el = useRef(null);

  const [selectOpen, setSelectOpen] = useState(true);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (el.current && !el.current.contains(event.target)) {
        setEditing(false);
      }
    }
    if (!selectOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [el, selectOpen]);
  const drawTimeOptions = useMemo(() => {
    const times = [];
    Object.values(schedule).forEach((val) => {
      if (!times.includes(val)) times.push(val);
    });
    return times;
  }, [JSON.stringify(schedule)]);

  function updateDrawTime(newTime) {
    const newSchedule = {
      ...schedule,
      [gameId]: newTime,
    };
    dispatch(setBracketSchedule(newSchedule));
  }

  function beginEdit() {
    setSelectOpen(true);
    setEditing(true);
  }

  return editing ? (
    <div ref={el}>
      <Select
        open={selectOpen}
        onOpenChange={setSelectOpen}
        value={`${schedule[gameId]}`}
        onValueChange={updateDrawTime}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Draw">Draw {schedule[gameId]}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {drawTimeOptions.map((t) => {
            return (
              <SelectItem value={t} key={t}>
                Draw {t}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  ) : (
    <div className="flex gap-2 items-center">
      <DrawTime gameId={gameId} schedule={schedule} drawTimes={drawTimes} />
      <Button variant="ghost" size="icon" onClick={beginEdit}>
        <FaPencilAlt />
      </Button>
    </div>
  );
}
