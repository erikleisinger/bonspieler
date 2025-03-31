import { useMemo } from "react";
import type { GameConnectionPositionInfo } from "../types/GameConnection";

export default function GameConnection({
  gameId,
  positionInfo,
  scale,
}: {
  gameId: string;
  positionInfo: GameConnectionPositionInfo;
  scale: number;
}) {
  const { position, dimensions } = useMemo(() => {
    if (!positionInfo)
      return {
        position: {
          x: 0,
          y: 0,
        },
        dimensions: {
          height: 0,
          width: 0,
        },
      };
    const { position, dimensions } = positionInfo;
    return { position, dimensions };
  }, [positionInfo]);

  return (
    /**
     * TODO:
     * Use an SVG instead of all these divs
     */
    positionInfo && (
      <div
        id={"connection-" + gameId}
        className="absolute grid grid-cols-[32px_1fr] items-center  border-connection  group cursor-pointer "
        style={{
          left: position.x + "px",
          top: position.y + "px",
          width: dimensions.width + "px",
          height: dimensions.height + "px",
        }}
      >
        <div className="grid grid-rows-[12px_1fr_12px_12px_1fr_12px] grid-cols-[16px_16px] h-full border-[inherit]">
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

        <div
          className="h-[4px] bg-connection  grow   cursor-pointer"
          style={{
            width: "calc(100% + 4px)",
            transform: `translateX(-4px)`,
          }}
        ></div>
      </div>
    )
  );
}
