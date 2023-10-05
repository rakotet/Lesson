import { useState } from "react"
import imgDown from './image/Chevron_Down.png'

export default function SelectData({namePlaceholder, nameArr = []}) {
  nameArr = [namePlaceholder, ...nameArr]
  const [rotation, setRotation] = useState(true);
  const [valueInput, setValueInput] = useState('');

  function handleClick() {
    setRotation(!rotation)
  }

  function dataInput(data) {
    setValueInput(data)
    setRotation(!rotation)
  }

  return(
    <div className="selectData-wrapper">
      <img src={imgDown} alt="" style={rotation ? {transform: "none"} : {transform: "rotate(180deg)"}} onClick={handleClick}/>
      <div className={`selectData-input ${rotation ? 'selectData-hide' : ''}`}>

        {nameArr.map((item, index) => {
          return <div key={index} className="selectData-row" onClick={()=> dataInput(item)}>{item}</div>
        })}
        
      </div>
      <input type="text" placeholder={namePlaceholder} defaultValue={valueInput} disabled />
    </div>
  )
}