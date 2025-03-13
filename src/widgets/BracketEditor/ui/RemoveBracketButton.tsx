import { useContext } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { Button } from "@/shared/ui/button";
import { FaTrash } from "react-icons/fa";
export default function RemoveBracketButton({
  onClick,
}: {
  onClick: (index: number) => void;
}) {
  const { currentlyViewingBracket, scrollToBracket } =
    useContext(BracketContext);

  function handleRemoveBracket() {
    onClick(currentlyViewingBracket);
    setTimeout(() => {
      scrollToBracket(currentlyViewingBracket - 1);
    });
  }

  return (
    <Button variant="secondary" size="icon" onClick={handleRemoveBracket}>
      <FaTrash />
    </Button>
  );
}
