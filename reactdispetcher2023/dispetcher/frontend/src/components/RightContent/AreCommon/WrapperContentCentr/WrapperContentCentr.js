import { useEffect, useState } from "react"
import { url } from '../../../../core/core';
import { actionLkData, updateLeftContent, userDataStore } from "../../../store/reduser";
import { useDispatch, useSelector } from 'react-redux';
import GroupUnloadingData from "./GroupUnloadingData/GroupUnloadingData";
import DispUnloadingData from "./DispUnloadingData/DispUnloadingData";
import AutoUnloadingData from "./AutoUnloadingData/AutoUnloadingData";
import ApplicationsUnloadingData from "./ApplicationsUnloadingData/ApplicationsUnloadingData";

export default function WrapperContentCentr({label = '', actionLk, count = '', companyCardOpenHide, setDispCardEdit, backDisp ='', showMoreActiv='', trashDisp, refreshData, setUploadingData}) {
  const [arrGroup, setArrGroup] = useState([])
  const dispatch = useDispatch()
  let actionLkUnloading = useSelector(actionLkData)
  let updateLeft = useSelector(updateLeftContent)
  let dispId = useSelector(userDataStore)

  function fetchBack() {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({[actionLk]: dispId.id})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        data = JSON.parse(data)
        setArrGroup(n => [...data])
      })
      .catch((er) => {
        console.log(er)
      })
  }

  useEffect(() => {
    fetchBack()
  }, [backDisp, showMoreActiv, updateLeft, refreshData])

  //console.log(arrGroup)

  function getDataUnloading() {
    if(actionLk == actionLkUnloading.getGroupData) {
      return <GroupUnloadingData data={arrGroup} count={count} companyCardOpenHide={companyCardOpenHide}/>
    } else if(actionLk == actionLkUnloading.getDispData) {
      return <DispUnloadingData data={arrGroup} count={count} dispCardOpenHide={companyCardOpenHide} setDispCardEdit={setDispCardEdit} trashDisp={trashDisp}/>
    } else if(actionLk == actionLkUnloading.getAutoData) {
      return <AutoUnloadingData data={arrGroup} count={count} dispCardOpenHide={companyCardOpenHide} setDispCardEdit={setDispCardEdit} trashDisp={trashDisp}/>
    } else if(actionLk == actionLkUnloading.getApplicationsData) {
      return <ApplicationsUnloadingData data={arrGroup} count={count} dispCardOpenHide={companyCardOpenHide} setDispCardEdit={setDispCardEdit} setUploadingData={setUploadingData} />
    }
  }

  return(
    <div className={arrGroup == false ? 'wrapperContentCentr' : 'wrapperContentCentr-activ-data'}>
      {arrGroup == false ? (<span>{label}</span>) : getDataUnloading()}
    </div>
  )
}