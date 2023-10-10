import SelectData from "../SelectData/SelectData"
import { useState, useEffect } from "react"

export default function AddRowNameSelect({dataName, placeholder, name, dataInputOnChange, arrData, selectSub}) {
  const [dataGroup, setDataGroup] = useState(arrData)
  
  useEffect(() => {
    
  }, [selectSub])

  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <SelectData namePlaceholder={placeholder} nameArr={dataGroup} name={name} margin = {false} dataInputOnChange={dataInputOnChange}/>
    </div>
  )
}