import React from 'react'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { UidContext } from '../components/AppContext'
import { useContext } from 'react'
import { isEmpty } from '../components/Utils'
import { ConnexionModal } from '../components/Connexion'
import { AddKaijuForm } from '../components/AddKaijuForm'
import { ShowKaiju } from '../components/ShowKaiju'
import { getKaijus } from '../redux/actions/kaiju.action'

type kaijuProps = {
    kaijuId: number,
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


export const Home = (kaiju: kaijuProps) => {

    type appDispatch =() => any

    const [showKaiju, setShowKaiju] = useState("false");

    const useAppDispatch = () => useDispatch<appDispatch>()
    const dispatch = useAppDispatch()
    setTimeout(() => {
      document.querySelector(".preloader").style.display = "none";
    }, 10000);
  
    const kaijus = useSelector((state:any) => state.kaijusReducer);
    const uid = useContext(UidContext);
  
    useEffect(()=> {
      getKaijus(kaiju.kaijuId,dispatch)
    })
  return (
    <div>Home</div>
  )
}
