import { useDispatch, useSelector } from 'react-redux'
import { activeRowStore, nameRowData, activRightContent } from "../store/reduser";
import { useEffect, useState } from 'react';
import Disp from './Disp/Disp';
import Group from './Group/Group';
import Auto from './Auto/Auto';
import Applications from './Applications/Applications';
import MyApplications from './MyApplications/MyApplications';
import MyTemplates from './MyTemplates/MyTemplates';
import Admins from './Admins/Admins';
import AddDisp from './AddDisp/AddDisp';
import AddGroup from './AddGroup/AddGroup';

export default function RightContent() {
  const [tabName, setTabName] = useState('')
  let activeData = useSelector(activeRowStore)
  let nameRow = useSelector(nameRowData)
  let activRightContentData = useSelector(activRightContent)

  useEffect(() => {
    if(activeData == activRightContentData.disp) {
      setTabName(nameRow.disp)
    } else if(activeData == activRightContentData.group) {
      setTabName(nameRow.group)
    } else if(activeData == activRightContentData.auto) {
      setTabName(nameRow.auto)
    } else if(activeData == activRightContentData.applications) {
      setTabName(nameRow.applications)
    } else if(activeData == activRightContentData.myApplications) {
      setTabName(nameRow.myApplications)
    } else if(activeData == activRightContentData.myTemplates) {
      setTabName(nameRow.myTemplates)
    } else if(activeData == activRightContentData.admins) {
      setTabName(nameRow.admins)
    } else if(activeData == activRightContentData.addDisp) {
      setTabName(nameRow.addDisp)
    } else if(activeData == activRightContentData.addGroup) {
      setTabName(nameRow.addGroup)
    }

  }, [activeData])


  function getContentRight() {
    if(activeData == activRightContentData.disp) {
      return(
        <Disp />
      )
    } else if(activeData == activRightContentData.group) {
      return(
        <Group />
      )
    } else if(activeData == activRightContentData.auto) {
      return(
       <Auto />
      )
    } else if(activeData == activRightContentData.applications) {
      return(
        <Applications />
      )
    } else if(activeData == activRightContentData.myApplications) {
      return(
        <MyApplications />
      )
    } else if(activeData == activRightContentData.myTemplates) {
      return(
        <MyTemplates />
      )
    } else if(activeData == activRightContentData.admins) {
      return(
        <Admins />
      )
    } else if(activeData == activRightContentData.addDisp) {
      return(
        <AddDisp />
      )
    } else if(activeData == activRightContentData.addGroup) {
      return(
        <AddGroup />
      )
    }
  }

  return(
    <div className="rightContent">
      <h3>{tabName}</h3>
      {getContentRight()}
    </div>
  )
}