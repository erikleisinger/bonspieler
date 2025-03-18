import "./bracket-view-layout.scss";
export default function BracketViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr] absolute inset-0 bracket-view__layout">
      {children}
    </div>
  );
}
