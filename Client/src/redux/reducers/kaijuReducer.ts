import { DELETE_KAIJU, GET_KAIJU, UPDATE_KAIJU } from "../actions/kaiju.action";

const initialState:any = {};

export default function kaijuReducer(state = initialState, action:any) {
  switch (action.type) {

    case GET_KAIJU:
      return action.payload;

    case UPDATE_KAIJU:
      return state.map((kaiju:any) => {
        if (kaiju.id === action.payload.kaijuId) {
          return {
            ...kaiju,
            name: action.payload.name,
            threatForHumanity: action.payload.threatForHumanity,
            threatForEarth: action.payload.threatForEarth,
            threatForOtherKaijus: action.payload.threatForOtherKaijus,
            powers: action.payload.powers,
            size: action.payload.size,
            weight: action.payload.weight,
            description: action.payload.description
          };
        } else return kaiju;
      });

    case DELETE_KAIJU:
      return state.filter((kaiju:any) => kaiju._id !== action.payload.kaijuId);

    default:
      return state;
  }
}