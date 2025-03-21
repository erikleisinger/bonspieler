import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setBracketEventName,
  getBracketEventName,
} from "@/entities/BracketEvent";
const MAX_NAME_LENGTH = 28;
import EditableText from "@/shared/input/EditableText";
export default function EditEventName() {
  const dispatch = useAppDispatch();
  const eventName = useAppSelector(getBracketEventName) || "Unnamed event";

  function setName(newName: string) {
    dispatch(setBracketEventName(newName));
  }

  return (
    <EditableText
      tag="h2"
      value={eventName}
      onChange={setName}
      maxLength={MAX_NAME_LENGTH}
    />
  );
}
