import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput";
import AddRowNameDate from "../AreCommon/AddRowNameDate/AddRowNameDate";
import AddRowNameTime from "../AreCommon/AddRowNameTime/AddRowNameTime";
import { useState, useEffect } from "react";
import ButtonCreate from "../AreCommon/ButtonCreate/ButtonCreate";
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation";
import ButtonDownloadFile from "../AreCommon/ButtonDownloadFile/ButtonDownloadFile";
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, setSelectSubdivision, setUpdateLeftContent, userDataStore, setAssignAcar, setApplicationsToassignAcar, assignAcarClickAutoData, setAssignAcarClickAuto } from "../../store/reduser";
import { url } from '../../../core/core';
import AddRowNameSelectAuto from "../AreCommon/AddRowNameSelectAuto/AddRowNameSelectAuto";

export default function EditApplications({editDisp, companyCardData, setUploadingData}) {
  let activRight = useSelector(activRightContent)
  let userData = useSelector(userDataStore)
  let assignAcarClickAuto = useSelector(assignAcarClickAutoData)
  const dispatch = useDispatch()
  const [dataInput, setDataInput] = useState({})
  const [arrGroup, setArrGroup] = useState([])
  const [valueInput, setValueInput] = useState('');

  
  useEffect(() => {
    // console.log(assignAcarClickAuto)
    // console.log('EditApplications')
    
    if((assignAcarClickAuto.driver != undefined && assignAcarClickAuto.telephone != undefined) && (assignAcarClickAuto.driver != '' && assignAcarClickAuto.telephone != '')) {
      setDataInput({...companyCardData, driverPhone: `${assignAcarClickAuto.driver} - ${assignAcarClickAuto.telephone}`, telephone: assignAcarClickAuto.telephone, marc: assignAcarClickAuto.marc, gossNumber: assignAcarClickAuto.gossNumber, view: assignAcarClickAuto.view})

    } else {
      // setDataInput({...companyCardData, driverPhone: '', telephone: assignAcarClickAuto.telephone, marc: assignAcarClickAuto.marc, gossNumber: assignAcarClickAuto.gossNumber})
      setDataInput(companyCardData)
    }

  }, [assignAcarClickAuto])

  function cancellation() { // переход в disp
    editDisp()
    dispatch(setAssignAcarClickAuto({driver: '', telephone: '', marc: '', gossNumber: ''}))
  }

  function dataInputBack() {

    if(((dataInput.dateOfApplication != undefined) && (dataInput.dateOfApplication != '')) && ((dataInput.submissionTime != undefined) && (dataInput.submissionTime != '')) && ((dataInput.submissionAddress != undefined) && (dataInput.submissionAddress != '')) && ((dataInput.arrivalAddress != undefined) && (dataInput.arrivalAddress != '')) && ((dataInput.rideWithAnticipation != undefined) && (dataInput.rideWithAnticipation != '')) && ((dataInput.timeOfUseOfTransport != undefined) && (dataInput.timeOfUseOfTransport != '') && (dataInput.timeOfUseOfTransport != 0)) && ((dataInput.purposeOfTheTrip != undefined) && (dataInput.purposeOfTheTrip != '')) && ((dataInput.carClass != undefined) && (dataInput.carClass != '')) && (isNaN(Number(dataInput.timeOfUseOfTransport)) != true) && (isNaN(Number(dataInput.numberOfPassengers)) != true)) {
      
      fetch(url.urlBack1, {
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({updateApplications: dataInput})
      
        })
        .then(data => {
          return data.text()
        })
        .then(data => {
          if(data != 'null') {
            console.log(data)
          } else {
            setUploadingData([{...dataInput}])
            cancellation()
            dispatch(setAssignAcarClickAuto({driver: '', telephone: '', marc: '', gossNumber: ''}))
          }
    
        })
        .catch((er) => {
          console.log(er)
        })

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

  function assignAcar() {
    dispatch(setAssignAcar(true))
    dispatch(setApplicationsToassignAcar({date: {dateOfApplication: companyCardData.dateOfApplication, submissionTime: companyCardData.submissionTime, timeOfUseOfTransport: companyCardData.timeOfUseOfTransport}}))
  }

  return(
    <>
      <div className="addApplications-wrap">
        <div className="addDisp-wrap addApplications-margin">
          <AddRowNameDate dataName={'Дата подачи*'} name={'dateOfApplication'} dataInputOnChange={dataInputOnChangeDate} defaultValue={companyCardData.dateOfApplication}/>
          <AddRowNameTime dataName={'Время подачи*'} name={'submissionTime'} dataInputOnChange={dataInputOnChangeDate} defaultValue={companyCardData.submissionTime}/>
          <AddRowNameInput dataName={'Адрес подачи*'} placeholder={''} name={'submissionAddress'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.submissionAddress}/>
          <AddRowNameInput dataName={'Адрес прибытия*'} placeholder={''} name={'arrivalAddress'} dataInputOnChange={dataInputOnChange} type={'text'} defaultValue={companyCardData.arrivalAddress}/>
          <AddRowNameSelectAuto dataName={'Поездка с ожиданием*'} placeholder={'Выберите значение'} name={'rideWithAnticipation'} dataInputOnChange={dataInputOnChange} arrData={['Да', 'Нет']} defaultValue={companyCardData.rideWithAnticipation}/>
          <AddRowNameInput dataName={'Водитель, тел'} placeholder={'Заполняется автоматически при подборе автомобиля'} name={'driverPhone'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={dataInput.driverPhone}/>
          <AddRowNameInput dataName={'Марка, модель'} placeholder={'Заполняется автоматически при подборе автомобиля'} name={'marc'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={dataInput.marc}/>
          <AddRowNameInput dataName={'Государственный номер'} placeholder={'Заполняется автоматически при подборе автомобиля'} name={'gossNumber'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={dataInput.gossNumber}/>
          <AddRowNameInput dataName={'Введите краткий комментарий к заявке'} placeholder={'Введите текст (до 150 знаков)'} name={'comment'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.comment}/>
        </div>
        <div className="addDisp-wrap">
          <AddRowNameInput dataName={'Время использования транспорта (часы)*'} placeholder={''} name={'timeOfUseOfTransport'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.timeOfUseOfTransport}/>
          <AddRowNameSelectAuto dataName={'Цель поездки*'} placeholder={'Выберите значение'} name={'purposeOfTheTrip'} dataInputOnChange={dataInputOnChange} arrData={['Подписание документа', 'Что то еще']} defaultValue={companyCardData.purposeOfTheTrip}/>
          <AddRowNameInput dataName={'Инициатор заявки*'} placeholder={''} name={'applicationInitiator'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={companyCardData.applicationInitiator}/>
          <AddRowNameInput dataName={'Должность'} placeholder={''} name={'jobTitle'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={companyCardData.jobTitle}/>
          <AddRowNameInput dataName={'Подразделение'} placeholder={''} name={'subdivision'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={companyCardData.subdivision}/>
          <AddRowNameInput dataName={'Телефон инициатора*'} placeholder={''} name={'initiatorPhone'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={companyCardData.initiatorPhone}/>
          <AddRowNameSelectAuto dataName={'Класс (тип) автомобиля*'} placeholder={'Выберите значение'} name={'carClass'} dataInputOnChange={dataInputOnChange} arrData={['Бизнес класс', 'Средний класс', 'Низкий класс']} defaultValue={companyCardData.carClass}/>
          <AddRowNameInput dataName={'Количество пассажиров'} placeholder={''} name={'numberOfPassengers'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.numberOfPassengers}/>
          <AddRowNameInput dataName={'ФИО пассажира'} placeholder={''} name={'namePassengers'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.namePassengers}/>
          <AddRowNameInput dataName={'Телефон пассажира'} placeholder={''} name={'passengersPhone'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.passengersPhone}/>
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
        <ButtonCreate name={'Сохранить'} dataInputBack={dataInputBack} img={false}/>
        <div className="addDisp-delimiter addApplications-delimiter"></div>
        <ButtonCancellation name={'Назначить машину'} cancellation={assignAcar} width={true}/>
        <div className="addDisp-delimiter addApplications-delimiter"></div>
        <ButtonCancellation name={'Отмена'} cancellation={cancellation}/>
      </div>
    </>
    
    
  )
}