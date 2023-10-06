import RowData from "./RowData/RowData";
import logout from '../../../public/images/logout.png';
import collapse from '../../../public/images/collapse.png';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userDataStore, setActiveRow, nameRowData, activRightContent, roleUsers } from "../store/reduser";


export default function LeftContent({collapseData, hideRow}) {
  const [isActiveDisp, setActiveDisp] = useState(true);
  const [isActiveGroup, setActiveGroup] = useState(false);
  const [isActiveAuto, setActiveAuto] = useState(true);
  const [isActiveApplications, setActiveApplications] = useState(false);
  const [isActiveMyApplications, setActiveMyApplications] = useState(true);
  const [isActiveMytemplates, setActiveMytemplates] = useState(false);
  const [isActiveAdmins, setActiveAdmins] = useState(true);

  let userArr = useSelector(userDataStore)
  
  const roleUsersData = useSelector(roleUsers)
  let nameRow = useSelector(nameRowData)
  let activRight = useSelector(activRightContent)
  const dispatch = useDispatch()

  useEffect(() => {
    if(userArr.type == roleUsersData.admin) {
      dispatch(setActiveRow(activRight.disp))
    } else if(userArr.type == roleUsersData.disp) {
      dispatch(setActiveRow(activRight.auto))
    } else if(userArr.type == roleUsersData.user) {
      dispatch(setActiveRow(activRight.myApplications))
    } else if(userArr.type == roleUsersData.sa) {
      dispatch(setActiveRow(activRight.admins))
    }
  }, [userArr])

  function handleClickDisp() {
    if(!isActiveDisp) {
      setActiveDisp(!isActiveDisp)
      setActiveGroup(!isActiveGroup)
      dispatch(setActiveRow(activRight.disp))
    }
  }

  function handleClickGroup() {
    if(!isActiveGroup) {
      setActiveDisp(!isActiveDisp)
      setActiveGroup(!isActiveGroup)
      dispatch(setActiveRow(activRight.group))
    }
  }

  function handleClickAuto() {
    if(!isActiveAuto) {
      setActiveAuto(!isActiveAuto)
      setActiveApplications(!isActiveApplications)
      dispatch(setActiveRow(activRight.auto))
    }
  }

  function handleClickApplications() {
    if(!isActiveApplications) {
      setActiveAuto(!isActiveAuto)
      setActiveApplications(!isActiveApplications)
      dispatch(setActiveRow(activRight.applications))
    }
  }

  function handleClickMyApplications() {
    if(!isActiveMyApplications) {
      setActiveMyApplications(!isActiveMyApplications)
      setActiveMytemplates(!isActiveMytemplates)
      dispatch(setActiveRow(activRight.myApplications))
    }
  }

  function handleClickMytemplates() {
    if(!isActiveMytemplates) {
      setActiveMyApplications(!isActiveMyApplications)
      setActiveMytemplates(!isActiveMytemplates)
      dispatch(setActiveRow(activRight.myTemplates))
    }
  }

  function handleClickAdmins() {
    
  }

  function getRow() {
    if(userArr.type == roleUsersData.admin) {
      return (
        <>
          <RowData name={nameRow.disp} count={202} active={isActiveDisp} click={handleClickDisp} hide='' hideRow={hideRow}/>
          <RowData name={nameRow.group} count={2} active={isActiveGroup} click={handleClickGroup} hide='' hideRow={hideRow}/>
        </>
      )
    } else if(userArr.type == roleUsersData.disp) {
      return (
        <>
          <RowData name={nameRow.auto} count={202} active={isActiveAuto} click={handleClickAuto} hide='' hideRow={hideRow}/>
          <RowData name={nameRow.applications} count={2} active={isActiveApplications} click={handleClickApplications} hide='' hideRow={hideRow}/>
        </>
      )
    } else if(userArr.type == roleUsersData.user) {
      return (
        <>
          <RowData name={nameRow.myApplications} count={202} active={isActiveMyApplications} click={handleClickMyApplications} hide={'rowData-hide'} hideRow={hideRow}/>
          <RowData name={nameRow.myTemplates} count={2} active={isActiveMytemplates} click={handleClickMytemplates} hide={'rowData-hide'} hideRow={hideRow}/>
        </>
      )
    } else if(userArr.type == roleUsersData.sa) {
      return (
        <>
          <RowData name={nameRow.admins} count={202} active={isActiveAdmins} click={handleClickAdmins} hide='' hideRow={hideRow}/>
        </>
      )
    }
  } 

  return(
    <>
      <div className="leftContent-wrapper">
        <h3 className={hideRow ? '' : 'leftContent-hide'}>Сервис диспетчеризации</h3>
        {getRow()}
        <div className="leftContent-bottom">
          <div></div>
          <div>
            <div className="leftContent-bottom-row">
              <a href="?logout">
                <img src={logout} alt="" />
              </a>
              <a href="?logout" className={hideRow ? '' : 'leftContent-hide'}>Выйти</a>
            </div>
            <div className="leftContent-bottom-collapse">
              <div></div>
              <img src={collapse} alt="" style={hideRow ? {transform: "none"} : {transform: "rotate(180deg)"}} onClick={collapseData}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}