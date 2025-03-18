import { useEffect, useState } from "react";

import { useAppSelector } from "@/lib/store";
import {
  getBracketEventBrackets,
  getCurrentlyViewingBracket,
} from "@/entities/BracketEvent";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/typography";
import RemoveBracketButton from "./RemoveBracketButton";
import BracketInfo from "./BracketInfo";

import { HiOutlinePlus } from "react-icons/hi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getBracketName } from "@/entities/Bracket";
import { scrollToBracket } from "@/entities/Bracket";
export default function BracketOptions({
  onClose,
  editEvent,
  removeBracket,
}: {
  onClose: () => void;
  editEvent: () => void;
  removeBracket: (bracketIndex: number) => void;
}) {
  const currentlyViewingBracket = useAppSelector(getCurrentlyViewingBracket);
  const brackets = useAppSelector(getBracketEventBrackets);

  const [bracketIndex, setBracketIndex] = useState(0);

  useEffect(() => {
    setBracketIndex(currentlyViewingBracket);
  }, []);

  function goBracket(newIndex: number) {
    setBracketIndex(newIndex);
    scrollToBracket(newIndex);
  }

  return (
    <div className="p-4 grid grid-rows-[auto_1fr_auto] absolute inset-0">
      <header className=" flex justify-between mb-8 pt-2 pl-2">
        <div className="flex gap-2">
          {brackets.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                disabled={!bracketIndex}
                onClick={() => goBracket(bracketIndex - 1)}
              >
                <FaChevronLeft />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                disabled={bracketIndex === brackets.length - 1}
                onClick={() => goBracket(bracketIndex + 1)}
              >
                <FaChevronRight />
              </Button>
            </>
          )}
          <Typography className="ml-2" tag="h2">
            {getBracketName(bracketIndex)}
          </Typography>
        </div>

        <Button variant="ghost" size="icon" onClick={onClose}>
          <HiOutlinePlus
            className="rotate-45"
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
        </Button>
      </header>
      <div>
        <BracketInfo
          className="bg-glass"
          bracketIndex={bracketIndex}
          editDrawTimes={editEvent}
        />
      </div>
      <footer className="flex justify-center">
        <RemoveBracketButton
          onClick={() => removeBracket(currentlyViewingBracket)}
        />
      </footer>
    </div>
  );
}
