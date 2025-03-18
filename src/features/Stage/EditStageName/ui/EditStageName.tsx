import { useRef, useEffect, useState } from "react";
import { Input } from "@/shared/ui/input";
import Typography from "@/shared/ui/typography"; // Assuming this import is missing
import { Button } from "@/shared/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setBracketEventName,
  getBracketEventName,
} from "@/entities/BracketEvent";
const MAX_NAME_LENGTH = 28;
export default function EditEventName() {
  const dispatch = useAppDispatch();
  const eventName = useAppSelector(getBracketEventName);

  const el = useRef(null);
  const input = useRef(null);
  const [editing, setEditing] = useState(false);
  const [editedEventName, setEditedEventName] = useState("");

  function saveEdit(newName: string) {
    dispatch(setBracketEventName(newName));
    setEditedEventName("");
    setEditing(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (el.current && !el.current.contains(event.target)) {
        saveEdit(editedEventName);
      }
    }
    if (editing) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [el, editedEventName, editing]);

  function beginEdit() {
    setEditedEventName(eventName);
    setEditing(true);
    setTimeout(() => {
      if (input.current) input.current.select();
    }, 1);
  }

  function onKeyDown(e: KeyboardEvent) {
    const { key } = e || {};
    if (["Enter", "Tab"].includes(key)) {
      saveEdit(editedEventName);
    }
  }

  function updateEditedEventName(newName: string) {
    if (typeof newName !== "string") return;
    if (newName.length > MAX_NAME_LENGTH) return;
    setEditedEventName(newName);
  }

  return (
    <div ref={el} className={editing ? "grow" : "w-full"}>
      {editing ? (
        <Input
          value={editedEventName}
          onChange={(e) => updateEditedEventName(e.target.value)}
          autoFocus
          onKeyDown={onKeyDown}
          ref={input}
        />
      ) : (
        <div className="grid grid-cols-[1fr,auto] gap-2">
          <Typography tag="h2" className="break-all">
            {eventName}
          </Typography>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={beginEdit}
          >
            <FaPencilAlt />
          </Button>
        </div>
      )}
    </div>
  );
}
