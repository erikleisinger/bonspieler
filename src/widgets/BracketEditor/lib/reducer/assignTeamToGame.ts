import { BracketEditorState } from "../types/reducer-types";
import { lookToAssignTeam } from "./lookToAssignTeam";

export function assignTeamToGame(
  state: BracketEditorState,
  {
    gameId,
    teamId,
  }: {
    gameId: string;
    teamId: string;
  }
) {
  const { connections } = state;
  let newConnections = { ...connections };
  const connection = newConnections[gameId];
  const { teams } = connection || {};
  const alreadyAssignedToGame = teams.find(({ teamId: tid }) => tid === teamId);
  if (!alreadyAssignedToGame) {
    const availableSlotIndex = teams.findIndex(
      ({ teamId: tid }) => tid === "seed"
    );
    if (availableSlotIndex > -1) {
      const newTeams = [...teams];
      newTeams.splice(availableSlotIndex, 1, {
        ...newTeams[availableSlotIndex],
        teamId,
      });
      newConnections = {
        ...newConnections,
        [gameId]: {
          ...connection,
          teams: newTeams,
        },
      };
    }
  }

  return {
    ...state,
    connections: newConnections,
    lookingToAssignTeam: null,
    availableGames: [],
  };
}
