import axios from "axios"

export const GET_ALL_AGENTS = "GET_ALL_AGENTS"

export const getAllagents = (dispatch:any) => {   
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user`)
            .then((res)=> {
                dispatch({type: GET_ALL_AGENTS, payload: res.data})
            })
            .catch((err) => window.alert(err))
}