import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput";
import AddRowNameInputArrow from "../AreCommon/AddRowNameInputArrow/AddRowNameInputArrow";
import AddRowNameDate from "../AreCommon/AddRowNameDate/AddRowNameDate";
import AddRowNameTime from "../AreCommon/AddRowNameTime/AddRowNameTime";
import { useState, useEffect } from "react";
import ButtonCreate from "../AreCommon/ButtonCreate/ButtonCreate";
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation";
import ButtonDownloadFile from "../AreCommon/ButtonDownloadFile/ButtonDownloadFile";
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, setSelectSubdivision, setUpdateLeftContent, userDataStore } from "../../store/reduser";
import { url } from '../../../core/core';
import dateApplicationsHours from "../../../core/dateApplicationsHours";
import AddRowNameSelect from "../AreCommon/AddRowNameSelect/AddRowNameSelect";

export default function AddApplications() {
  const [dataInput, setDataInput] = useState({})
  const [arrGroup, setArrGroup] = useState([])
  const [valueInput, setValueInput] = useState('');
  const [arrPassengers, setArrPassengers] = useState([])
  let activRight = useSelector(activRightContent)
  let userData = useSelector(userDataStore)
  const dispatch = useDispatch()
  

  useEffect(() => {
    let dateFull = new Date()
    let day = String(dateFull.getDate())
    let month = String(dateFull.getMonth())
    let hours = String(dateFull.getHours())
    let minutes = String(dateFull.getMinutes())
  
    if(day.length < 2) day = '0' + day
    if(month.length < 2) month = '0' + month
    if(hours.length < 2) hours = '0' + hours
    if(minutes.length < 2) minutes = '0' + minutes

    let date = `${day}.${month}.${dateFull.getFullYear()} ${hours}:${minutes}`

    setDataInput(n => ({...n, timeOfUseOfTransport: 1, numberOfPassengers: 0, applicationInitiator: userData.userName, jobTitle: userData.jobTitle, subdivision: userData.userSubdivision, initiatorPhone: userData.telephone, idDisp: userData.id, dateOfCreation: date, emailUserCreate: userData.email}))
  }, [userData])

  function cancellation() { // переход в disp
    dispatch(setActiveRow(activRight.applications))
    dispatch(setSelectSubdivision([]))
  }

  function dataInputBack() {
    if(((dataInput.dateOfApplication != undefined) && (dataInput.dateOfApplication != '')) && ((dataInput.submissionTime != undefined) && (dataInput.submissionTime != '')) && ((dataInput.submissionAddress != undefined) && (dataInput.submissionAddress != '')) && ((dataInput.arrivalAddress != undefined) && (dataInput.arrivalAddress != '')) && ((dataInput.rideWithAnticipation != undefined) && (dataInput.rideWithAnticipation != '')) && ((dataInput.timeOfUseOfTransport != undefined) && (dataInput.timeOfUseOfTransport != '') && (dataInput.timeOfUseOfTransport >= 1)) && ((dataInput.purposeOfTheTrip != undefined) && (dataInput.purposeOfTheTrip != '')) && ((dataInput.carClass != undefined) && (dataInput.carClass != '')) && (isNaN(Number(dataInput.timeOfUseOfTransport)) != true) && (isNaN(Number(dataInput.numberOfPassengers)) != true)) {

      let numberDate = dataInput.dateOfApplication
      let dateOf = new Date()
      let dateToday = new Date()
      dateOf.setFullYear(numberDate[6] + numberDate[7] + numberDate[8] + numberDate[9]);
      dateOf.setMonth((Number(numberDate[3] + numberDate[4])) - 1);
      dateOf.setDate(numberDate[0] + numberDate[1]);
      let dateTime = dateOf.getTime() >= dateToday.getTime()

      let submissionTime = dataInput.submissionTime
      submissionTime = Number(submissionTime[0] + submissionTime[1])

      let cancelTime = dateApplicationsHours(dataInput.dateOfApplication, dataInput.submissionTime, dataInput.timeOfUseOfTransport)

      
      if(dateTime) {
        if(submissionTime >= 9 && submissionTime <= 20) {
          if(cancelTime <= 21 && cancelTime >= 9 && Number(dataInput.timeOfUseOfTransport) <= 12) {
            fetch(url.urlBack1, {
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({dataInputApplications: dataInput})
            
              })
              .then(data => {
                return data.text()
              })
              .then(data => {
                if(data != 'null') {
                  console.log(data)
                } else {
                    dispatch(setUpdateLeftContent(Math.random()))
                    dispatch(setSelectSubdivision([]))
                    dispatch(setActiveRow(activRight.applications))
                }
              })
              .catch((er) => {
                console.log(er)
              })
            
          } else alert('Транспорт не может закончить работу после 21:00')
          
        } else {
          alert('Верно заполните поле "Время подачи"')
        }
        
      } else {
        alert('Верно заполните поле "Дата подачи"')
      }

    } else {
      alert('Верно заполните поля с *')
    }
  }


  function dataInputOnChange(event, inputData = false) { // данные из всех input
    if(!inputData) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setDataInput(n => ({...n, [name]: value.trim()}))
    } else {
      setDataInput(n => {
        setValueInput('')

        return ({...n, [inputData[0]]: (inputData[1]).trim()})
      })
    }
  }

  function dataInputOnChangeDate(data, name) {
    setDataInput(n => ({...n, [name]: data.trim()}))
  }

  return(
    <>
      <div className="addApplications-wrap">
        <div className="addDisp-wrap addApplications-margin">
          <AddRowNameDate dataName={'Дата подачи*'} name={'dateOfApplication'} dataInputOnChange={dataInputOnChangeDate} defaultValue={''}/>
          <AddRowNameTime dataName={'Время подачи*'} name={'submissionTime'} dataInputOnChange={dataInputOnChangeDate} defaultValue={''}/>
          <AddRowNameInput dataName={'Адрес подачи*'} placeholder={''} name={'submissionAddress'} dataInputOnChange={dataInputOnChange}/>
          <AddRowNameInput dataName={'Адрес прибытия*'} placeholder={''} name={'arrivalAddress'} dataInputOnChange={dataInputOnChange} type={'text'}/>
          <AddRowNameSelect dataName={'Поездка с ожиданием*'} placeholder={'Выберите значение'} name={'rideWithAnticipation'} dataInputOnChange={dataInputOnChange} arrData={['Да', 'Нет']}/>
          <AddRowNameInput dataName={'Водитель, тел'} placeholder={'Заполняется автоматически при подборе автомобиля'} name={'driverPhone'} dataInputOnChange={dataInputOnChange} readOnli={true}/>
          <AddRowNameInput dataName={'Марка, модель'} placeholder={'Заполняется автоматически при подборе автомобиля'} name={'marc'} dataInputOnChange={dataInputOnChange} readOnli={true}/>
          <AddRowNameInput dataName={'Государственный номер'} placeholder={'Заполняется автоматически при подборе автомобиля'} name={'gossNumber'} dataInputOnChange={dataInputOnChange} readOnli={true} />
          <AddRowNameInput dataName={'Введите краткий комментарий к заявке'} placeholder={'Введите текст (до 150 знаков)'} name={'comment'} dataInputOnChange={dataInputOnChange} />
        </div>
        <div className="addDisp-wrap">
        <AddRowNameInputArrow dataName={'Время использования транспорта (часы)*'} placeholder={''} name={'timeOfUseOfTransport'} dataInputOnChange={dataInputOnChangeDate} defaultValue={0} number={12} value={1} setArrPassengers={() => {}}/>
          <AddRowNameSelect dataName={'Цель поездки*'} placeholder={'Выберите значение'} name={'purposeOfTheTrip'} dataInputOnChange={dataInputOnChange} arrData={['Подписание документа', 'Что то еще']}/>
          <AddRowNameInput dataName={'Инициатор заявки*'} placeholder={''} name={'applicationInitiator'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={userData.userName}/>
          <AddRowNameInput dataName={'Должность'} placeholder={''} name={'jobTitle'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={userData.jobTitle}/>
          <AddRowNameInput dataName={'Подразделение'} placeholder={''} name={'subdivision'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={userData.userSubdivision}/>
          <AddRowNameInput dataName={'Телефон инициатора*'} placeholder={''} name={'initiatorPhone'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={userData.telephone}/>
          <AddRowNameSelect dataName={'Класс (тип) автомобиля*'} placeholder={'Выберите значение'} name={'carClass'} dataInputOnChange={dataInputOnChange} arrData={['Бизнес класс', 'Средний класс', 'Низкий класс']}/>
          <AddRowNameInputArrow dataName={'Количество пассажиров'} placeholder={''} name={'numberOfPassengers'} dataInputOnChange={dataInputOnChangeDate} defaultValue={0} number={5} value={0} setArrPassengers={setArrPassengers}/>
          {
            arrPassengers.map((item, index) => {
              return (
                <div key={index}>
                  <AddRowNameInput dataName={'ФИО пассажира'} placeholder={''} name={`namePassengers-${index + 1}`} dataInputOnChange={dataInputOnChange} />
                  <AddRowNameInput dataName={'Телефон пассажира'} placeholder={''} name={`passengersPhone-${index + 1}`} dataInputOnChange={dataInputOnChange} />
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="addApplications-file">
        <div className="addApplications-file-one">
          Прикрепите сопроводительный документ
        </div>
        <div className="addApplications-file-two">
          DOC или PDF, размер файла не более 10 МБ
        </div>
        <ButtonDownloadFile name={'Выбрать файл'} cancellation={() => {}}/>
      </div>
      <div className="addDisp-panell-button addApplications-flex">
        <ButtonCreate name={'Отправить'} dataInputBack={dataInputBack} img={false}/>
        <div className="addDisp-delimiter addApplications-delimiter"></div>
        <ButtonCancellation name={'Отмена'} cancellation={cancellation}/>
      </div>
    </>
    
    
  )
}