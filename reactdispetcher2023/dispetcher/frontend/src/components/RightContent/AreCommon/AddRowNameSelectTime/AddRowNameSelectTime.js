import SelectDataTime from "../SelectDataTime/SelectDataTime"
import { useState } from "react"

export default function AddRowNameSelectTime({dataName, placeholder, name, dataInputOnChange, arrData, defaultValue = ''}) {
  const [dataGroup, setDataGroup] = useState(arrData)

  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <SelectDataTime namePlaceholder={placeholder} nameArr={dataGroup} name={name} margin = {false} dataInputOnChange={dataInputOnChange} defaultValue={defaultValue}/>
    </div>
  )
}