import { useMousePosition } from "@/shared/composables/useMousePosition";
import { useRef } from "react";
export default function GameConnectionHypothesis() {
  const { x, y } = useMousePosition();

  const el = useRef<HTMLDivElement>(null);
  function getStyle() {
    const base = {
      borderColor: "white",
    };
    if (!el.current) return base;
    const { left, top } = el.current.getBoundingClientRect();
    return {
      ...base,
      width: (x || 0) - left + "px",
      height: Math.abs((y || 0) - top) + "px",
      transform:
        (y || 0) < top
          ? `translateY(${(y || 0) - top + 4}px) translateX(-4px)`
          : "translateX(-4px)",
      borderWidth: (y || 0) < top ? "0 4px 4px 0" : "4px 4px 0 0",
    };
  }
  return (
    <div
      className="w-1  translate-x-1 h-full py-[6px] flex z-10 pointer-events-none"
      ref={el}
    >
      <div className="grid grid-rows-[12px_1fr_12px_12px_1fr_12px] grid-cols-[16px_16px] h-full border-[inherit] w-9">
        <div className="border-[4px] border-l-0 border-b-0 rounded-tr-[12px] border-[inherit] grow translate-y-[4px]  "></div>
        <div />
        <div className="border-[4px] border-t-0 border-l-0 border-b-0 translate-y-[3px] border-[inherit]" />
        <div />

        <div />
        <div className="border-[4px] border-r-0 border-t-0 rounded-bl-[18px]   border-[inherit] translate-x-[-4px] translate-y-[2px]   "></div>
        <div />
        <div className="border-[4px] border-b-0 border-r-0 rounded-tl-[18px] border-[inherit] translate-x-[-4px] translate-y-[-2px] "></div>
        <div className="border-[4px] border-t-0 border-l-0 border-b-0 translate-y-[-3px] border-[inherit]" />
        <div />
        <div className="border-[4px] border-l-0 border-t-0 rounded-br-[12px] border-[inherit] grow translate-y-[-4px] "></div>
        <div />
      </div>
      <div className="relative">
        <div className="absolute w-1 h-1 top-0 bottom-0 m-auto">
          <div style={getStyle()} />
        </div>
      </div>
    </div>
  );
}
