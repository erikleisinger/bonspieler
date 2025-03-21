import { useRef, useState } from "react";
import Typography from "@/shared/ui/typography"; // Assuming this import is missing

import { Nullable } from "../types";
import EditableValue from "../ui/editable-value";
import InputDate from "./InputDate";
import DateDisplay from "../ui/date-display";

export default function EditableDate({
  value,
  onChange,
  maxDate,
  minDate,
  tag,
  withTime = true,
}: {
  value: Nullable<string>;
  onChange: (value: string) => void;
  maxDate?: Nullable<Date | string>;
  minDate?: Nullable<Date | string>;
  tag: string;
  withTime?: boolean;
}) {
  const input = useRef(null);
  const popoverRef = useRef(null);

  const [editedValue, setEditedValue] = useState("");

  function beginEdit() {
    setEditedValue(value || "");
    setTimeout(() => {
      if (input.current) input.current.select();
    }, 1);
  }

  return (
    <EditableValue
      onBeginEdit={beginEdit}
      onSave={() => onChange(editedValue)}
      checkRefs={popoverRef}
      editingChildren={
        <InputDate
          date={editedValue}
          setDate={(newValue) => setEditedValue(newValue)}
          ref={input}
          minDate={minDate}
          maxDate={maxDate}
          popoverRef={popoverRef}
          defaultOpen={true}
          withTime={withTime}
        />
      }
    >
      <div className="flex items-center">
        <DateDisplay date={value} tag={tag} withTime={withTime} />
      </div>
    </EditableValue>
  );
}
