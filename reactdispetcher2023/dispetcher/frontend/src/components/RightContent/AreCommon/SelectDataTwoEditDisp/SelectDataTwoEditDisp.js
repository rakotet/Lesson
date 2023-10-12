import { useState } from "react"
import imgDown from './image/Chevron_Down.png'
import { useSelector } from 'react-redux';
import { selectSubdivision } from "../../../store/reduser";

export default function SelectDataTwoEditDisp({namePlaceholder, name = '', margin = true, dataInputOnChange, valueInput, setValueInput}) {
  const [rotation, setRotation] = useState(true);
  let selectSub = useSelector(selectSubdivision)

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

        {selectSub.map((item, index) => {
          return <div key={index} className="selectData-row" onClick={()=> {
            dataInput(item)
            dataInputOnChange([name, item])
          }}>{item}</div>
        })}
        
      </div>
      <input className={margin ? '' : 'selectData-wrapper-margin'} name={name} type="text" placeholder={namePlaceholder} readOnly={true} defaultValue={valueInput} />
    </div>
  )
}