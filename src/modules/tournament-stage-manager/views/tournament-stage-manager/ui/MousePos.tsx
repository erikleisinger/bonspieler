import { useEffect, useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
export default function MousePos({ originId }: { originId: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const updateXarrow = useXarrow();
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      updateXarrow();
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  const el = useRef(null);

  return (
    <Xwrapper>
      <div
        ref={el}
        className="fixed "
        style={{
          left: mousePos.x + "px",
          top: mousePos.y + "px",
        }}
      />
      <Xarrow
        start={originId}
        end={el}
        dashness={true}
        headSize={1}
        strokeWidth={2}
        showXarrow={mousePos.x > 0 && mousePos.y > 0}
      ></Xarrow>
    </Xwrapper>
  );
}
