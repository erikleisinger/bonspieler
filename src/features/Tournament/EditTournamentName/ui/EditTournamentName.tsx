import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getCurrentTournamentName,
  setCurrentTournamentName,
} from "@/entities/Tournament";

import EditableText from "@/shared/input/EditableText";
export default function EditTournamentName() {
  const dispatch = useAppDispatch();
  const name = useAppSelector(getCurrentTournamentName);
  function setName(newName: string) {
    dispatch(setCurrentTournamentName(newName));
  }

  return (
    <EditableText tag="h3" value={name} onChange={setName} maxLength={50} />
  );
}
