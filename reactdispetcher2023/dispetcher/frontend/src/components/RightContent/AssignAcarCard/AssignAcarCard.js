import img from './image/x.png'
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateLeftContent, setActiveRow, actionLkData, nameRowData, updateLeftContent, assignAcarData, setAssignAcar, applicationsToassignAcarData, setAssignAcarClickAuto } from "../../store/reduser";
import { useState, useEffect } from "react"
import { url } from "../../../core/core"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import Datepicker from "../AreCommon/Datepicker/Datepicker"
import AssignAcarRowNameWrapper from "../AreCommon/AssignAcarRowNameWrapper/AssignAcarRowNameWrapper"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"

export default function AssignAcarCard() {
  const [groupArr, setGroup] = useState([])
  const [switchArrow, setSwitchArrow] = useState({arrow: ''})
  const [dataInput, setDataInput] = useState({})
  const [showMoreActiv, setShowMoreActiv] = useState(10)
  const [dateOfApplication, setDateOfApplication] = useState('')
  const [submissionTime, setSubmissionTime] = useState('')
  const [timeOfUseOfTransport, setTimeOfUseOfTransport] = useState('')
  const [dateOfApplicationOld, setDateOfApplicationOld] = useState('')
  const [submissionTimeOld, setSubmissionTimeOld] = useState('')
  const [timeOfUseOfTransportOld, setTimeOfUseOfTransportOld] = useState('')
  const [reload, setReload] = useState(true)

  const dispatch = useDispatch()
  let assignAcar = useSelector(assignAcarData)
  let applicationsToassignAcarDate = useSelector(applicationsToassignAcarData)
  let actionLk = useSelector(actionLkData)

  let endTime = dateApplications(dateOfApplication, submissionTime, timeOfUseOfTransport)
  let endTimeOld = dateApplications(dateOfApplicationOld, submissionTimeOld, timeOfUseOfTransportOld)

  useEffect(() => {
    backDataGroup()
    
    setDateOfApplication(applicationsToassignAcarDate.date.dateOfApplication)
    setSubmissionTime(applicationsToassignAcarDate.date.submissionTime)
    setTimeOfUseOfTransport(applicationsToassignAcarDate.date.timeOfUseOfTransport)
    setDateOfApplicationOld(applicationsToassignAcarDate.date.old.dateOfApplication)
    setSubmissionTimeOld(applicationsToassignAcarDate.date.old.submissionTime)
    setTimeOfUseOfTransportOld(applicationsToassignAcarDate.date.old.timeOfUseOfTransport)
  }, [assignAcar, applicationsToassignAcarDate, reload])

  function divideArr(arrData) {
    let group = []
    for(let i = 0; i < arrData.length; i++) {
      group.push(arrData[i].marc)
    }
    group = [...new Set(group)]
    group.unshift('Выбрать марку')
    setGroup(group)
  }

  function backDataGroup() {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({'getMarcAuto': true})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        data = JSON.parse(data)
        divideArr(data)
      })
      .catch((er) => {
        console.log(er)
      })
  }

  function dateApplications(number, numberHours, timeOfUseOfTransport) {
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

  function close() {
    dispatch(setAssignAcar(false))
    dispatch(setUpdateLeftContent(Math.random()))
    setReload(!reload)
  }

  function clickAuto(dataAuto) {
    if(applicationsToassignAcarDate.date.gossNumber) {
    
      fetch(url.urlBack1, {
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({trashApplicationsYes: [applicationsToassignAcarDate.date.gossNumber, {[dateOfApplicationOld]: {[submissionTimeOld]: endTimeOld}}]})
      
        })
        .then(data => {
          return data.text()
        })
        .then(data => {
          if(data != 'null') {
            console.log(data)
          } else {
            dispatch(setAssignAcar(false))
            dispatch(setUpdateLeftContent(Math.random()))
            dispatch(setAssignAcarClickAuto({...dataAuto, dateAssign: {[dateOfApplication]: {[submissionTime]: endTime}}}))
            setReload(!reload)


            setTimeout(() => {
              document.querySelector('.buttonCreate-wrap').click()
            }, 50)
          }
        })
        .catch((er) => {
          console.log(er)
        })
    } else {
      dispatch(setAssignAcar(false))
      dispatch(setUpdateLeftContent(Math.random()))
      dispatch(setAssignAcarClickAuto({...dataAuto, dateAssign: {[dateOfApplication]: {[submissionTime]: endTime}}}))
      setReload(!reload)


      setTimeout(() => {
        document.querySelector('.buttonCreate-wrap').click()
      }, 50)
    }

  }

  function dataInputOnChange(event, inputData = false) { 
    if(!inputData) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setDataInput(n => ({...n, [name]: value.trim()}))
    } else {
      setDataInput(n => ({...n, [inputData[0]]: (inputData[1]).trim()}))
    }
  }

  return(
    <div className={assignAcar ? "assignAcarCard-wrap" : "assignAcarCard-hide"}>
      <div className="assignAcarCard-data">
        <div className="assignAcarCard-field">
          <div className="assignAcarCard-row">
            <div>
              <span>
                {`Выберите авто для работы с заявкой на ${dateOfApplication} с ${submissionTime} по ${endTime}`}
              </span>
            </div>
            <div>
              <img src={img} alt="" onClick={close}/>
            </div>
          </div>
          <div className="assignAcarCard-field-row">
            <div className="assignAcarCard-field-row-menu">
              <SearchData dataInputOnChange={dataInputOnChange} name={'searchData'}/>
              <SelectData namePlaceholder={'Выбрать марку'} nameArr={groupArr} name={'autoMarc'} dataInputOnChange={dataInputOnChange}/>
              <Datepicker placeHolder={'Свободные авто за период'} width={true} name={'calendarAutoDate'} dataInputOnChange={dataInputOnChange}/>
            </div>
            <div>
              <ListDataNumber setShowMoreActiv={setShowMoreActiv}/>
            </div>
          </div>
          <div className="assignAcarCard-row-name-wrapper">
            <AssignAcarRowNameWrapper dateOfApplication={dateOfApplication} setSwitchArrow={setSwitchArrow}/>
            <WrapperContentCentr label="" actionLk={actionLk.getAssignACar} count={showMoreActiv} margin={true} clickAuto={clickAuto} arrAssign={[dateOfApplication, submissionTime, endTime]} sort={dataInput} switchArrow={switchArrow}/>
          </div>
        </div>
      </div>
    </div>
  )
}