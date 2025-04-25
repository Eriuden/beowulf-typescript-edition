import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getKaijus } from "../redux/actions/kaiju.action";

export const ShowKaiju = ({kaiju}) => {
  type appDispatch = () => any
  const useAppDispatch = () => useDispatch<appDispatch>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    getKaijus(kaiju._id, dispatch);
  });

  return (
    <div className="kaiju-window">
      <ul className="kaiju-window-ul">
        <li className="kaiju-window-li" id="kaiju-name">
          {kaiju.name}
        </li>
        <li className="kaiju-window-li" id="kaiju-threatForHumanity">
          {kaiju.threatForHumanity}
        </li>
        <li className="kaiju-window-li" id="kaiju-threatForEarth">
          {kaiju.threatForEarth}
        </li>
        <li className="kaiju-window-li" id="kaiju-threatForOtherKaijus">
          {kaiju.threatForOtherKaijus}
        </li>
        <li className="kaiju-window-li" id="kaiju-powers">
          {kaiju.powers}
        </li>
        <li className="kaiju-window-li" id="kaiju-size">
          {kaiju.size}
        </li>
        <li className="kaiju-window-li" id="kaiju-weight">
          {kaiju.weight}
        </li>
        <li className="kaiju-window-li" id="kaiju-description">
          {kaiju.description}
        </li>
      </ul>
    </div>
  );
}