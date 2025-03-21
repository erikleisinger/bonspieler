import { formatISO, parseISO } from "date-fns";
import { DateTimePicker } from "@/shared/ui/date-time-picker";
export default function InputDate({
  date,
  defaultOpen = false,
  minDate,
  maxDate,
  popoverRef,
  id,
  setDate,
  side = "left",
  withTime = true,
}: {
  date: string | null;
  defaultOpen?: boolean;
  minDate?: Date;
  maxDate?: Date;
  popoverRef?: React.RefObject<HTMLDivElement>;
  id?: string;
  setDate: (date: string) => void;
  side?: string;
  withTime?: boolean;
}) {
  function getISOTime(date?: string) {
    if (!date) return null;
    return parseISO(date);
  }

  function updateDate(newDate: Date) {
    if (!newDate) {
      setDate(newDate);
    } else {
      setDate(formatISO(newDate));
    }
  }

  return (
    <DateTimePicker
      id={id}
      date={getISOTime(date)}
      setDate={(e: Date) => updateDate(e)}
      minDate={minDate}
      maxDate={maxDate}
      side={side}
      withTime={withTime}
      contentRef={popoverRef}
      defaultOpen={defaultOpen}
    />
  );
}
