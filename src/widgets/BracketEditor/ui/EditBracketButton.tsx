import { useContext } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { Button } from "@/shared/ui/button";
import { FaCog } from "react-icons/fa";
export default function EditBracketButton({
  editBracket,
}: {
  editBracket: (index: number) => void;
}) {
  const { currentlyViewingBracket, scrollToBracket } =
    useContext(BracketContext);

  function handleEditBracket() {
    editBracket(currentlyViewingBracket);
    setTimeout(() => {
      scrollToBracket(currentlyViewingBracket);
    });
  }

  return (
    <Button variant="secondary" size="icon" onClick={handleEditBracket}>
      <FaCog />
    </Button>
  );
}
