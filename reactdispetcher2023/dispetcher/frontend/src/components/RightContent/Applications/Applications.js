import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import ApplicationsRowNameWrapper from "../AreCommon/ApplicationsRowNameWrapper/ApplicationsRowNameWrapper"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData, nameRowData, setUpdateLeftContent, updateLeftContent, setAssignAcarClickAuto, setCancelApplications,setCancelApplicationsObj, cancelApplicationsObj, cancelApplicationsData } from "../../store/reduser";
import { useState, useEffect } from "react"
import ApplicationsCard from "./ApplicationsCard/ApplicationsCard"
import EditApplications from "../EditApplications/EditApplications"
import Datepicker from "../AreCommon/Datepicker/Datepicker"
import { url } from "../../../core/core"
import Ellipsis from "../AreCommon/Ellipsis/Ellipsis"
import ButtonCustom from "../AreCommon/ButtonCustom/ButtonCustom"
import ShowMore from "../AreCommon/ShowMore/ShowMore"

export default function Applications({setTabName}) {
  const [dataInput, setDataInput] = useState({})
  const [backDisp, setBackDisp] = useState(1)
  const [dispCardOpen, setDispCardOpen] = useState(true)
  const [dispCardEdit, setDispCardEdit] = useState(true)
  const [companyCardData, setCompanyCardData] = useState({})
  const [showMoreActiv, setShowMoreActiv] = useState(10)
  const [ellipsisOpen, setEllipsisOpen] = useState(true)
  const [refreshData, setRefreshData] = useState(true)
  const [cancelData, setCancelData] = useState(false)
  const [uploadingData, setUploadingData] = useState({})
  const [trashReload, setTrashReload] = useState(true)
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  let nameRowDataLabel = useSelector(nameRowData)
  let cancelApplications = useSelector(cancelApplicationsObj)
  let cancelApplicationsOpen = useSelector(cancelApplicationsData)
  let updateLeftContentData = useSelector(updateLeftContent)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAssignAcarClickAuto({driver: '', telephone: '', marc: '', gossNumber: ''}))
  }, [cancelApplications])

  useEffect(() => {

  }, [updateLeftContentData])

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
    else setTabName(nameRowDataLabel.applications)
  }

  function dispCardOpenHideTwo(data = {}) {
    setDispCardOpen(!dispCardOpen)
    if(dispCardOpen) setTabName(nameRowDataLabel.applicationsCard)
    else setTabName(nameRowDataLabel.applications)
  }

  function companyCardDataSend(data = {}) {
    setCompanyCardData(data)
  }

  function editDisp(data = {}) {
    setBackDisp(n => n + 1)
    companyCardDataSend(data)
    setDispCardEdit(!dispCardEdit)
    if(dispCardEdit) setTabName(nameRowDataLabel.editApplications)
    else setTabName(nameRowDataLabel.applications)
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
          dispatch(setUpdateLeftContent(Math.random()))
        }
      })
      .catch((er) => {
        console.log(er)
      })
  }

  function trashAppNo(item) {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({trashApplications: item.id})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        if(data != 'null') {
          console.log(data)
        } else {
          dispatch(setUpdateLeftContent(Math.random()))
        }
      })
      .catch((er) => {
        console.log(er)
      })
  }

  function trashAppYes(gossNumber, item) {
    // console.log(JSON.stringify({trashApplicationsYes: [gossNumber, item]}))
    
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({trashApplicationsYes: [gossNumber, item]})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        if(data != 'null') {
          console.log(data)
        } 
      })
      .catch((er) => {
        console.log(er)
      })
  }

  function dateApplications(number = '', numberHours = '', timeOfUseOfTransport = '') {
    let date = new Date()
    date.setFullYear(number[6] + number[7] + number[8] + number[9]);
    date.setMonth(number[3] + number[4]);
    date.setDate(number[0] + number[1]);
    date.setHours(numberHours[0] + numberHours[1]);
    date.setMinutes(numberHours[3] + numberHours[4]);
    let timeOfUse = timeOfUseOfTransport * 3600000
    let dateTime = date.getTime()
    let dateFull = new Date(timeOfUse + dateTime)
  
    let day = String(dateFull.getDate())
    let month = String(dateFull.getMonth())
    let hours = String(dateFull.getHours())
    let minutes = String(dateFull.getMinutes())
  
    if(day.length < 2) day = '0' + day
    if(month.length < 2) month = '0' + month
    if(hours.length < 2) hours = '0' + hours
    if(minutes.length < 2) minutes = '0' + minutes
  
    return `${hours}:${Number(minutes) > 0 ? '30' : '00'}`
  }

  function refresh() {
    setUpdateLeftContent(Math.random())
    setRefreshData(!refreshData)
    location.reload() 
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  function editApplications() {
    let lengthData = Object.keys(uploadingData).length
    
    // console.log(lengthData)

    if(lengthData == 1) {
      for(let key in uploadingData) {
        let numberDate = uploadingData[key]['dateOfApplication']
        let dateOf = new Date()
        let dateToday = new Date()
        dateOf.setFullYear(numberDate[6] + numberDate[7] + numberDate[8] + numberDate[9]);
        dateOf.setMonth((Number(numberDate[3] + numberDate[4])) - 1);
        dateOf.setDate(numberDate[0] + numberDate[1]);
        let dateTime = dateOf.getTime() >= dateToday.getTime()

        if(dateTime) {
          if(uploadingData[key]['status'] == 'Новая' || uploadingData[key]['status'] == 'Назначена') {
            editDisp(uploadingData[key])
          } else alert('Нельзя редактировать отмененные заявки')
        } else alert('Нельзя редактировать прошедшие заявки')
      }

    } else if(lengthData > 1) {
      alert('Выберете только один чекбокс')
    } else alert('Выберете хотя бы один чекбокс')
  }

  async function trashApplications() {
    let lengthData = Object.keys(uploadingData).length
    
    if(lengthData >= 1) {
      setTrashReload(false)

      for(let key in uploadingData) {
        await delay(200)

        try {
          trashAppYes(uploadingData[key]['gossNumber'], {[uploadingData[key]['dateOfApplication']] : {[uploadingData[key]['submissionTime']] : dateApplications(uploadingData[key]['dateOfApplication'], uploadingData[key]['submissionTime'], uploadingData[key]['timeOfUseOfTransport'])}})

        } catch(er) {
          console.log(er)
        }

        trashAppNo(uploadingData[key])
        setUploadingData(n => {
          let nev = {...n};
          delete nev[key]
          return nev
        })

        setTrashReload(true)
      }

      
    } else alert('Выберете хотя бы один чекбокс')
    
  }

  function cancelFunc() {
    let lengthData = Object.keys(uploadingData).length
    if(lengthData >= 1) {
      dispatch(setCancelApplicationsObj(uploadingData))
      dispatch(setCancelApplications(true))

    } else alert('Выберете хотя бы один чекбокс')
  }

  function showMoreActivClick() {
    setShowMoreActiv(n => n * 2)
  }

  function downLoadWord() {
    let lengthData = Object.keys(uploadingData).length

    function htmlData() {
      return (
        `
          <div>НОМЕР ЗАЯВКИ - №${uploadingData['applicationsUnloadingData-checkbox0'].id}</div>
          <div>ДАТА СОЗДАНИЯ ЗАЯВКИ - ${uploadingData['applicationsUnloadingData-checkbox0'].dateOfCreation}</div>
          <div>СТАТУС - ${uploadingData['applicationsUnloadingData-checkbox0'].status}</div>
          <div>ДАТА ПОДАЧИ - ${uploadingData['applicationsUnloadingData-checkbox0'].dateOfApplication}</div>
          <div>ВРЕМЯ ПОДАЧИ - ${uploadingData['applicationsUnloadingData-checkbox0'].submissionTime}</div>
          <div>ВРЕМЯ ИСПОЛЬЗОВАНИЯ (ЧАСЫ) - ${uploadingData['applicationsUnloadingData-checkbox0'].timeOfUseOfTransport}Ч</div>
          <div>АДРЕС ПОДАЧИ - ${uploadingData['applicationsUnloadingData-checkbox0'].submissionAddress}</div>
          <div>АДРЕС ПРИБЫТИЯ - ${uploadingData['applicationsUnloadingData-checkbox0'].arrivalAddress}</div>
          <div>ПОЕЗДКА С ОЖИДАНИЕМ - ${uploadingData['applicationsUnloadingData-checkbox0'].rideWithAnticipation}</div>
          <div>ЦЕЛЬ ПОЕЗДКИ - ${uploadingData['applicationsUnloadingData-checkbox0'].purposeOfTheTrip}</div>
          <div>СОТРУДНИК ПОДАВШИЙ ЗАЯВКУ - ${uploadingData['applicationsUnloadingData-checkbox0'].applicationInitiator} ${uploadingData['applicationsUnloadingData-checkbox0'].emailUserCreate}</div>
          <div>ДОЛЖНОСТЬ - ${uploadingData['applicationsUnloadingData-checkbox0'].jobTitle}</div>
          <div>ПОДРАЗДЕЛЕНИЕ - ${uploadingData['applicationsUnloadingData-checkbox0'].subdivision}</div>
          <div>СОТОВЫЙ ТЕЛЕФОН - ${uploadingData['applicationsUnloadingData-checkbox0'].initiatorPhone}</div>
          <div>КОЛИЧЕСТВО ПАССАЖИРОВ - ${uploadingData['applicationsUnloadingData-checkbox0'].numberOfPassengers}</div>
          <div>ВОДИТЕЛЬ, ТЕЛ. - ${uploadingData['applicationsUnloadingData-checkbox0'].driverPhone != null ? uploadingData['applicationsUnloadingData-checkbox0'].driverPhone : 'Не назначен'}</div>
          <div>КОММЕНТАРИЙ - ${uploadingData['applicationsUnloadingData-checkbox0'].comment}</div>
        `
      )
    }

    if(lengthData == 1) {
      let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
      "xmlns:w='urn:schemas-microsoft-com:office:word' "+
      "xmlns='http://www.w3.org/TR/REC-html40'>"+
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
      let footer = "</body></html>";
      let sourceHTML = header+htmlData()+footer;

      let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
      let fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = 'document.doc';
      fileDownload.click();
      document.body.removeChild(fileDownload);
      
    } else if(lengthData > 1) {
      alert('Выберите только один чекбокс')
    } else {
      alert('Выберите хотя бы один чекбокс')
    }
  }

  return(
    <>
      {dispCardEdit ? '' : <EditApplications editDisp={editDisp} companyCardData={companyCardData} setUploadingData={setUploadingData}/>}
      <ApplicationsCard dispCardOpen={dispCardOpen} dispCardOpenHide={dispCardOpenHideTwo} dispCardData={companyCardData}/>
      <div className={dispCardEdit ? '' : 'disp-wrapper-hide' }>
        <div className={dispCardOpen ? 'disp-wrapper' : 'disp-wrapper-hide' }>
          <div className="disp-row">
            <div className="disp-row-menu">
              <ButtonAdd addFunc={addDispFunc}/>
              <div className={ellipsisOpen ? 'applications-rowUp-hide' : 'applications-rowUp'}>
                <ButtonCustom addFunc={refresh} buttonImg={'refresh'}/>
                <ButtonCustom addFunc={editApplications} buttonImg={'edit'}/>
                <ButtonCustom addFunc={trashApplications} buttonImg={'trash'}/>
                <ButtonCustom addFunc={cancelFunc} buttonImg={'cancel'}/>
                <ButtonCustom addFunc={downLoadWord} buttonImg={'downLoad'}/>
              </div>
              <Ellipsis handleClick={clickEllipsis}/>
              {ellipsisOpen ? <SearchData dataInputOnChange={dataInputOnChange} name={'searchData'}/> : ''}
              <SelectData namePlaceholder={'Выбрать статус'} nameArr={['Выбрать статус', 'Новая', 'Отклонена', 'Назначена']} name={'statusApplications'} dataInputOnChange={dataInputOnChange}/>
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
            <ApplicationsRowNameWrapper checkNumber={Object.keys(uploadingData).length}/>
            {
            trashReload 
            ?
             ((dispCardEdit && cancelApplicationsOpen == false) ? 
             <WrapperContentCentr label="Записей не найдено. Добавьте новую заявку" actionLk={actionLk.getApplicationsData} count={showMoreActiv} companyCardOpenHide={dispCardOpenHide} setDispCardEdit={editDisp} backDisp={backDisp} showMoreActiv={showMoreActiv} trashDisp={trashDisp} refreshData={refresh} setUploadingData={setUploadingData} dispCardEditNoUpdatePage={dispCardEdit} sort={dataInput}/>
             : '') 
            : 
             ''
            }
          </div>
            <ShowMore label={'Показать еще'} click={showMoreActivClick}/>
          </div>
      </div>
    </>
  )
}