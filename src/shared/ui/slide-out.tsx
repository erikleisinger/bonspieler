import { cn } from "@/lib/utils";
export default function Slideout({
  className = "",
  children,
  fullHeight = true,
  id,
  nudgeLeftPx,
  visible,
}: {
  className?: string;
  children?: React.ReactNode;
  fullHeight?: boolean;
  id?: string;
  nudgeLeftPx?: number;
  visible: boolean;
}) {
  return (
    <div
      id={id}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.18)",
        transform: visible ? `translateX(0)` : "translateX(100%)",
        right: visible ? `${nudgeLeftPx || 0}px` : "0",
        opacity: visible ? 1 : 0,
      }}
      className={cn(
        "absolute  top-0 bottom-0  transition-all bg-glass w-screen md:w-[min(500px,45vw)] backdrop-blur-md shadow-md",

        fullHeight ? "h-full" : "",
        className
      )}
    >
      {children}
    </div>
  );
}
