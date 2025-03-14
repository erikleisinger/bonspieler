import type { BracketSchedule } from "@/entities/Bracket";
export function getScheduleWarnings({
  numSheets,
  schedule,
}: {
  numSheets: number;
  schedule: BracketSchedule;
}): {
  [drawNumber: number]: string | undefined;
} {
  const numGamesPerDraw = Object.values(schedule).reduce(
    (all: { [drawNum: number]: number }, drawNumber: number) => {
      const allClone = { ...all };
      if (!allClone[drawNumber]) {
        allClone[drawNumber] = 0;
      }
      return {
        ...allClone,
        [drawNumber]: allClone[drawNumber] + 1,
      };
    },
    {}
  );

  return Object.entries(numGamesPerDraw).reduce(
    (all, [drawNumber, numDraws]) => {
      if (numDraws > numSheets)
        return {
          ...all,
          [drawNumber]: `More games are scheduled than available sheets.`,
        };
      return all;
    },
    {}
  );
}
