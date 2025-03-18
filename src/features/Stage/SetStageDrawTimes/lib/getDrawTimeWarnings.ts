import type { DrawTimeWarningsProps } from "./types/DrawTimeWarningsProps";
import { getScheduleWarnings } from "./getScheduleWarnings";
import { getUnixTime } from "date-fns";
const SECONDS_IN_HOUR = 3600;
const MIN_GAP_BETWEEN_GAMES = SECONDS_IN_HOUR * 2 - 1;
export function getDrawTimeWarnings({
  drawTimes,
  numDraws,
  numSheets,
  schedule,
}: DrawTimeWarningsProps) {
  const vals = Object.values(drawTimes);
  const scheduleWarnings = getScheduleWarnings({
    schedule,
    numSheets,
  });
  return Array.from({ length: numDraws }).reduce((all, current, index) => {
    const drawNum = index + 1;
    const errors = [];
    if (scheduleWarnings[Number(drawNum)])
      errors.push(scheduleWarnings[Number(drawNum)]);

    const date = drawTimes[drawNum];

    const prevDrawNum = index - 1;
    if (date && vals[prevDrawNum]) {
      if (getUnixTime(date) <= getUnixTime(vals[prevDrawNum])) {
        errors.push(
          `Draw ${drawNum} is scheduled earlier than draw ${prevDrawNum + 1}.`
        );
      } else if (
        getUnixTime(date) - getUnixTime(vals[prevDrawNum]) <
        MIN_GAP_BETWEEN_GAMES
      ) {
        errors.push(
          "Draw is scheduled less than two hours after previous draw."
        );
      }
    }

    const nextDrawNum = index + 1;
    if (date && vals[nextDrawNum]) {
      if (getUnixTime(date) >= getUnixTime(vals[nextDrawNum])) {
        errors.push(
          `Draw ${drawNum} is scheduled later than draw ${nextDrawNum + 1}.`
        );
      } else if (
        getUnixTime(vals[nextDrawNum]) - getUnixTime(date) <
        MIN_GAP_BETWEEN_GAMES
      ) {
        errors.push("Draw scheduled less than two hours before next draw.");
      }
    }

    if (!date) errors.push("No draw time has been set.");

    if (errors.length) return { ...all, [drawNum]: errors };
    return all;
  }, {});
}
