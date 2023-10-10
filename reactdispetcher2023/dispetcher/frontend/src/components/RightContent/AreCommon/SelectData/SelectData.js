import { useState, useEffect } from "react"
import imgDown from './image/Chevron_Down.png'

export default function SelectData({namePlaceholder, nameArr = [], name = '', margin = true, dataInputOnChange}) {
  // nameArr = [namePlaceholder, ...nameArr]
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
    <div className={margin ? 'selectData-wrapper' : 'selectData-wrapper selectData-wrapper-margin'} >
      <img src={imgDown} alt="" style={rotation ? {transform: "none"} : {transform: "rotate(180deg)"}} onClick={handleClick}/>
      <div className={`selectData-input ${margin ? '' : 'selectData-input-margin'} ${rotation ? 'selectData-hide' : ''}`} >

        {nameArr.map((item, index) => {
          return <div key={index} className="selectData-row" onClick={()=> {
            dataInput(item)
            dataInputOnChange(event, [name, item])
          }}>{item}</div>
        })}
        
      </div>
      <input className={margin ? '' : 'selectData-wrapper-margin'} name={name} type="text" placeholder={namePlaceholder} disabled defaultValue={valueInput} />
    </div>
  )
}