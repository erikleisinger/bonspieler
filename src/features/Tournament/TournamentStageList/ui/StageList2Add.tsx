import { useState, useRef, useEffect } from "react";
import { TournamentStageType } from "@/entities/Tournament";
import StageListAddButton from "./StageListAddButton";
import { FaCirclePlus } from "react-icons/fa6";
export default function StageList2Add({
  onAddStage,
  alwaysShow = false,
  showText = false,
}: {
  onAddStage: (type: TournamentStageType) => void;
  alwaysShow?: boolean;
  showText?: boolean;
}) {
  const [hidden, setHidden] = useState(false);

  const [adding, setAdding] = useState(false);

  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutsideClick(e) {
      if (el.current && !el.current?.contains(e.target)) setAdding(false);
    }
    if (adding) document.addEventListener("click", onOutsideClick);

    return () => {
      document.removeEventListener("click", onOutsideClick);
    };
  }, [el, adding]);

  function handleAddStage(type: TournamentStageType) {
    setHidden(true);
    setTimeout(() => {
      onAddStage(type);
      setAdding(false);
      setTimeout(() => {
        setHidden(false);
      }, 100);
    }, 1);
  }

  function styleDefs() {
    if (adding) {
      return {
        width: "100px",
      };
    }
    if (alwaysShow)
      return {
        width: "auto",
      };
    return {
      width: "0px",
    };
  }
  return (
    !hidden && (
      <div
        className=" skew-x-[-20deg] transition-all bg-indigo-100 cursor-pointer relative z-[5] group "
        style={styleDefs()}
        ref={el}
      >
        <div className="absolute top-0 bottom-0 w-[30px] translate-x-[-50%]">
          {!adding && (
            <FaCirclePlus
              className="skew-x-[20deg] absolute top-0 bottom-0 m-auto left-0 right-0 text-black/50 hover:text-indigo-500 text-[2.5rem] transition-all"
              onClick={() => setAdding(true)}
            />
          )}
        </div>
        <div className="grid grid-row-3 h-full">
          <StageListAddButton
            type={TournamentStageType.Bracket}
            onAdd={() => handleAddStage(TournamentStageType.Bracket)}
            showText={showText}
          />
          <StageListAddButton
            type={TournamentStageType.Points}
            onAdd={() => handleAddStage(TournamentStageType.Points)}
            showText={showText}
          />
          <StageListAddButton
            type={TournamentStageType.Pool}
            onAdd={() => handleAddStage(TournamentStageType.Pool)}
            showText={showText}
          />
        </div>
      </div>
    )
  );
}
