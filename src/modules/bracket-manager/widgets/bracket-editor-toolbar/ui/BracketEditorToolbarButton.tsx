import { Button } from "@/shared/ui/button";
import CustomTooltip from "@/shared/ui/custom-tooltip";
export default function BracketEditorToolbarButton({
  active,
  children,
  onClick,
  tooltip,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  tooltip: string;
}) {
  return (
    <CustomTooltip side="right" text={tooltip}>
      <Button
        onClick={onClick}
        size="icon"
        variant={active ? "default" : "ghost"}
      >
        {children}
      </Button>
    </CustomTooltip>
  );
}
