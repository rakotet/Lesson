import { useState, useEffect } from "react"
import imgUp from './image/up.png'
import imgDown from './image/down.png'

export default function SelectDataArrow({namePlaceholder, name = '', margin = true, dataInputOnChange}) {
  const [valueInput, setValueInput] = useState(0);

  function handleClickUp() {
    setValueInput(n => {
      if((n + 1) > 5) {
        return 0
      } else {
        return n + 1
      }
    })
  }
  
  function handleClickDown() {
    setValueInput(n => {
      if((n - 1) < 1) {
        return 0
      } else {
        return n - 1
      }
    })
  }

  useEffect(() => {
    dataInputOnChange(String(valueInput), name)
  }, [valueInput])

  return(
    <div className={'selectData-wrapper selectDataArrow-margin'} >
      <div className="selectDataArrow-img-wrap">
        <img className="selectDataArrow-img selectDataArrow-img-margin" src={imgUp} alt="" onClick={handleClickUp}/>
        <img className="selectDataArrow-img"  src={imgDown} alt="" onClick={handleClickDown}/>
      </div>
      
      <input className={margin ? '' : 'selectData-wrapper-margin'} name={name} type="text" placeholder={namePlaceholder} readOnly={true} value={valueInput}/>
    </div>
  )
}