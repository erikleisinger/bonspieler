import type { Nullable } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getTournamentEndDate,
  setTournamentEndDate,
} from "@/entities/Tournament";
import EditableDate from "@/shared/input/EditableDate";

export default function EditTournamentEndDate({
  minDate,
}: {
  minDate?: Nullable<string | Date>;
}) {
  const endDate = useAppSelector(getTournamentEndDate);
  const dispatch = useAppDispatch();

  function updateEndDate(date: string) {
    dispatch(setTournamentEndDate(date));
  }

  return (
    <EditableDate
      tag="p"
      value={endDate}
      onChange={updateEndDate}
      minDate={minDate}
      withTime={false}
    />
  );
}
