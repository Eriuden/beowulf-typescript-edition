import React from 'react'
import { EditDeleteButton } from './EditDeleteButton'

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
    onClick: any
}

export const KaijuCard = (kaijuProps: kaijuProps) => {
  return (
    <div>
      <h2>{kaijuProps.name}</h2>
      <img src={kaijuProps.picture} alt="" />
      <EditDeleteButton edelProps={kaijuProps} />
    </div>
  )
}

