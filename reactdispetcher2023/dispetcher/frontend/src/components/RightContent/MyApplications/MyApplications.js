import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import MyApplicationsRowNameWrapper from "../AreCommon/MyApplicationsRowNameWrapper/MyApplicationsRowNameWrapper"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData, nameRowData, setUpdateLeftContent, updateLeftContent, setAssignAcarClickAuto, setCancelApplications,setCancelApplicationsObj, cancelApplicationsObj } from "../../store/reduser";
import { useState, useEffect } from "react"
import ApplicationsCard from "../Applications/ApplicationsCard/ApplicationsCard"
import EditMyApplications from "../EditMyApplications/EditMyApplications"
import Datepicker from "../AreCommon/Datepicker/Datepicker"
import { url } from "../../../core/core"
import Ellipsis from "../AreCommon/Ellipsis/Ellipsis"
import ButtonCustom from "../AreCommon/ButtonCustom/ButtonCustom"

export default function MyApplications({setTabName}) {
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
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  let nameRowDataLabel = useSelector(nameRowData)
  let cancelApplications = useSelector(cancelApplicationsObj)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAssignAcarClickAuto({driver: '', telephone: '', marc: '', gossNumber: ''}))
  }, [cancelApplications])

  function clickEllipsis() {
    setEllipsisOpen(!ellipsisOpen)
  }

  function addDispFunc() {
    dispatch(setActiveRow(activRight.addMyApplications))
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
    if(dispCardOpen) setTabName(nameRowDataLabel.MyApplicationsCard)
    else setTabName(nameRowDataLabel.myApplications)
  }

  function dispCardOpenHideTwo(data = {}) {
    companyCardDataSend(data)
    setDispCardOpen(!dispCardOpen)
    if(dispCardOpen) setTabName(nameRowDataLabel.MyApplicationsCard)
    else setTabName(nameRowDataLabel.myApplications)
  }

  function companyCardDataSend(data = {}) {
    setCompanyCardData(data)
  }

  function editDisp(data = {}) {
    setBackDisp(n => n + 1)
    companyCardDataSend(data)
    setDispCardEdit(!dispCardEdit)
    if(dispCardEdit) setTabName(nameRowDataLabel.editMyApplications)
    else setTabName(nameRowDataLabel.myApplications)
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
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({trashApplicationsYes: gossNumber})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        if(data != 'null') {
          data = JSON.parse(JSON.parse(data))

          for(let key in data) {
            for(let key2 in item) {
              if(key == key2) {
                for(let key3 in item[key2]) {
                  for(let key4 in data[key]) {
                    if(key3 == key4) {
                      delete data[key][key4]
                    }
                  }
                }
              }
            }
          }
          
          fetch(url.urlBack1, {
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({trashApplicationsYesFreeTime: [JSON.stringify(data), gossNumber]})
          
            })
            .then(data => {
              return data.text()
            })
            .then(data => {
              if(data != 'null') {
                console.log(data)
              } else {
                
              }
            })
            .catch((er) => {
              console.log(er)
            })

        } else {
          
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
    date.setMinutes(0);
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
  
    return `${hours}:00}`
  }

  function refresh() {
    setUpdateLeftContent(Math.random())
    setRefreshData(!refreshData)
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

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

        if(dateTime) {
          if(uploadingData[key]['status'] == 'Новая') {
            editDisp(uploadingData[key])
          } else alert('Нельзя редактировать отмененные или назначенные заявки')
        } else alert('Нельзя редактировать прошедшие заявки')
      }

    } else alert('Выберете хотя бы один чекбокс')
  }

  async function trashApplications() {
    // console.log(uploadingData)
    let lengthData = Object.keys(uploadingData).length
    
    if(lengthData >= 1) {
      for(let key in uploadingData) {
        await delay(100)
        if(/*uploadingData[key]['status'] != 'Назначена'*/ false) {
          trashAppNo(uploadingData[key])
          setUploadingData(n => {
            delete n[key]
            return n
          })
        } else {
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
        }
        
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

  

  return(
    <>
      {dispCardEdit ? '' : <EditMyApplications editDisp={editDisp} companyCardData={companyCardData} setUploadingData={setUploadingData}/>}
      <ApplicationsCard dispCardOpen={dispCardOpen} dispCardOpenHide={dispCardOpenHideTwo} dispCardData={companyCardData}/>
      <div className={dispCardEdit ? '' : 'disp-wrapper-hide' }>
        <div className={dispCardOpen ? 'disp-wrapper' : 'disp-wrapper-hide' }>
          <div className="disp-row">
            <div className="disp-row-menu">
              <ButtonAdd addFunc={addDispFunc}/>
              <div className={ellipsisOpen ? 'applications-rowUp-hide' : 'applications-rowUp'}>
                <ButtonCustom addFunc={refresh} buttonImg={'refresh'}/>
                <ButtonCustom addFunc={editApplications} buttonImg={'edit'}/>
                {/* <ButtonCustom addFunc={trashApplications} buttonImg={'trash'}/> */}
                <ButtonCustom addFunc={cancelFunc} buttonImg={'cancel'}/>
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
            <MyApplicationsRowNameWrapper />
            <WrapperContentCentr label="Записей не найдено. Добавьте новую заявку" actionLk={actionLk.getApplicationsData} count={showMoreActiv} companyCardOpenHide={dispCardOpenHide} setDispCardEdit={editDisp} backDisp={backDisp} showMoreActiv={showMoreActiv} trashDisp={trashDisp} refreshData={refresh} setUploadingData={setUploadingData} />
          </div>
        </div>
      </div>
    </>
  )
}