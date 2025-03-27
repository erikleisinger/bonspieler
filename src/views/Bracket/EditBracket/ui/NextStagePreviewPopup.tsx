import "./next-stage-preview-popup.scss";
import { cn } from "@/lib/utils";
export default function NextStagePreviewPopup({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "next-stage-preview__popup  bg-glass backdrop-blur-sm",
        className
      )}
    >
      <div className="next-stage-preview__popup--content absolute inset-0 overflow-auto ">
        <div className="fixed top-0 left-0 right-0 bg-red-500/10 pointer-events-auto" />

        <div className="pointer-events-none">{children}</div>
      </div>
    </div>
  );
}
