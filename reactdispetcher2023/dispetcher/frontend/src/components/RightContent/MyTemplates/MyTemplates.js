import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import MyTemplatesRowNameWrapper from "../AreCommon/MyTemplatesRowNameWrapper/MyTemplatesRowNameWrapper"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"
import { useDispatch, useSelector } from 'react-redux';
import { setNoticeOfApplicationData, activRightContent, setActiveRow, actionLkData, nameRowData, setUpdateLeftContent, updateLeftContent, setAssignAcarClickAuto, setCancelApplications,setCancelApplicationsObj, cancelApplicationsObj, cancelApplicationsData } from "../../store/reduser";
import { useState, useEffect } from "react"
import ApplicationsCard from "../Applications/ApplicationsCard/ApplicationsCard"
import EditMyTemplates from "../EditMyTemplates/EditMyTemplates"
import Datepicker from "../AreCommon/Datepicker/Datepicker"
import { url } from "../../../core/core"
import Ellipsis from "../AreCommon/Ellipsis/Ellipsis"
import ButtonCustom from "../AreCommon/ButtonCustom/ButtonCustom"
import ShowMore from "../AreCommon/ShowMore/ShowMore"

export default function MyTemplates({setTabName}) {
  const [dataInput, setDataInput] = useState({})
  const [switchArrow, setSwitchArrow] = useState({arrow: ''})
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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAssignAcarClickAuto({driver: '', telephone: '', marc: '', gossNumber: ''}))
  }, [cancelApplications])

  function clickEllipsis() {
    setEllipsisOpen(!ellipsisOpen)
  }

  function addDispFunc() {
    dispatch(setActiveRow(activRight.addMyTemplates))
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
    if(dispCardOpen) setTabName(nameRowDataLabel.myTemplatesCard)
    else setTabName(nameRowDataLabel.myTemplates)
  }

  function dispCardOpenHideTwo(data = {}) {
    companyCardDataSend(data)
    setDispCardOpen(!dispCardOpen)
    if(dispCardOpen) setTabName(nameRowDataLabel.myTemplatesCard)
    else setTabName(nameRowDataLabel.myTemplates)
  }

  function companyCardDataSend(data = {}) {
    setCompanyCardData(data)
  }

  function editDisp(data = {}) {
    setBackDisp(n => n + 1)
    companyCardDataSend(data)
    setDispCardEdit(!dispCardEdit)
    if(dispCardEdit) setTabName(nameRowDataLabel.editMyTemplates)
    else setTabName(nameRowDataLabel.myTemplates)
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

  function refresh() {
    setUpdateLeftContent(Math.random())
    setRefreshData(!refreshData)
    location.reload() 
  }


  function editApplications() {
    let lengthData = Object.keys(uploadingData).length
    
    if(lengthData == 1) {
      for(let key in uploadingData) {
        let numberDate = uploadingData[key]['dateOfApplication']
        let dateOf = new Date()
        let dateToday = new Date()
        dateOf.setFullYear(numberDate[6] + numberDate[7] + numberDate[8] + numberDate[9]);
        dateOf.setMonth((Number(numberDate[3] + numberDate[4])) - 1);
        dateOf.setDate(numberDate[0] + numberDate[1]);
        let dateTime = dateOf.getTime() >= dateToday.getTime()

        // if(dateTime) {
          if(uploadingData[key]['status'] == 'Новая') {
            editDisp(uploadingData[key])
          } else alert('Нельзя редактировать отмененные или назначенные заявки')
        // } else alert('Нельзя редактировать прошедшие заявки')
      }

    } else if(lengthData > 1) {
      alert('Выберете только один чекбокс')
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

  const delay = ms => new Promise(res => setTimeout(res, ms));

  function trashAppNo(item) {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({trashTemplates: item.id})
    
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

  async function trashTemplates() {
    let lengthData = Object.keys(uploadingData).length
    
    if(lengthData >= 1) {
      setTrashReload(false)

      for(let key in uploadingData) {
        await delay(200)

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

  function testApp() {
    console.log(uploadingData)
  }
  

  return(
    <>
      {dispCardEdit ? '' : <EditMyTemplates editDisp={editDisp} companyCardData={companyCardData} setUploadingData={setUploadingData}/>}
      <div className={dispCardEdit ? '' : 'disp-wrapper-hide' }>
        <div className={dispCardOpen ? 'disp-wrapper' : 'disp-wrapper-hide' }>
          <div className="disp-row">
            <div className="disp-row-menu">
              <ButtonAdd addFunc={addDispFunc}/>
              <div className={ellipsisOpen ? 'applications-rowUp-hide' : 'applications-rowUp'}>
                <ButtonCustom addFunc={refresh} buttonImg={'refresh'}/>
                <ButtonCustom addFunc={editApplications} buttonImg={'edit'}/>
                <ButtonCustom addFunc={trashTemplates} buttonImg={'trash'}/>
              </div>
              <Ellipsis handleClick={clickEllipsis}/>
              {ellipsisOpen ? <SearchData dataInputOnChange={dataInputOnChange} name={'searchData'}/> : ''}
              <Datepicker placeHolder={'Период создания'} name={'calendarAppCreate'} dataInputOnChange={dataInputOnChange}/>
            </div>
            <div>
              <ListDataNumber setShowMoreActiv={setShowMoreActiv}/>
            </div>
          </div>
          <div className="disp-row-name-wrapper myApplications-row-name-wrapper">
            <MyTemplatesRowNameWrapper checkNumber={Object.keys(uploadingData).length} setSwitchArrow={setSwitchArrow}/>
            {
            trashReload 
            ?
             ((dispCardEdit && cancelApplicationsOpen == false) ? 
             <WrapperContentCentr label="Записей не найдено. Добавьте новый шаблон" actionLk={actionLk.getMyTemplates} count={showMoreActiv} companyCardOpenHide={dispCardOpenHide} setDispCardEdit={editDisp} backDisp={backDisp} showMoreActiv={showMoreActiv} trashDisp={trashDisp} refreshData={refresh} setUploadingData={setUploadingData} dispCardEditNoUpdatePage={dispCardEdit} sort={dataInput} switchArrow={switchArrow}/>
             : '') 
            : 
             ''
            }
          </div>
          <div>
            <ShowMore label={'Показать еще'} click={showMoreActivClick}/>
          </div>
        </div>
      </div>
    </>
  )
}