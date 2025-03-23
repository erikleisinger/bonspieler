"use client";
import { DrawTime } from "@/entities/DrawTime";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Nullable } from "@/shared/types";
export default function EditDrawNumber({
  availableDrawTimes = [],
  setDrawTime = () => {},
  drawTime,
}: {
  availableDrawTimes: number[];
  setDrawTime: (drawTime: number) => void;
  drawTime: Nullable<number>;
}) {
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

  function beginEdit() {
    setSelectOpen(true);
    setEditing(true);
  }

  return editing ? (
    <div ref={el}>
      <Select
        open={selectOpen}
        onOpenChange={setSelectOpen}
        value={`${drawTime}`}
        onValueChange={(e) => setDrawTime(parseInt(e))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Draw">Draw {drawTime}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableDrawTimes.map((t) => {
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
      <DrawTime drawNumber={drawTime} />
      <Button variant="ghost" size="icon" onClick={beginEdit}>
        <FaPencilAlt />
      </Button>
    </div>
  );
}
