import { useEffect, useState } from "react"
import { url } from '../../../../core/core';
import { actionLkData } from "../../../store/reduser";
import { useDispatch, useSelector } from 'react-redux';
import GroupUnloadingData from "./GroupUnloadingData/GroupUnloadingData";

export default function WrapperContentCentr({label = '', actionLk}) {
  const [arrGroup, setArrGroup] = useState([])
  const dispatch = useDispatch()
  let actionLkUnloading = useSelector(actionLkData)

  function fetchBack() {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({[actionLk]: true})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        data = JSON.parse(data)
        setArrGroup([...data])
        //dispatch(setDataStore(data))
  
      })
      .catch((er) => {
        console.log(er)
      })
  }

  useEffect(() => {
    fetchBack()
  }, [])

  console.log(arrGroup)

  function getDataUnloading() {
    if(actionLk == actionLkUnloading.getGroupData) {
      return <GroupUnloadingData data={arrGroup}/>
    } else if(actionLk == actionLkUnloading.getDispData) {
      
    }
  }

  return(
    <div className="wrapperContentCentr">
      {arrGroup == false ? (<span>{label}</span>) : getDataUnloading()}
    </div>
  )
}