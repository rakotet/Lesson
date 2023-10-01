import RowData from "./RowData/RowData";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { userDataStore, setActiveRow } from "../store/reduser";


export default function LeftContent() {
  const [isActiveDisp, setActiveDisp] = useState(true);
  const [isActiveGroup, setActiveGroup] = useState(false);
  let userArr = useSelector(userDataStore)
  userArr = userArr[0]
  const dispatch = useDispatch()

  useEffect(() => {
    if(userArr.type == 1) {
      dispatch(setActiveRow('disp'))
    } else if(userArr.type == 2) {
      dispatch(setActiveRow('test2'))
    } else if(userArr.type == 3) {
      dispatch(setActiveRow('test3'))
    } else if(userArr.type == 0) {
      dispatch(setActiveRow('test0'))
    }
  }, [userArr])

  function handleClickDisp() {
    if(!isActiveDisp) {
      setActiveDisp(!isActiveDisp)
      setActiveGroup(!isActiveGroup)
      dispatch(setActiveRow('disp'))
    }
  }

  function handleClickGroup() {
    if(!isActiveGroup) {
      setActiveDisp(!isActiveDisp)
      setActiveGroup(!isActiveGroup)
      dispatch(setActiveRow('group'))
    }
  }

  function getRow() {
    if(userArr.type == 1) {
      return (
        <>
          <RowData name={'Диспетчеры'} count={202} active={isActiveDisp} click={handleClickDisp}/>
          <RowData name={'Предприятия'} count={2} active={isActiveGroup} click={handleClickGroup}/>
        </>
      )
    } else if(userArr.type == 2) {

    } else if(userArr.type == 3) {

    } else if(userArr.type == 0) {

    }
  } 

  return(
    <div className="leftContent-wrapper">
      <h3>Сервис диспетчеризации</h3>
      {getRow()}
    </div>
  )
}