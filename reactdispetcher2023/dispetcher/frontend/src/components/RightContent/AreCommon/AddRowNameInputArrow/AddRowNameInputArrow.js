import SelectDataArrow from "../SelectDataArrow/SelectDataArrow"
import { useState } from "react"

export default function AddRowNameInputArrow({dataName, placeholder, name, dataInputOnChange, arrData, number, value, setArrPassengers}) {
  const [dataGroup, setDataGroup] = useState(arrData)

  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <SelectDataArrow namePlaceholder={placeholder} nameArr={dataGroup} name={name} margin = {false} dataInputOnChange={dataInputOnChange} number={number} value={value} setArrPassengers={setArrPassengers}/>
    </div>
  )
}