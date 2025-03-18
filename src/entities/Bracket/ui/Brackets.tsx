export default function Brackets({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative overflow-auto">
      <div className="flex flex-col gap-16 absolute inset-0">{children}</div>
    </div>
  );
}
