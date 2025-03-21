import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getTournamentStartDate,
  setTournamentStartDate,
} from "@/entities/Tournament";
import EditableDate from "@/shared/input/EditableDate";
import { Nullable } from "@/shared/types";

export default function EditTournamentStartDate({
  maxDate,
}: {
  maxDate?: Nullable<string | Date>;
}) {
  const startDate = useAppSelector(getTournamentStartDate);
  const dispatch = useAppDispatch();

  function updateStartDate(date: string) {
    dispatch(setTournamentStartDate(date));
  }

  return (
    <EditableDate
      tag="p"
      value={startDate}
      onChange={updateStartDate}
      maxDate={maxDate}
      withTime={false}
    />
  );
}
