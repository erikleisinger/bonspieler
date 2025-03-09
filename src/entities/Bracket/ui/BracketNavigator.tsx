import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { BRACKET_CONTAINER_ELEMENT_ID_PREFIX } from "../lib/constants/element-id";
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

  const [currentBracket, setCurrentBracket] = useState(0);
  useEffect(() => {
    for (let i = 0; i < numBrackets; i++) {
      const el = document.getElementById(
        BRACKET_CONTAINER_ELEMENT_ID_PREFIX + i
      );
      if (!el) continue;
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentBracket(i);
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

  return (
    <div className="bg-white backdrop-blur-md px-4 py-1 text-glass-foreground flex justify-between md:justify-center items-center md:gap-2 rounded-xl shadow-md">
      <Button
        variant="primary"
        disabled={!currentBracket}
        onClick={() => goBracket(-1, currentBracket)}
      >
        <FaAngleLeft />
      </Button>
      <div className=" font-bold">Bracket {currentBracket + 1}</div>
      <Button
        variant="primary"
        disabled={currentBracket === numBrackets - 1}
        onClick={() => goBracket(+1, currentBracket)}
      >
        <FaAngleRight />
      </Button>
    </div>
  );
}
