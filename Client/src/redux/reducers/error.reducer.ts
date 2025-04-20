import { GET_KAIJU_ERRORS } from "../actions/kaiju.action";

const initialState = { kaijuError : []}

export const errorReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_KAIJU_ERRORS:
            return {
                kaijuError: action.payload
            }
           
        default:
            return state
    }
}