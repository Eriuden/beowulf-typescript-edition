import { combineReducers } from "redux";
import { agentReducer } from "./agentReducer";
import { agentsReducer } from "./agentsReducer";
import { kaijuReducer } from "./kaijuReducer";
import { kaijusReducer } from "./kaijusReducer";
import { errorReducer } from "./error.reducer";

export const reducers = combineReducers({
    agentReducer,
    agentsReducer,
    errorReducer,
    kaijuReducer,
    kaijusReducer
})