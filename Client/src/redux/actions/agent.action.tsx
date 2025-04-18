import axios from "axios";

export const GET_AGENT = "GET_AGENT"
export const UPDATE_AGENT = "UPDATE_AGENT"
export const DELETE_AGENT = "DELETE_AGENT"

type agentProps = {
    agentId: string,
    name: string,
    email: string,
    adress: string,
    password: string
}

export const getagent = (uid: string, dispatch:any) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/agent/${uid}`)
            .then((res) => {
                dispatch({type: GET_AGENT, payload: res.data})
            })
            .catch((err) => window.alert(err))
}

export const updateagent = ({agentId, name} : agentProps, dispatch: any) => { 
        return axios({
            method:"put",
            url:`${process.env.REACT_APP_API_URL}api/agent` + agentId,
            data: {name}
        })
        .then(()=> {
            dispatch({type: UPDATE_AGENT, payload: name})
        })
}


export const deleteagent = ({agentId, name, email, password} : agentProps, dispatch:any) => {
        return axios({
            method:"delete",
            url: `${process.env.REACT_APP_API_URL}api/agent/${agentId}`,
            data: {name, email, password}
        })
        .then(()=> {
            dispatch({type: DELETE_AGENT, payload: {agentId}})
        })
}