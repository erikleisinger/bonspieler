"use client";

import * as React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { parseISO } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import DateDisplay from "./date-display";
import { Nullable } from "../types";
export function DateTimePicker({
  contentRef,
  date,
  defaultOpen = false,
  minDate,
  maxDate,
  setDate,
  side = "top",
  withTime = true,
}: {
  contentRef?: React.RefObject<HTMLDivElement>;
  date: Date | undefined;
  defaultOpen?: boolean;
  maxDate?: Nullable<string | Date>;
  minDate?: Nullable<string | Date>;
  setDate: (newDate: Date | undefined) => void;
  side: "top" | "bottom" | "left" | "right";
  withTime?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (date) {
      const newDate = new Date(date);
      if (type === "hour") {
        newDate.setHours(parseInt(value));
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      }
      setDate(newDate);
    }
  };

  function getDate(dateToParse: Nullable<string | Date> | undefined) {
    if (!dateToParse) return null;
    if (typeof dateToParse === "string") {
      return parseISO(dateToParse);
    }
    return dateToParse;
  }

  const disabledDefs = React.useMemo(() => {
    const min = getDate(minDate);
    const max = getDate(maxDate);

    return [
      ...(min ? [{ before: min }] : []),
      ...(max ? [{ after: max }] : []),
    ];
  }, [minDate, maxDate]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            isOpen && "ring-2"
          )}
        >
          <FaCalendarAlt className="mr-2 h-4 w-4" />
          <DateDisplay date={date} withTime={withTime} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" side={side} ref={contentRef}>
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            disabled={disabledDefs}
          />
          {withTime && (
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {hours.reverse().map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        date && date.getHours() === hour ? "default" : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        date && date.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange("minute", minute.toString())
                      }
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
