import { useState } from "react";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/typography";
import RemoveBracketButton from "./RemoveBracketButton";
import BracketInfo from "./BracketInfo";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BracketGameType, getBracketName } from "@/entities/Bracket";
import { scrollToBracket } from "@/entities/Bracket";
export default function BracketOptions({
  brackets = [],
  editDrawTimes,
  onClose = () => {},
  removeBracket = () => {},
}: {
  brackets: BracketGameType[][][];
  editDrawTimes: () => void;
  onClose: () => void;
  removeBracket: (bracketIndex: number) => void;
}) {
  const [bracketIndex, setBracketIndex] = useState(0);

  function goBracket(newIndex: number) {
    setBracketIndex(newIndex);
    scrollToBracket(newIndex);
  }

  function handleRemoveBracket() {
    onClose();
    removeBracket(bracketIndex);
    if (bracketIndex) goBracket(bracketIndex - 1);
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
      </header>
      <div>
        <BracketInfo
          className="bg-glass"
          bracketIndex={bracketIndex}
          editDrawTimes={editDrawTimes}
          bracket={brackets[bracketIndex]}
        />
      </div>
      <footer className="flex justify-center">
        <RemoveBracketButton
          onClick={handleRemoveBracket}
          bracketNumber={bracketIndex}
        />
      </footer>
    </div>
  );
}
