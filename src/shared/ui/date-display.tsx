import { format, parseISO } from "date-fns";

import { useMemo } from "react";
export default function DateDisplay({
  date,
  withTime = true,
}: {
  date: Date | string | null | undefined;
  withTime?: boolean;
}) {
  const timeFormat = withTime ? "h:mm aa • MMM do, yyyy" : "MMM do, yyyy";

  const formattedDate = useMemo(() => {
    let dateToDisplay;
    if (!date) return "";
    dateToDisplay = date;
    if (typeof date === "string") {
      dateToDisplay = parseISO(date);
    }
    return format(dateToDisplay, timeFormat);
  }, [withTime, date]);

  return formattedDate ? formattedDate : <span>MM/DD/YYYY hh:mm</span>;
}
