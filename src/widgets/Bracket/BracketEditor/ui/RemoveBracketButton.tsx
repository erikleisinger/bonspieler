import { useContext } from "react";
import { useAppSelector } from "@/lib/store";
import { getCurrentlyViewingBracket } from "@/entities/BracketEvent";
import { Button } from "@/shared/ui/button";
import { getBracketName } from "@/entities/Bracket";
import { scrollToBracket } from "@/entities/Bracket";
export default function RemoveBracketButton({
  onClick,
  ...props
}: {
  onClick: (index: number) => void;
}) {
  const currentlyViewingBracket = useAppSelector(getCurrentlyViewingBracket);

  function handleRemoveBracket() {
    onClick(currentlyViewingBracket);
    setTimeout(() => {
      scrollToBracket(currentlyViewingBracket - 1);
    });
  }

  return (
    <Button
      {...props}
      variant="destructive"
      className="min-w-[300px] m-auto mt-2"
      onClick={handleRemoveBracket}
    >
      Delete {getBracketName(currentlyViewingBracket)}
    </Button>
  );
}
