import { cn } from "@/lib/utils";

export default function BracketFormatCard({
  selected,
  setValue,
  type,
}: {
  selected: boolean;
  setValue: (value: number) => void;
  type: "Single" | "Double" | "Triple" | "Quadruple";
}) {
  function getDescription() {
    return {
      Single: (
        <div>
          Teams are eliminated after
          <strong> one</strong> loss. Sudden death!
        </div>
      ),
      Double: (
        <div>
          Teams are eliminated after
          <strong> two</strong> losses.
        </div>
      ),
      Triple: (
        <div>
          Teams are eliminated after
          <strong> three</strong> losses.
        </div>
      ),
      Quadruple: (
        <div>
          Teams are eliminated after
          <strong> four</strong> losses.
        </div>
      ),
    }[type];
  }

  function getNumber() {
    return {
      Single: 1,
      Double: 2,
      Triple: 3,
      Quadruple: 4,
    }[type];
  }
  return (
    <div
      onClick={() => setValue(getNumber())}
      className={cn(
        "shadow-md rounded-lg p-4 border-l-4 transition-all group cursor-pointer",
        selected
          ? "border-l-indigo-300 bg-indigo-500 text-white"
          : "border-l-indigo-500 hover:border-l-indigo-300   hover:bg-indigo-500 hover:text-white "
      )}
    >
      <h4 className="text-[1.2rem] font-bold leading-[1]">{type}</h4>
      <h5
        className={cn(
          "text-sm transition-all ",
          selected ? "text-white/80" : "text-muted group-hover:text-white/80"
        )}
      >
        Elimination
      </h5>
      <div
        className={cn(
          "italic text-sm transition-all mt-2 ",
          selected ? "text-white" : "text-black/50 group-hover:text-white"
        )}
      >
        {getDescription()}
      </div>
    </div>
  );
}
