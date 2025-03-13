import { Button } from "@/shared/ui/button";
import { useState } from "react";

export default function SaveButton({
  onClick,
  className,
  ...props
}: {
  className?: string;
  onClick: () => Promise<void>;
}) {
  const [saveButtonText, setSaveButtonText] = useState("Save");
  const [saving, setSaving] = useState(false);

  async function handleClick() {
    if (saving) return;
    setSaving(true);
    setSaveButtonText("Saving...");
    await onClick();
    setSaveButtonText("Saved!");
    setTimeout(() => {
      setSaveButtonText("Save");
      setSaving(false);
    }, 1000);
  }
  return (
    <Button className={className} {...props} onClick={handleClick}>
      {saveButtonText}
    </Button>
  );
}
