import { useAppSelector } from "@/lib/store";
import {
  getTournamentStartDate,
  getTournamentEndDate,
} from "@/entities/Tournament";
import { EditTournamentStartDate } from "@/features/Tournament/EditTournamentStartDate";
import { EditTournamentEndDate } from "@/features/Tournament/EditTournamentEndDate";
import Typography from "@/shared/ui/typography";
export default function TournamentOptions() {
  const startDate = useAppSelector(getTournamentStartDate);
  const endDate = useAppSelector(getTournamentEndDate);
  return (
    <div className="flex flex-col gap-2 py-4">
      <div>
        <Typography tag="overline">Start date</Typography>
        <EditTournamentStartDate maxDate={endDate} />
      </div>
      <div>
        <Typography tag="overline">End date</Typography>
        <EditTournamentEndDate minDate={startDate} />
      </div>
    </div>
  );
}
