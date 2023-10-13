import { useState, useEffect } from "react"

export default function ListDataNumber({setShowMoreActiv}) {
  const [val, setVal] = useState(10)

  useEffect(() => {
   
  }, [val])

  function handleChange(event) {
    setVal(() => event.target.value);
    setShowMoreActiv(() => event.target.value)
  }

  return(
    <div className="listDataNumber" >
      <select defaultValue={val} onChange={handleChange}>
        <option value="10" >10</option>
        <option value="50" >50</option>
        <option value="100" >100</option>
        <option value="10000" >Все</option>
      </select>
    </div>
  )
}