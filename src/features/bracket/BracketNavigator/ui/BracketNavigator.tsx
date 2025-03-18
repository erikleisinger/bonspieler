import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getCurrentlyViewingBracket,
  setCurrentlyViewingBracket,
} from "@/entities/BracketEvent";
import { scrollToBracket } from "@/entities/Bracket";
import {
  getBracketName,
  BRACKET_CONTAINER_ELEMENT_ID_PREFIX,
} from "@/entities/Bracket";
export default function BracketNavigator({
  onBracketClick = () => {},
  numBrackets,
}: {
  onBracketClick?: (bracketIndex: number) => void;
  numBrackets: number;
}) {
  const [intersectionObservers, setIntersectionObservers] = useState<
    IntersectionObserver[]
  >([]);

  const dispatch = useAppDispatch();
  const currentlyViewingBracket = useAppSelector(getCurrentlyViewingBracket);

  useEffect(() => {
    for (let i = 0; i < numBrackets; i++) {
      const el = document.getElementById(
        BRACKET_CONTAINER_ELEMENT_ID_PREFIX + i
      );
      if (!el) continue;
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.01,
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(setCurrentlyViewingBracket(i));
          }
        });

        setIntersectionObservers((prev) => [...prev, observer]);
      }, options);
      observer.observe(el);
    }

    return () => {
      intersectionObservers.forEach((observer) => observer.disconnect());
    };
  }, [numBrackets]);

  function goBracket(inc: number, bracketIndex: number) {
    const newBracketIndex = bracketIndex + inc;
    if (newBracketIndex < 0 || newBracketIndex > numBrackets) return;
    scrollToBracket(newBracketIndex);
  }

  return numBrackets ? (
    <div className="bg-white backdrop-blur-md px-4 py-1 text-glass-foreground flex justify-between md:justify-center items-center md:gap-2 rounded-xl shadow-md">
      <Button
        variant="ghost"
        disabled={!currentlyViewingBracket}
        onClick={() => goBracket(-1, currentlyViewingBracket)}
        className={numBrackets === 1 ? "invisible" : ""}
      >
        <FaAngleLeft />
      </Button>
      <div className=" font-bold">
        <Button
          variant="ghost"
          onClick={() => onBracketClick(currentlyViewingBracket)}
        >
          {getBracketName(currentlyViewingBracket)}
        </Button>
      </div>
      <Button
        variant="ghost"
        disabled={currentlyViewingBracket === numBrackets - 1}
        onClick={() => goBracket(+1, currentlyViewingBracket)}
        className={numBrackets === 1 ? "invisible" : ""}
      >
        <FaAngleRight />
      </Button>
    </div>
  ) : (
    <div />
  );
}
