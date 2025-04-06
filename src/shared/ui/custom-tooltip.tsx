import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./tooltip";

export default function CustomTooltip({
  children,
  className,
  side = "right",
  tooltip,
  text,
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  side?: "right" | "left" | "top" | "bottom";
  tooltip?: React.ReactNode;
  text?: string;
  style?: React.CSSProperties;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={className} side={side} style={style}>
          {text || tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
