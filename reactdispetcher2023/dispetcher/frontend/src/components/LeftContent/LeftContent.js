import RowData from "./RowData/RowData";
import { useState } from "react";


export default function LeftContent() {
  const [isActiveDisp, setActiveDisp] = useState(true);
  const [isActiveGroup, setActiveGroup] = useState(false);

  function handleClickDisp() {
    if(!isActiveDisp) {
      setActiveDisp(!isActiveDisp)
      setActiveGroup(!isActiveGroup)
    }
  }

  function handleClickGroup() {
    if(!isActiveGroup) {
      setActiveDisp(!isActiveDisp)
      setActiveGroup(!isActiveGroup)
    }
  }

  return(
    <div className="leftContent-wrapper">
      <h3>Сервис диспетчеризации</h3>
      <RowData name={'Диспетчеры'} count={202} active={isActiveDisp} click={handleClickDisp}/>
      <RowData name={'Предприятия'} count={2} active={isActiveGroup} click={handleClickGroup}/>
    </div>
  )
}