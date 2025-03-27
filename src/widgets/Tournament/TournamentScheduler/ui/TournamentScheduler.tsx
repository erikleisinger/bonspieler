import { useState } from "react";

import DateSelection from "./DateSelection";
export default function TournamentScheduler() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const startDate = new Date(2025, 2, 1);
  const endDate = new Date(2025, 2, 13);

  return (
    <div className="w-fit m-auto">
      <DateSelection
        startDate={startDate}
        endDate={endDate}
        selected={selectedDate}
        selectDate={setSelectedDate}
      />
    </div>
  );
}
