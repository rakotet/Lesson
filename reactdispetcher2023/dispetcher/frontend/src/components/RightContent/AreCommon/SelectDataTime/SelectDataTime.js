import { useState } from "react"
import imgDown from './image/Icon.png'

export default function SelectDataTime({namePlaceholder, nameArr = [], name = '', margin = true, dataInputOnChange, defaultValue = ''}) {
  const [rotation, setRotation] = useState(true);
  const [valueInput, setValueInput] = useState(defaultValue);

  function handleClick() {
    setRotation(!rotation)
  }

  function dataInput(data) {
    setValueInput(n => data)
    setRotation(!rotation)
  }


  return(
    <div className={margin ? 'selectData-wrapper' : 'selectData-wrapper selectData-wrapper-margin'} >
      <img className={"selectDataTime-img"} src={imgDown} alt="" onClick={handleClick}/>
      <div className={`selectData-input ${margin ? '' : 'selectData-input-margin'} ${rotation ? 'selectData-hide' : ''}`} >

        {nameArr.map((item, index) => {
          return <div key={index} className="selectData-row" onClick={()=> {
            dataInput(item)
            dataInputOnChange(event, [name, item])
          }}>{item}</div>
        })}
        
      </div>
      <input className={margin ? '' : 'selectData-wrapper-margin'} name={name} type="text" placeholder={namePlaceholder} readOnly={true} value={valueInput} />
    </div>
  )
}