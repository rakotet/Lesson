import triangle from './image/triangle.png'
import { useState } from 'react'

export default function WrapNameRowData({name}) {
  const [rotation, setRotation] = useState(true);

  function handleClick() {
    setRotation(!rotation)
  }

  return(
    <div className="wrapNameRowData" onClick={handleClick}>
      <span>{name}</span>
      <img src={triangle} alt="" style={rotation ? {transform: "none"} : {transform: "rotate(180deg)"}}/>
    </div>
  )
}