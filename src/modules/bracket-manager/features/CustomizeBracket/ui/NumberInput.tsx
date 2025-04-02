import { Input } from "@/shared/ui/input";

export default function NumberInput({
  value,
  setValue,
}: {
  value: number;
  setValue: (newValue: number) => void;
}) {
  return <Input value={value} onChange={(e) => setValue(Number(e))}></Input>;
}
