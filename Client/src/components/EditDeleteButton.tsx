import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteKaiju, updateKaiju } from '../redux/actions/kaiju.action'

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
  const [name, setName] = useState(edelProps.name)
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
        setName("")
        setThreatForHumanity("")
        setThreatForEarth("")
        setThreatForOtherKaijus("")
        setPowers("")
        setSize("")
        setWeight("")
        setDescription("")
        setEdit(false)
    }
  }

  const handleDelete = () => {
    deleteKaiju(edelProps.kaijuId, dispatch)
  }

  
  return (
    <div>

      { edit === false && (
          <span onClick={()=> setEdit(!edit)}>
            Editer
          </span>
      )}
      { edit && (
        <form action='' onSubmit={handleEdit}>
          <label htmlFor='text' onClick={()=> setEdit(!edit)}>
              Annuler les modifications
          </label>
          <br/>
          <input
          type="text"
          name="name"
          id="name"
          placeholder="Nom(scientifique ou commun)"
          onChange={(e) => setName(e.target.value)}
          value={name}
          />

          <textarea
          name="description"
          id="description"
          placeholder="Portrait de la cible"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          />

          <input
          type="text"
          name="threatForHumanity"
          id="threatForHumanity"
          placeholder="Menaçe pour l'humanite"
          onChange={(e) => setThreatForHumanity(e.target.value)}
          value={threatForHumanity}
          />

          <input
          type="text"
          name="threatForEarth"
          id="threatForEarth"
          placeholder="Menace pour l'écosystème"
          onChange={(e) => setThreatForEarth(e.target.value)}
          value={threatForEarth}
          />

          <input
          type="text"
          name="threatForOtherKaijus"
          id="threatForOtherKaijus"
          placeholder="Menace pour les autres kaijus"
          onChange={(e) => setThreatForOtherKaijus(e.target.value)}
          value={threatForOtherKaijus}
          />

          <input
          type="text"
          name="powers"
          id="powers"
          placeholder="Facultés du kaiju"
          onChange={(e) => setPowers(e.target.value)}
          value={powers}
          />

          <input
          type="text"
          name="size"
          id="size"
          placeholder="Taille du kaiju"
          onChange={(e) => setSize(e.target.value)}
          value={size}
          />

          <input
          type="text"
          name="weight"
          id="weight"
          placeholder="Poids du kaiju"
          onChange={(e) => setWeight(e.target.value)}
           value={weight}
          />

          <input type="submit" value="Valider les modifications"/>
          <br/>
        </form>
      )}
       <span onClick={()=> {
          if (window.confirm("Voulez vous supprimer ce dossier ?")) {
                handleDelete()
              }
            }}
        >
          Supprimer
        </span>
    </div>
  )
}
