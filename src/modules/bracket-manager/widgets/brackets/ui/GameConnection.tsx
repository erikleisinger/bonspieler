import { useMemo } from "react";
import type { GameConnectionPositionInfo } from "../types/GameConnection";
import { ROUND_GAP } from "../lib/constants/style";
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
  }, [positionInfo]);

  return (
    /**
     * TODO:
     * Use an SVG instead of all these divs
     */
    positionInfo && (
      <div
        id={"connection-" + gameId}
        className="absolute  items-center  border-connection  group cursor-pointer "
        style={{
          left: position.x + "px",
          top: position.y + "px",
          width: dimensions.width + "px",
          height: dimensions.height + "px",
        }}
      >
        <div
          className="h-full border-r-4 border-connection border-t-4 border-b-4 rounded-tr-md rounded-br-md"
          style={{
            width: ROUND_GAP / 2 + "px",
          }}
        ></div>

        <div
          className="h-[4px] bg-connection  grow absolute top-0 bottom-0 m-auto  cursor-pointer"
          style={{
            width: `calc(100% - ${ROUND_GAP / 2}px)`,
            transform: `translateX(${ROUND_GAP / 2}px)`,
          }}
        ></div>
      </div>
    )
  );
}
