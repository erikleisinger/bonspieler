import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { FaPlusCircle } from "react-icons/fa";

import "./add-bracket-button.scss";
export default function AddBracketButton({
  className,
  onClick = () => {},
}: {
  className?: string;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-xl  bg-emerald-500/10 p-4 w-full flex items-center justify-center add-bracket-button",
        className
      )}
    >
      <Button
        variant="ghost"
        className="w-fit h-fit text-white hover:text-emerald-500 hover:bg-emerald-500/20"
        onClick={onClick}
      >
        <FaPlusCircle
          style={{
            height: "2.5rem",
            width: "2.5rem",
          }}
        />
      </Button>
    </div>
  );
}
