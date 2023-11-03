import img from './image/x.png'
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData, nameRowData, setUpdateLeftContent, updateLeftContent, assignAcarData, setAssignAcar, applicationsToassignAcarData, setAssignAcarClickAuto } from "../../store/reduser";
import { useState, useEffect } from "react"
import { url } from "../../../core/core"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import Datepicker from "../AreCommon/Datepicker/Datepicker"
import AssignAcarRowNameWrapper from "../AreCommon/AssignAcarRowNameWrapper/AssignAcarRowNameWrapper"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"

export default function AssignAcarCard() {
  const [showMoreActiv, setShowMoreActiv] = useState(10)
  const [dateOfApplication, setDateOfApplication] = useState('')
  const [submissionTime, setSubmissionTime] = useState('')
  const [timeOfUseOfTransport, setTimeOfUseOfTransport] = useState('')

  const dispatch = useDispatch()
  let assignAcar = useSelector(assignAcarData)
  let applicationsToassignAcarDate = useSelector(applicationsToassignAcarData)
  let actionLk = useSelector(actionLkData)

  let endTime = dateApplications(dateOfApplication, submissionTime, timeOfUseOfTransport)

  useEffect(() => {
    setDateOfApplication(applicationsToassignAcarDate.date.dateOfApplication)
    setSubmissionTime(applicationsToassignAcarDate.date.submissionTime)
    setTimeOfUseOfTransport(applicationsToassignAcarDate.date.timeOfUseOfTransport)
  }, [assignAcar, applicationsToassignAcarDate])

  function dateApplications(number, numberHours, timeOfUseOfTransport) {
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
  
    return `${hours}:00`
  }

  function close() {
    dispatch(setAssignAcar(false))
  }

  function clickAuto(data) {
    dispatch(setAssignAcar(false))
    dispatch(setAssignAcarClickAuto(data))
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
              <SearchData />
              <SelectData namePlaceholder={'Выбрать марку'} nameArr={['test1','test2','test3','test4','test5']} name={'assignAcarCard-search'} dataInputOnChange={() => {}}/>
              <Datepicker placeHolder={'Свободные авто за период'} width={true}/>
            </div>
            <div>
              <ListDataNumber setShowMoreActiv={setShowMoreActiv}/>
            </div>
          </div>
          <div className="assignAcarCard-row-name-wrapper">
            <AssignAcarRowNameWrapper dateOfApplication={dateOfApplication}/>
            <WrapperContentCentr label="" actionLk={actionLk.getAssignACar} count={showMoreActiv} margin={true} clickAuto={clickAuto}/>
          </div>
        </div>
      </div>
    </div>
  )
}