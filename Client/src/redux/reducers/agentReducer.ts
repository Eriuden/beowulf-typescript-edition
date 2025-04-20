import { GET_AGENT, UPDATE_AGENT, DELETE_AGENT } from "../actions/agent.action"

const initialState:any = {}
export const agentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    
    case GET_AGENT:
            return action.payload
        
    case UPDATE_AGENT:
        return {
            ...state,
            name: action.payload.name,
            email: action.payload.email,
        }
            
    case DELETE_AGENT:
        return state.filter((agent:any) => agent._id !== action.payload.agentId)
        
    default: 
    return state
  }
}