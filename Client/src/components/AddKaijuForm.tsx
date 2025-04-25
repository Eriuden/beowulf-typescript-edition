import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addKaiju } from "../redux/actions/kaiju.action";

export const AddKaijuForm = () => {

  type appDispatch = () => any

  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [threatForHumanity, setThreatForHumanity] = useState("");
  const [threatForEarth, setThreatForEarth] = useState("");
  const [threatForOtherKaijus, setThreatForOtherKaijus] = useState("");
  const [powers, setPowers] = useState("")
  const [size, setSize] = useState("")
  const [weight, setWeight] = useState("")
  const [description, setDescription] = useState("");
  

  const useAppDispatch = () => useDispatch<appDispatch>()
  const dispatch = useAppDispatch()

  const handleKaiju = () => {
    const data = new FormData();
    data.append("name", name);
    data.append("picture", picture);
    data.append("threatForHumanity", threatForHumanity);
    data.append("threatForEarth", threatForEarth);
    data.append("threatForOtherKaijus", threatForOtherKaijus);
    data.append("powers", powers);
    data.append("size", size);
    data.append("weight", weight);
    data.append("description", description);

    addKaiju(data, dispatch);
  };
  return (
    <div>
      <div className="post-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nom(scientifique ou commun)"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => setPicture(e.target.value)}
          value={picture}
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

        <button onClick={handleKaiju}></button>
      </div>
    </div>
  );
}