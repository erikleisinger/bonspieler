/**
 *
 * @param eventId id of the event
 *
 * This function serves as a placeholder for future API calls.
 * If teams have been determined via registrations handled by our API,
 * this function will fetch those teams.
 *
 * for now, return mock data
 */

export async function getEventTeams(eventId: string) {
  return [
    {
      id: "1",
      name: "Team Campbell",
    },
    {
      id: "2",
      name: "Team Georgina",
    },
    {
      id: "3",
      name: "Team Howie",
    },
  ];
}
