import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { FaPencilAlt } from "react-icons/fa";
export default function EditableValue({
  checkRefs,
  children,
  editingChildren,
  inputRef,
  onBeginEdit = () => {},
  onSave = () => {},
}: {
  checkRefs: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  editingChildren: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement>;
  onBeginEdit: () => void;
  onSave: () => void;
}) {
  const el = useRef(null);
  const [editing, setEditing] = useState(false);

  function save() {
    onSave();
    setTimeout(() => {
      setEditing(false);
    }, 1);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        el.current &&
        !el.current.contains(event.target) &&
        (!checkRefs?.current || !checkRefs.current.contains(event.target))
      ) {
        save();
      }
    }
    if (editing) {
      document.addEventListener("mousedown", handleClickOutside);
      if (inputRef) {
        inputRef.current?.addEventListener("keydown", onKeyDown);
      }
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      if (inputRef) inputRef.current?.removeEventListener("keydown", onKeyDown);
    };
  }, [el, editing, onSave, checkRefs]);

  function onKeyDown(e: KeyboardEvent) {
    const { key } = e || {};
    if (["Enter", "Tab"].includes(key)) {
      save();
    }
  }

  function beginEdit() {
    onBeginEdit();
    setEditing(true);
  }

  return (
    <div ref={el} className={editing ? "grow" : "w-full"}>
      {editing ? (
        editingChildren
      ) : (
        <div
          className="grid grid-cols-[1fr,auto] gap-2 group cursor-pointer"
          onClick={beginEdit}
        >
          {children}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 opacity-50 scale-[0.6] group-hover:scale-[1] group-hover:opacity-100 transition-all"
            onClick={beginEdit}
          >
            <FaPencilAlt />
          </Button>
        </div>
      )}
    </div>
  );
}
