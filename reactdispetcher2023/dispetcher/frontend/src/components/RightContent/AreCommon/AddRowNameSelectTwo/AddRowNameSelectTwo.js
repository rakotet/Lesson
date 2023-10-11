import SelectDataTwo from "../SelectDataTwo/SelectDataTwo"
import { useState } from "react"

export default function AddRowNameSelectTwo({dataName, placeholder, name, dataInputOnChange, valueInput, setValueInput}) {

  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <SelectDataTwo namePlaceholder={placeholder} name={name} margin = {false} dataInputOnChange={dataInputOnChange} valueInput={valueInput} setValueInput={setValueInput}/>
    </div>
  )
}