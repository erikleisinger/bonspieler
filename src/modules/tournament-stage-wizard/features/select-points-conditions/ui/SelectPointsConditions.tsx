import ConfigurePointsCondition from "./ConfigurePointsCondition";
import { PointsConditions } from "@/modules/tournament-stage-wizard/shared/types";
import { PointsCondition } from "@/modules/tournament-stage-wizard/shared/types/PointsConditions";
import { useMemo } from "react";

export default function SelectPointsConditions({
  conditions,
  setConditions,
}: {
  conditions: PointsConditions;
  setConditions: (conditions: PointsConditions) => void;
}) {
  const pointsConditions = useMemo(() => {
    const titles = {
      [PointsCondition.Win]: "Win",
      [PointsCondition.Draw]: "Draw",
      [PointsCondition.Loss]: "Loss",
      [PointsCondition.EndsWon]: "Ends won",
      [PointsCondition.PointsScored]: "Points scored",
      [PointsCondition.PointsStolen]: "Points stolen",
    };

    const descriptions = {
      [PointsCondition.Win]: "Points awarded for winning a match",
      [PointsCondition.Draw]: "Points awarded for tying a match",
      [PointsCondition.Loss]: "Points awarded for losing a match",
      [PointsCondition.EndsWon]: "Points awarded for each end won",
      [PointsCondition.PointsScored]: "Points awarded for each point scored",
      [PointsCondition.PointsStolen]: "Points awarded for each stolen point",
    };

    return Object.entries(conditions).map(([key, value]) => ({
      key,
      title: titles[key as PointsCondition],
      description: descriptions[key as PointsCondition],
      value,
    }));
  }, [conditions]);

  function updateCondition(value: number[], key: PointsCondition) {
    const newConditions = { ...conditions };
    newConditions[key] = value[0];
    setConditions(newConditions);
  }
  return (
    <div className="flex flex-col gap-4">
      {pointsConditions.map((condition) => (
        <ConfigurePointsCondition
          key={condition.title}
          value={[condition.value]}
          title={condition.title}
          description={condition.description}
          setValue={(v) => updateCondition(v, condition.key as PointsCondition)}
        />
      ))}
    </div>
  );
}
