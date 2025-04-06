import { useMemo } from "react";
import type { GameConnectionPositionInfo } from "../types/GameConnection";
import { ROUND_GAP, ROUND_GAP_SMALL } from "../lib/constants/style";
import { cn } from "@/lib/utils";
export default function GameConnection({
  small,
  gameId,
  positionInfo,
}: {
  small?: boolean;
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

  const showHandlebars = !small || dimensions.height > 12;

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
        {showHandlebars && (
          <div
            className={cn(
              "h-full  border-connection ",
              small && !dimensions.height
                ? ""
                : small
                ? "border-r-[3px] border-t-[3px] border-b-[3px] rounded-tr-md rounded-br-md "
                : "border-r-4 border-t-4 border-b-4 rounded-tr-md rounded-br-md"
            )}
            style={{
              width: (small ? ROUND_GAP_SMALL : ROUND_GAP) / 2 + "px",
            }}
          ></div>
        )}

        <div
          className={cn(
            " bg-connection  grow absolute top-0 bottom-0 m-auto  cursor-pointer",
            small ? "h-[3px]" : "h-[4px]"
          )}
          style={{
            width: !showHandlebars
              ? "100%"
              : `calc(100% - ${(small ? ROUND_GAP_SMALL : ROUND_GAP) / 2}px)`,
            transform: !showHandlebars
              ? "unset"
              : `translateX(${(small ? ROUND_GAP_SMALL : ROUND_GAP) / 2}px)`,
          }}
        ></div>
      </div>
    )
  );
}
