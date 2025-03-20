import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveBracketEvent as save } from "../api";
import { getBracketEvent } from "../bracketEventSlice";
import { getBracketEventBrackets } from "@/entities/Bracket/BracketGame";
export const saveBracketEvent = createAsyncThunk(
  "tournament/saveBracketEvent",
  async (_, { getState }) => {
    const state = getState();
    const event = { ...getBracketEvent(state) };
    const { id, name } = event;
    const brackets = Object.values({ ...getBracketEventBrackets(state) });

    const numStartTeams = brackets.reduce((all, rounds) => {
      return all + (rounds[0]?.length || 0) * 2;
    }, 0);
    console.log("start teams: ", numStartTeams);
    const numEndTeams = brackets.reduce((all, rounds) => {
      return all + rounds[rounds.length - 1]?.length || 0;
    }, 0);
    console.log("end teams: ", numEndTeams);
    await save({
      id,
      name,
      num_start_teams: numStartTeams,
      num_end_teams: numEndTeams,
    });
  }
);
