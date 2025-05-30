import { GET_ALL_AGENTS } from "../actions/agents.actions";

const initialState = {};

export const agentsReducer = (state = initialState, action: any) => {   
  switch (action.type) {

    case GET_ALL_AGENTS:
      return action.payload;
    default:
      return state;
  }
}