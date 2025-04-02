import { Button } from "@/shared/ui/button";
import { FaTrash } from "react-icons/fa";

export default function DeleteBracketOverlay({
  bracketIndex,
  onDelete = () => {},
}: {
  bracketIndex: number;
  onDelete: (bracketIndex: number) => void;
}) {
  return (
    <div className="absolute inset-0  w-full h-full bg-black/10  z-40 rounded-3xl group flex items-center justify-center">
      <Button
        variant="ghost"
        className=" h-fit w-fit text-white hover:text-destructive hover:bg-destructive/20"
        onClick={() => onDelete(bracketIndex)}
      >
        <FaTrash
          style={{
            height: "4rem",
            width: "4rem",
          }}
        />
      </Button>
    </div>
  );
}
