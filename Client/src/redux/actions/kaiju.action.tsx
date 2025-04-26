import axios from "axios";

export const GET_ALLKAIJUS = "GET_ALLKAIJUS";
export const GET_KAIJU = "GET_KAIJU";
export const GET_KAIJU_ERRORS = "GET_KAIJU_ERRORS";
export const UPDATE_KAIJU = "UPDATE_KAIJU";
export const DELETE_KAIJU = "DELETE_KAIJU";

type kaijuProps = {
    kaijuId: string,
    picture: string,
    name: string,
    threatForHumanity: string,
    threatForEarth: string,
    threatForOtherKaiju: string,
    powers: string,
    size: string,
    weight: string,
    description: string
}

export const getKaijus = (id:number, dispatch: any) => { 
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/kaiju`)
      .then((res) => {
        const array = id
        dispatch({ type: GET_KAIJU, payload: array})
        dispatch({ type: GET_ALLKAIJUS, payload: res.data });
      })
      .catch((err) => console.log(err));
};



export const addKaiju = (data:any, dispatch: any) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/kaiju/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_KAIJU_ERRORS, payload: res.data.errors });
        }else {
          dispatch({ type: GET_KAIJU_ERRORS, payload: ""})
      }
      }); 
};

export const updateKaiju = (

    kaijuId:Number,
    name: string,
    threatForHumanity:string,
    threatForEarth:string,
    threatForOtherKaiju:string,
    powers:string, 
    size:string, 
    weight:string, 
    description:string
   , dispatch: any
) => { 
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/kaiju/${kaijuId}`,
      data: { name, threatForHumanity, threatForEarth, threatForOtherKaiju, powers, size, weight, description },
    })
      .then(() => {
        dispatch({
          type: UPDATE_KAIJU,
          payload: { name, threatForHumanity, threatForEarth, threatForOtherKaiju, powers, size, weight, description, kaijuId },
        });
      })
      .catch((err) => console.log(err));
};

export const deleteKaiju = (
    {
        kaijuId,
        picture,
        name,
        threatForHumanity,
        threatForEarth,
        threatForOtherKaiju,
        powers, 
        size, 
        weight, 
        description
      } : kaijuProps, dispatch: any
) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/kaiju/${kaijuId}`,
      data: { picture,
        name,
        threatForHumanity,
        threatForEarth,
        threatForOtherKaiju,
        powers, 
        size, 
        weight, 
        description },
    })
      .then(() => {
        dispatch({ type: DELETE_KAIJU, payload: { kaijuId } });
      })
      .catch((err) => console.log(err));
};