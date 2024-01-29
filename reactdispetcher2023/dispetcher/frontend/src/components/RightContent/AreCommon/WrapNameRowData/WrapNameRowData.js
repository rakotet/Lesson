import triangle from './image/triangle.png'
import { useState } from 'react'

export default function WrapNameRowData({name, setSwitchArrow = () => {}, arrow={arrow: ''}}) {
  const [rotation, setRotation] = useState(true);

  function handleClick() {
    setRotation(!rotation)
    if(rotation) {
      setSwitchArrow(arrow)
    } else {
      setSwitchArrow({arrow: `${arrow.arrow + '-default'}`})
    }
  }

  return(
    <div className="wrapNameRowData" onClick={handleClick}>
      <span>{name}</span>
      <img src={triangle} alt="" style={rotation ? {transform: "none"} : {transform: "rotate(180deg)"}}/>
    </div>
  )
}