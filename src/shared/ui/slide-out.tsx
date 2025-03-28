import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
export default function Slideout({
  autoClose,
  onAutoClose,
  className = "",
  children,
  fixed,
  fullHeight = true,
  id,
  nudgeLeftPx = 0,
  visible,
}: {
  autoClose?: boolean;
  onAutoClose?: () => void;
  className?: string;
  children?: React.ReactNode;
  fixed?: boolean;
  fullHeight?: boolean;
  id?: string;
  nudgeLeftPx?: number;
  visible: boolean;
}) {
  const el = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!!onAutoClose && el.current && !el.current.contains(event.target)) {
        onAutoClose();
        console.log("auto close");
      }
    }
    if (autoClose && visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, autoClose, onAutoClose]);

  return (
    <div
      id={id}
      ref={el}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.18)",
        right: `${nudgeLeftPx}px`,
        transform: visible ? `translateX(0)` : "translateX(100%)",
        opacity: visible ? 1 : 0,
      }}
      className={cn(
        "top-0 bottom-0    transition-all  w-screen md:w-[min(500px,45vw)] backdrop-blur-md shadow-sm pointer-events-auto  z-50",
        fixed ? "fixed" : "absolute",

        fullHeight ? "h-full" : "",
        className
      )}
    >
      <div className="absolute inset-0 overflow-auto backdrop-blur-lg bg-glass">
        {visible && children}
      </div>
    </div>
  );
}
