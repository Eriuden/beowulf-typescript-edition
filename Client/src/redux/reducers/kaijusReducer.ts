import { GET_ALLKAIJUS } from "../actions/kaiju.action";

const initialState = {};
export default function allPostReducer(state = initialState, action: any) {
  switch (action.type) {
    
    case GET_ALLKAIJUS:
      return action.payload;
    default:
      return state;
  }
}