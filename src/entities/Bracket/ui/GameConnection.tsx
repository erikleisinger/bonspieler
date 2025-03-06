import { useMemo } from "react";
import type { GameConnectionPositionInfo } from "../lib/types/GameConnection";
export default function GameConnection({
  gameId,
  positionInfo,
}: {
  gameId: string;
  positionInfo: GameConnectionPositionInfo;
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
  }, [positionInfo, gameId]);
  return (
    positionInfo && (
      <div
        id={"connection-" + gameId}
        className="absolute flex items-center pointer-events-auto border-white hover:border-blue-500 group cursor-pointer "
        style={{
          left: position.x + "px",
          top: position.y + "px",
          width: dimensions.width + "px",
          height: dimensions.height + "px",
        }}
      >
        <div className="grid grid-rows-2 gap-[25px] w-4 h-full border-[inherit]">
          <div className="border-[4px] border-l-0 border-b-0 rounded-tr-[12px] border-[inherit]  "></div>
          <div className="border-[4px] border-l-0 border-t-0 rounded-br-[12px] border-[inherit]  "></div>
        </div>
        <div className="grid grid-rows-2 h-[30px] translate-x-[-4px] border-[inherit]">
          <div className="border-[4px] border-r-0 border-t-0 rounded-bl-[16px] translate-y-[2px]  border-[inherit]  w-8 "></div>
          <div className="border-[4px] border-b-0 border-r-0 rounded-tl-[16px] translate-y-[-2px] border-[inherit] w-8 "></div>
        </div>
        <div className="h-[3px] bg-white group-hover:bg-blue-500 grow translate-x-[-5px] cursor-pointer"></div>
      </div>
    )
  );
}
