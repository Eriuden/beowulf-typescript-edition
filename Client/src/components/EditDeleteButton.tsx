import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateKaiju } from '../redux/actions/kaiju.action'

type kaijuProps = {
    kaijuId: Number,
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

export const EditDeleteButton = (edelProps: kaijuProps) => {

  type appDispatch =() => any

  const [edit, setEdit] = useState(false)
  const [name, setname] = useState(edelProps.name)
  const [threatForHumanity, setThreatForHumanity] = useState(edelProps.name)
  const [threatForEarth, setThreatForEarth] = useState(edelProps.name)
  const [threatForOtherKaijus, setThreatForOtherKaijus] = useState(edelProps.name)
  const [powers, setPowers] = useState(edelProps.powers)
  const [size, setSize] = useState(edelProps.size)
  const [weight, setWeight] = useState(edelProps.weight)
  const [description, setDescription] = useState(edelProps.description)

  const useAppDispatch = () => useDispatch<appDispatch>()
  const dispatch = useAppDispatch()

  const handleEdit = (e:any)=> {
    e.preventDefault()

    if (edelProps) {
        updateKaiju(edelProps.kaijuId, name, threatForHumanity, threatForEarth,
        threatForOtherKaijus, powers, size, weight, description, dispatch)
        setname("")
        setThreatForHumanity("")
        setThreatForEarth("")
        setThreatForOtherKaijus("")
        setEdit(false)
    }
}
  
  return (
    <div>
      
    </div>
  )
}
