import { useAppSelector } from "@/lib/store";

import { Button } from "@/shared/ui/button";
import { getBracketName } from "@/entities/Bracket";
import { scrollToBracket } from "@/entities/Bracket";
export default function RemoveBracketButton({
  onClick,
  bracketNumber,
  ...props
}: {
  bracketNumber: number;
  onClick: () => void;
}) {
  return (
    <Button
      {...props}
      variant="destructive"
      className="min-w-[300px] m-auto mt-2"
      onClick={onClick}
    >
      Delete {getBracketName(bracketNumber)}
    </Button>
  );
}
