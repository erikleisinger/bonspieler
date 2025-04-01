import { useRef, useState } from "react";
import { Input } from "@/shared/ui/input";
import Typography from "@/shared/ui/typography"; // Assuming this import is missing

import { Nullable } from "../types";
import EditableValue from "./editable-value";

export default function EditableText({
  value,
  onChange,
  maxLength = 100,
  tag,
}: {
  value: Nullable<string>;
  onChange: (value: string) => void;
  maxLength?: number;
  tag: string;
}) {
  const input = useRef(null);

  const [editedValue, setEditedValue] = useState("");

  function beginEdit() {
    setEditedValue(value || "");
    setTimeout(() => {
      if (input.current) input.current.select();
    }, 1);
  }

  function updateEditedValue(newValue: string) {
    if (typeof newValue !== "string") return;
    if (newValue.length > maxLength) return;
    setEditedValue(newValue);
  }

  return (
    <EditableValue
      onBeginEdit={beginEdit}
      onSave={() => onChange(editedValue)}
      editingChildren={
        <Input
          value={editedValue}
          onChange={(e) => updateEditedValue(e.target.value)}
          autoFocus
          ref={input}
        />
      }
      inputRef={input}
    >
      <Typography tag={tag}>{value}</Typography>
    </EditableValue>
  );
}
