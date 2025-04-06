import { cn } from "@/lib/utils";
import { FormatCard } from "@/modules/tournament-stage-manager/shared";
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
    <FormatCard
      onClick={() => setValue(getNumber())}
      title={type}
      description={getDescription()}
      subtitle="Elimination"
      selected={selected}
    />
  );
}
