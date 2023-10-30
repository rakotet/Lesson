import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import ApplicationsRowNameWrapper from "../AreCommon/ApplicationsRowNameWrapper/ApplicationsRowNameWrapper"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData, nameRowData, setUpdateLeftContent, updateLeftContent } from "../../store/reduser";
import { useState, useEffect } from "react"
import ApplicationsCard from "./ApplicationsCard/ApplicationsCard"
import EditApplications from "../EditApplications/EditApplications"
import Datepicker from "../AreCommon/Datepicker/Datepicker"
import { url } from "../../../core/core"
import Ellipsis from "../AreCommon/Ellipsis/Ellipsis"
import ButtonCustom from "../AreCommon/ButtonCustom/ButtonCustom"

export default function Applications({setTabName}) {
  const [dataInput, setDataInput] = useState({})
  const [backDisp, setBackDisp] = useState(1)
  const [dispCardOpen, setDispCardOpen] = useState(true)
  const [dispCardEdit, setDispCardEdit] = useState(true)
  const [companyCardData, setCompanyCardData] = useState({})
  const [showMoreActiv, setShowMoreActiv] = useState(10)
  const [ellipsisOpen, setEllipsisOpen] = useState(true)
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  let nameRowDataLabel = useSelector(nameRowData)
  const dispatch = useDispatch()

  useEffect(() => {
  
  }, [])

  function clickEllipsis() {
    setEllipsisOpen(!ellipsisOpen)
  }

  function addDispFunc() {
    dispatch(setActiveRow(activRight.addApplications))
  }

  function dataInputOnChange(event, inputData = false) { // данные из всех input
    if(!inputData) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setDataInput(n => ({...n, [name]: value.trim()}))
    } else {
      setDataInput(n => ({...n, [inputData[0]]: inputData[1]}))
    }
  }

  function dispCardOpenHide(data = {}) {
    companyCardDataSend(data)
    setDispCardOpen(!dispCardOpen)
    if(dispCardOpen) setTabName(nameRowDataLabel.applicationsCard)
    else setTabName(nameRowDataLabel.Applications)
  }

  function companyCardDataSend(data = {}) {
    setCompanyCardData(data)
  }

  function editDisp(data = {}) {
    setBackDisp(n => n + 1)
    companyCardDataSend(data)
    setDispCardEdit(!dispCardEdit)
    if(dispCardEdit) setTabName(nameRowDataLabel.editApplications)
    else setTabName(nameRowDataLabel.Applications)
  }

  function trashDisp(item) {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({trashDisp: item.id})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        if(data != 'null') {
          console.log(data)
        } else {
          dispatch(setUpdateLeftContent(item.id))
        }
      })
      .catch((er) => {
        console.log(er)
      })
  }

  return(
    <>
      {dispCardEdit ? '' : <EditApplications editDisp={editDisp} companyCardData={companyCardData}/>}
      <ApplicationsCard dispCardOpen={dispCardOpen} dispCardOpenHide={dispCardOpenHide} dispCardData={companyCardData}/>
      <div className={dispCardEdit ? '' : 'disp-wrapper-hide' }>
        <div className={dispCardOpen ? 'disp-wrapper' : 'disp-wrapper-hide' }>
          <div className="disp-row">
            <div className="disp-row-menu">
              <ButtonAdd addFunc={addDispFunc}/>
              <div className={ellipsisOpen ? 'applications-rowUp-hide' : 'applications-rowUp'}>
                <ButtonCustom addFunc={() => {}} buttonImg={'refresh'}/>
                <ButtonCustom addFunc={() => {}} buttonImg={'edit'}/>
                <ButtonCustom addFunc={() => {}} buttonImg={'trash'}/>
                <ButtonCustom addFunc={() => {}} buttonImg={'cancel'}/>
                <ButtonCustom addFunc={() => {}} buttonImg={'downLoad'}/>
              </div>
              <Ellipsis handleClick={clickEllipsis}/>
              {ellipsisOpen ? <SearchData /> : ''}
              <SelectData namePlaceholder={'Выбрать статус'} nameArr={['test1','test2','test3','test4','test5']} name={'statusApplications'} dataInputOnChange={dataInputOnChange}/>
              <Datepicker placeHolder={'Период создания'}/>
              <div className="applications-margin">
               <Datepicker placeHolder={'Период подачи'}/>
              </div>
              <DownloadReport />
            </div>
            <div>
              <ListDataNumber setShowMoreActiv={setShowMoreActiv}/>
            </div>
          </div>
          <div className="disp-row-name-wrapper">
            <ApplicationsRowNameWrapper />
            <WrapperContentCentr label="Записей не найдено. Добавьте новую заявку" actionLk={actionLk.getApplicationsData} count={showMoreActiv} companyCardOpenHide={dispCardOpenHide} setDispCardEdit={editDisp} backDisp={backDisp} showMoreActiv={showMoreActiv} trashDisp={trashDisp}/>
          </div>
        </div>
      </div>
    </>
  )
}