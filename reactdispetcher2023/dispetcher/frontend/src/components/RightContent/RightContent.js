import { useDispatch, useSelector } from 'react-redux'
import { activeRowStore, nameRowData, activRightContent, cancelApplicationsData } from "../store/reduser";
import { useEffect, useState } from 'react';
import print from './images/print.png';
import Disp from './Disp/Disp';
import Group from './Group/Group';
import Auto from './Auto/Auto';
import Applications from './Applications/Applications';
import MyApplications from './MyApplications/MyApplications';
import MyTemplates from './MyTemplates/MyTemplates';
import Admins from './Admins/Admins';
import AddDisp from './AddDisp/AddDisp';
import AddGroup from './AddGroup/AddGroup';
import AddAuto from './AddAuto/AddAuto';
import AddApplications from './AddApplications/AddApplications';
import AddMyApplications from './AddMyApplications/AddMyApplications';

export default function RightContent() {
  const [tabName, setTabName] = useState('')
  let activeData = useSelector(activeRowStore)
  let nameRow = useSelector(nameRowData)
  let activRightContentData = useSelector(activRightContent)
  let cancelApplications = useSelector(cancelApplicationsData)

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
    } else if(activeData == activRightContentData.companyCard) {
      setTabName(nameRow.companyCard)
    }  else if(activeData == activRightContentData.editDisp) {
      setTabName(nameRow.editDisp)
    } else if(activeData == activRightContentData.addAuto) {
      setTabName(nameRow.addAuto)
    } else if(activeData == activRightContentData.addApplications) {
      setTabName(nameRow.addApplications)
    } else if(activeData == activRightContentData.addMyApplications) {
      setTabName(nameRow.addMyApplications)
    } 

  }, [activeData])


  function getContentRight() {
    if(activeData == activRightContentData.disp) {
      return(
        <Disp setTabName={setTabName}/>
      )
    } else if(activeData == activRightContentData.group) {
      return(
        <Group setTabName={setTabName}/>
      )
    } else if(activeData == activRightContentData.auto) {
      return(
       <Auto setTabName={setTabName}/>
      )
    } else if(activeData == activRightContentData.applications) {
      return(
        <Applications setTabName={setTabName}/>
      )
    } else if(activeData == activRightContentData.myApplications) {
      return(
        <MyApplications setTabName={setTabName}/>
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
    } else if(activeData == activRightContentData.addAuto) {
      return(
        <AddAuto />
      )
    } else if(activeData == activRightContentData.addApplications) {
      return(
        <AddApplications />
      )
    } else if(activeData == activRightContentData.addMyApplications) {
      return(
        <AddMyApplications />
      )
    } 
  }

  return(
    <div className="rightContent">
      <div className="rightContent-label-row">
        <h3>{tabName}</h3>
        {tabName == 'Карточка заявки' ? <img src={print}/> : ''}
      </div>
      {getContentRight()}
    </div>
  )
}