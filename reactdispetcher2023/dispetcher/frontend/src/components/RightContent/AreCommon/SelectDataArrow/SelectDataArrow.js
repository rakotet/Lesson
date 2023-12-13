import { useState, useEffect } from "react"
import imgUp from './image/up.png'
import imgDown from './image/down.png'

export default function SelectDataArrow({namePlaceholder, name = '', margin = true, dataInputOnChange, number, value, setArrPassengers, minutes}) {
  const [valueInput, setValueInput] = useState(Number(value));
  let num = 1

  if(minutes) {
    num = 0.5
  }

  function handleClickUp() {
    setValueInput(n => {
      if((n + num) > Number(number)) {
        return 0
      } else {
        return n + num
      }
    })
  }
  
  function handleClickDown() {
    setValueInput(n => {
      if((n - num) < num) {
        return 0
      } else {
        return n - num
      }
    })
  }

  useEffect(() => {
    let arr = []
    for(let i = 0; i < valueInput; i++) {
      arr.push(i)
    }

    setArrPassengers(arr)

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