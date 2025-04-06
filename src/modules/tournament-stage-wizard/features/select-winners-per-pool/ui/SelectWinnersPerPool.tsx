import NumberInput from "@/shared/ui/number-input";

export default function SelectWinnersPerPool({
  numPools,
  winnersPerPool,
  setWinnersPerPool,
}: {
  numPools: number;
  winnersPerPool: number[];
  setWinnersPerPool: (newValue: number[]) => void;
}) {
  return (
    <div>
      <NumberInput hideButtons={true} min={3} max={10} />
    </div>
  );
}
