import { getUnixTime } from "date-fns";
const SECONDS_IN_HOUR = 3600;
const MIN_GAP_BETWEEN_GAMES = SECONDS_IN_HOUR * 2 - 1;
export function getDrawTimeWarnings(drawTimes: { [key: number]: Date }) {
  const vals = Object.values(drawTimes);
  return Object.entries(drawTimes).reduce((all, [drawNum, date], index) => {
    const errors = [];
    if (vals[index - 1]) {
      if (getUnixTime(date) <= getUnixTime(vals[index - 1])) {
        errors.push("Draw time conflicts with previous draw.");
      } else if (
        getUnixTime(date) - getUnixTime(vals[index - 1]) <
        MIN_GAP_BETWEEN_GAMES
      ) {
        errors.push(
          "Draw is scheduled less than two hours after previous draw."
        );
      }
    }

    if (vals[index + 1]) {
      if (getUnixTime(date) >= getUnixTime(vals[index + 1])) {
        errors.push("Draw time conflicts with next draw.");
      } else if (
        getUnixTime(vals[index + 1]) - getUnixTime(date) <
        MIN_GAP_BETWEEN_GAMES
      ) {
        errors.push("Draw scheduled less than two hours before next draw.");
      }
    }

    if (errors.length) return { ...all, [drawNum]: errors };
    return all;
  }, {});
}
