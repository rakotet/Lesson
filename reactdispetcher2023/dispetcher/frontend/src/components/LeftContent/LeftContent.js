import RowData from "./RowData/RowData";
import logout from '../../../public/images/logout.png';
import collapse from '../../../public/images/collapse.png';
import { url } from '../../core/core';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userDataStore, setActiveRow, nameRowData, activRightContent, roleUsers, updateLeftContent, activeRowStore } from "../store/reduser";

export default function LeftContent({collapseData, hideRow}) {
  const [isActiveDisp, setActiveDisp] = useState(true);
  const [isActiveGroup, setActiveGroup] = useState(false);
  const [isActiveAuto, setActiveAuto] = useState(true);
  const [isActiveApplications, setActiveApplications] = useState(false);
  const [isActiveMyApplications, setActiveMyApplications] = useState(true);
  const [isActiveMytemplates, setActiveMytemplates] = useState(false);
  const [isActiveAdmins, setActiveAdmins] = useState(true);
  const [numberDisp, setNumberDisp] = useState(0);
  const [numberGroup, setNumberGroup] = useState(0);
  const [numberAuto, setNumberAuto] = useState(0);
  const [numberApplications, setNumberApplications] = useState(0);
  const [numberMyApplications, setNumberMyApplications] = useState(0);

  let activeRow = useSelector(activeRowStore)
  let userArr = useSelector(userDataStore)
  let updateLeft = useSelector(updateLeftContent)
  
  const roleUsersData = useSelector(roleUsers)
  let nameRow = useSelector(nameRowData)
  let activRight = useSelector(activRightContent)
  const dispatch = useDispatch()

  useEffect(() => {
    if(userArr.type == roleUsersData.admin) {
      getNumber('getDispNumber', setNumberDisp)
      getNumber('getGroupNumber', setNumberGroup)
      dispatch(setActiveRow(activRight.disp))

    } else if(userArr.type == roleUsersData.disp) {
      getNumber('getAutoNumber', setNumberAuto)
      getNumber('getApplicationsNumber', setNumberApplications)
      dispatch(setActiveRow(activRight.auto))

    } else if(userArr.type == roleUsersData.user) {
      //getNumber('getMyApplicationsNumber', setNumberMyApplications)
      dispatch(setActiveRow(activRight.myApplications))

    } else if(userArr.type == roleUsersData.sa) {
      dispatch(setActiveRow(activRight.admins))

    }
    
  }, [userArr])

  useEffect(() => {
    if(userArr.type == roleUsersData.admin) {
      getNumber('getDispNumber', setNumberDisp)
      getNumber('getGroupNumber', setNumberGroup)

    } else if(userArr.type == roleUsersData.disp) {
      getNumber('getAutoData', setNumberAuto, userArr.id)
      getNumber('getApplicationsData', setNumberApplications, userArr.id)

    } else if(userArr.type == roleUsersData.user) {
      //getNumber('getMyApplicationsData', setNumberMyApplications, userArr.id)

    } else if(userArr.type == roleUsersData.sa) {

    }
  }, [updateLeft])

  function getNumber(parametr, setNumberDisp, data = true) {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({[parametr]: data})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        // console.log(data)
        data = JSON.parse(data)
        setNumberDisp(data.length)
      })
      .catch((er) => {
        console.log(er)
      })
  }

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
          <RowData name={nameRow.disp} count={numberDisp} active={isActiveDisp} click={handleClickDisp} hide='' hideRow={hideRow}/>
          <RowData name={nameRow.group} count={numberGroup} active={isActiveGroup} click={handleClickGroup} hide='' hideRow={hideRow}/>
        </>
      )
    } else if(userArr.type == roleUsersData.disp) {
      return (
        <>
          <RowData name={nameRow.auto} count={numberAuto} active={isActiveAuto} click={handleClickAuto} hide='' hideRow={hideRow}/>
          <RowData name={nameRow.applications} count={numberApplications} active={isActiveApplications} click={handleClickApplications} hide='' hideRow={hideRow}/>
        </>
      )
    } else if(userArr.type == roleUsersData.user) {
      return (
        <>
          <RowData name={nameRow.myApplications} count={0} active={isActiveMyApplications} click={handleClickMyApplications} hide={'rowData-hide'} hideRow={hideRow}/>
          <RowData name={nameRow.myTemplates} count={0} active={isActiveMytemplates} click={handleClickMytemplates} hide={'rowData-hide'} hideRow={hideRow}/>
        </>
      )
    } else if(userArr.type == roleUsersData.sa) {
      return (
        <>
          <RowData name={nameRow.admins} count={0} active={isActiveAdmins} click={handleClickAdmins} hide='' hideRow={hideRow}/>
        </>
      )
    }
  } 

  return(
    <>
      <div className="leftContent-wrapper">
       <div className="leftContent-wrapper-menu">
        <h3 className={hideRow ? '' : 'leftContent-hide'}>Сервис диспетчеризации</h3>
          {getRow()}
       </div>
        <div className="leftContent-bottom">
          <div></div>
          <div>
            <div className="leftContent-bottom-row">
              <a href="?logout">
                <img src={logout} alt="" />
              </a>
              <a href="?logout" className={hideRow ? '' : 'leftContent-hide'}>Выйти</a>
            </div>
            <div className={hideRow ? 'leftContent-bottom-collapse' : 'leftContent-bottom-collapse-false'}>
              <div></div>
              <img src={collapse} alt="" style={hideRow ? {transform: "none"} : {transform: "rotate(180deg)"}} onClick={collapseData}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}