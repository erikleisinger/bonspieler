import NumberInput from "@/shared/ui/number-input";
export default function NumberSheetsSelect({
  children,
  numSheets,
  setNumSheets,
}: {
  children: React.ReactNode;
  numSheets: number;
  setNumSheets: (num: number) => void;
}) {
  return (
    <NumberInput number={numSheets} setNumber={setNumSheets} min={1}>
      {children}
    </NumberInput>
  );
}
