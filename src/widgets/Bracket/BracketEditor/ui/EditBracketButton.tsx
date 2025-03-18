import { useAppSelector } from "@/lib/store";
import { getCurrentlyViewingBracket } from "@/entities/BracketEvent";
import { Button } from "@/shared/ui/button";
import { FaCog } from "react-icons/fa";
import { scrollToBracket } from "@/entities/Bracket";
export default function EditBracketButton({
  editBracket,
}: {
  editBracket: (index: number) => void;
}) {
  const currentlyViewingBracket = useAppSelector(getCurrentlyViewingBracket);

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
