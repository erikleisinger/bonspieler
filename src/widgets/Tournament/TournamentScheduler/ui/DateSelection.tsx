import { useState } from "react";
import { eachDayOfInterval, format } from "date-fns";
import DateBlock from "./DateBlock";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/shared/ui/button";
import { Nullable } from "@/shared/types";
export default function DateSelection({
  startDate,
  endDate,
  selected,
  selectDate,
}: {
  startDate: Date;
  endDate: Date;
  selected: Nullable<Date>;
  selectDate: (date: Date) => void;
}) {
  function getAllDaysBetween(startDate, endDate) {
    // Convert string dates to Date objects if needed
    const start =
      typeof startDate === "string" ? new Date(startDate) : startDate;
    const end = typeof endDate === "string" ? new Date(endDate) : endDate;

    // Use eachDayOfInterval to get all days in the range (inclusive)
    return eachDayOfInterval({ start, end });
  }

  const dates = getAllDaysBetween(startDate, endDate);

  const [visibleDateStart, setVisibleDateStart] = useState(0);
  const visibleDates = dates.slice(visibleDateStart, visibleDateStart + 3);

  return (
    <div className="flex gap-1">
      <div>
        <Button
          variant="ghost"
          className="h-full"
          disabled={visibleDateStart === 0}
          onClick={() => setVisibleDateStart(visibleDateStart - 1)}
        >
          <FaChevronLeft />
        </Button>
      </div>

      {visibleDates.map((date) => (
        <DateBlock
          key={date.toISOString()}
          date={date}
          selected={!!selected && selected.toISOString() === date.toISOString()}
          onClick={() => selectDate(date)}
        />
      ))}
      <div>
        <Button
          variant="ghost"
          className="h-full"
          disabled={visibleDateStart === dates.length - 3}
          onClick={() => setVisibleDateStart(visibleDateStart + 1)}
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
}
