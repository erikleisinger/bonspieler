import { Button } from "@/shared/ui/button";
import { useState } from "react";

export default function SaveButton({
  onClick,
  className,
  text = ["Save", "Saving...", "Saved!"],
  disabled = false,
  size,
  variant,
  ...props
}: {
  className?: string;
  text?: string[];
  onClick: () => Promise<void>;
  disabled?: boolean;
  size?: string;
  variant?: string;
}) {
  const [saveButtonText, setSaveButtonText] = useState(text[0]);
  const [saving, setSaving] = useState(false);

  async function handleClick() {
    if (saving) return;
    setSaving(true);
    setSaveButtonText(text[1]);
    await onClick();
    setSaveButtonText(text[2]);
    setTimeout(() => {
      setSaveButtonText(text[0]);
      setSaving(false);
    }, 1000);
  }
  return (
    <Button
      disabled={disabled}
      className={className}
      variant={variant}
      size={size}
      {...props}
      onClick={handleClick}
    >
      {saveButtonText}
    </Button>
  );
}
