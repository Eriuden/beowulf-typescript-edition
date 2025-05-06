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
import { KaijuCard } from '../components/KaijuCard'

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

    const [showKaiju, setShowKaiju] = useState(false);

    const useAppDispatch = () => useDispatch<appDispatch>()
    const dispatch = useAppDispatch()
    setTimeout(() => {
      const preloader = document.querySelector(".preloader") as HTMLElement
      preloader.style.display = "none";
    }, 10000);
  
    const kaijus = useSelector((state:any) => state.kaijusReducer);
    const uid = useContext(UidContext);
  
    useEffect(()=> {
      getKaijus(kaiju.kaijuId,dispatch)
    })
  return (
    <div>
        {uid ? (
          <>
            <div className="preloader">
              <h1>
                Dossiers top secret, ces informations peuvent mettre votre vie
                en danger
              </h1>
              <span className="loader"></span>
            </div>
            <AddKaijuForm />
         
            {showKaiju && <ShowKaiju kaiju={kaiju} />}

            <ul>
              {!isEmpty(kaijus) &&
                kaijus.map((kaiju:kaijuProps) => {
                  return (
                    <KaijuCard
                      onClick={() => setShowKaiju(!showKaiju)}
                      {...kaiju}
                      key={kaiju.kaijuId}
                    />
                  );
                })}
            </ul>
          </>
        ) : (
          <ConnexionModal />
        )}
    </div>
  )
}
