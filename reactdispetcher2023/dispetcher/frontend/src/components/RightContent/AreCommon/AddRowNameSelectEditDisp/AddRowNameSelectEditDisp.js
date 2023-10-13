import SelectDataEditDisp from "../SelectDataEditDisp/SelectDataEditDisp"
import { useState } from "react"

export default function AddRowNameSelectEditDisp({dataName, placeholder, name, dataInputOnChange, arrData, valueEdit}) {
  const [dataGroup, setDataGroup] = useState(arrData)

  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <SelectDataEditDisp namePlaceholder={placeholder} nameArr={dataGroup} name={name} margin = {false} dataInputOnChange={dataInputOnChange} valueEdit={valueEdit}/>
    </div>
  )
}