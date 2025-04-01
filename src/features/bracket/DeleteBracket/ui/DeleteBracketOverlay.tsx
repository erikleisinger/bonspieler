import useDeleteBracket from "../lib/useDeleteBracket";
import { Button } from "@/shared/ui/button";
import { FaTrash } from "react-icons/fa";

export default function DeleteBracketOverlay({
  bracketIndex,
}: {
  bracketIndex: number;
}) {
  const { deleteBracket } = useDeleteBracket();

  return (
    <div className="absolute inset-0  w-full h-full hover:bg-black/10 z-50 rounded-3xl group flex items-center justify-center">
      <Button
        variant="ghost"
        className="hidden group-hover:block h-fit w-fit text-white hover:text-destructive hover:bg-destructive/20"
        onClick={() => deleteBracket(bracketIndex)}
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
