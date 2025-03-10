import {
  Tooltip as TooltipShad,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip-shadcn";
export default function Tooltip({
  children,
  disabled,
  text,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  text: string;
}) {
  return (
    <>
      {disabled ? (
        children
      ) : (
        <TooltipProvider disableHoverableContent={disabled}>
          <TooltipShad>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>{text}</TooltipContent>
          </TooltipShad>
        </TooltipProvider>
      )}
    </>
  );
}
