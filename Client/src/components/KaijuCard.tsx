import React from 'react'

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

export const KaijuCard = (kaijuProps: kaijuProps) => {
  return (
    <div>
      <h2>{kaijuProps.name}</h2>
      <img src={kaijuProps.picture} alt="" />
      <DeleteButton kaijuID={kaijuProps.kaijuId} />
      <UpdateKaijuForm
        kaiju={kaijuProps}/>
    </div>
  )
}

