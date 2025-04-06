export enum PointsCondition {
  Win = "win",
  Draw = "draw",
  Loss = "loss",
  EndsWon = "endsWon",
  PointsScored = "pointsScored",
  PointsStolen = "pointsStolen",
}
export interface PointsConditions {
  [PointsCondition.Win]: number;
  [PointsCondition.Draw]: number;
  [PointsCondition.Loss]: number;
  [PointsCondition.EndsWon]: number;
  [PointsCondition.PointsScored]: number;
  [PointsCondition.PointsStolen]: number;
}
