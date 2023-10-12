import SelectDataTwoEditDisp from "../SelectDataTwoEditDisp/SelectDataTwoEditDisp"
import { useState } from "react"

export default function AddRowNameSelectTwoEditDisp({dataName, placeholder, name, dataInputOnChange, valueInput, setValueInput}) {

  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <SelectDataTwoEditDisp namePlaceholder={placeholder} name={name} margin = {false} dataInputOnChange={dataInputOnChange} valueInput={valueInput} setValueInput={setValueInput} />
    </div>
  )
}