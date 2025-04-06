import { ROUND_GAP, ROUND_GAP_SMALL } from "../lib/constants/style";
import { cn } from "@/lib/utils";
import { BRACKET_CONTAINER_ELEMENT_ID_PREFIX } from "@/entities/Bracket";
import { useContext } from "react";
import { BracketContext } from "../lib/context/BracketContext";
export interface BracketProps {
  bracketNumber: number;
  children?: React.ReactNode;
}

export default function Bracket({ children, bracketNumber }: BracketProps) {
  const { size } = useContext(BracketContext);
  const isSmall = size !== "full";
  return (
    <div
      id={BRACKET_CONTAINER_ELEMENT_ID_PREFIX + bracketNumber}
      className={cn("relative w-max")}
    >
      <div className="p-0 ">
        <div
          className="flex relative "
          style={{
            gap: (isSmall ? ROUND_GAP_SMALL : ROUND_GAP) + "px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
