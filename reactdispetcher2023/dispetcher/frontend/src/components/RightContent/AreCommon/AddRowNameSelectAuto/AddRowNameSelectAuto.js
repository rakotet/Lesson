import SelectDataAuto from "./SelectDataAuto/SelectDataAuto"
import { useState } from "react"

export default function AddRowNameSelectAuto({dataName, placeholder, name, dataInputOnChange, arrData, defaultValue}) {
  const [dataGroup, setDataGroup] = useState(arrData)

  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <SelectDataAuto namePlaceholder={placeholder} nameArr={dataGroup} name={name} margin = {false} dataInputOnChange={dataInputOnChange} defaultValue={defaultValue}/>
    </div>
  )
}