export default function Slideout({
  className = "",
  children,
  id,
  visible,
}: {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  visible: boolean;
}) {
  return (
    <div
      id={id}
      style={{
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(8.5px)",
        WebkitBackdropFilter: "blur(8.5px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
      className={
        "fixed right-0 md:h-screen top-0  z-50 transition-transform bg-glass w-screen md:w-[min(500px,45vw)] " +
        (visible ? "translate-x-[0]" : " translate-x-[100%]") +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}
