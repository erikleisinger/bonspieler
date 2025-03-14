import { useEffect, useState, useContext } from "react";
import { Button } from "@/shared/ui/button";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { BRACKET_CONTAINER_ELEMENT_ID_PREFIX } from "../lib/constants/element-id";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { getBracketName } from "../lib";
export default function BracketNavigator({
  numBrackets,
  goBracket,
}: {
  numBrackets: number;
  goBracket?: (inc: number, bracketIndex: number) => void;
}) {
  const [intersectionObservers, setIntersectionObservers] = useState<
    IntersectionObserver[]
  >([]);

  const { currentlyViewingBracket, setCurrentlyViewingBracket } =
    useContext(BracketContext);
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
            setCurrentlyViewingBracket(i);
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
        {getBracketName(currentlyViewingBracket)}
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
