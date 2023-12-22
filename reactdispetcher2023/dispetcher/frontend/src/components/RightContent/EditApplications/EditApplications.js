import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput";
import AddRowNameInputArrow from "../AreCommon/AddRowNameInputArrow/AddRowNameInputArrow";
import AddRowNameDate from "../AreCommon/AddRowNameDate/AddRowNameDate";
import AddRowNameSelectTime from "../AreCommon/AddRowNameSelectTime/AddRowNameSelectTime";
import { useState, useEffect } from "react";
import ButtonCreate from "../AreCommon/ButtonCreate/ButtonCreate";
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation";
import ButtonDownloadFile from "../AreCommon/ButtonDownloadFile/ButtonDownloadFile";
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, setSelectSubdivision, setUpdateLeftContent, userDataStore, setAssignAcar, setApplicationsToassignAcar, assignAcarClickAutoData, setAssignAcarClickAuto } from "../../store/reduser";
import { url } from '../../../core/core';
import { arrDate } from '../../../core/core';
import dateApplicationsHours from "../../../core/dateApplicationsHours";
import AddRowNameSelectAuto from "../AreCommon/AddRowNameSelectAuto/AddRowNameSelectAuto";

export default function EditApplications({editDisp, companyCardData, setUploadingData}) {
  let activRight = useSelector(activRightContent)
  let userData = useSelector(userDataStore)
  let assignAcarClickAuto = useSelector(assignAcarClickAutoData)
  const dispatch = useDispatch()
  const [dataInput, setDataInput] = useState({})
  const [arrGroup, setArrGroup] = useState([])
  const [valueInput, setValueInput] = useState('');
  const [arrPassengers, setArrPassengers] = useState([])
  const [fileData, setFileData] = useState(null);
  
  useEffect(() => {
    if(companyCardData.dirFiles) {
      setFileData(JSON.parse(companyCardData.dirFiles))
    }
    
    if((assignAcarClickAuto.driver != undefined && assignAcarClickAuto.telephone != undefined) && (assignAcarClickAuto.driver != '' && assignAcarClickAuto.telephone != '')) {

    setDataInput({...dataInput, driverPhone: `${assignAcarClickAuto.driver} - ${assignAcarClickAuto.telephone}`, telephone: assignAcarClickAuto.telephone, marc: assignAcarClickAuto.marc, gossNumber: assignAcarClickAuto.gossNumber, view: assignAcarClickAuto.view, theCarIsBusyAtThisTime: {id: assignAcarClickAuto.id, dateAssign: assignAcarClickAuto.dateAssign, emailUserCreate: dataInput.emailUserCreate, driverPhone: `${assignAcarClickAuto.driver} - ${assignAcarClickAuto.telephone}`, marc: assignAcarClickAuto.marc, gossNumber: assignAcarClickAuto.gossNumber, submissionTime: dataInput.submissionTime, timeOfUseOfTransport: dataInput.timeOfUseOfTransport}})

    } else {
      let namePassengers = {}
      let passengersPhone = {}

      if(companyCardData.namePassengers) {
        namePassengers = JSON.parse(companyCardData.namePassengers)

        for(let key in namePassengers) {
          companyCardData[key] = namePassengers[key]
        }

        delete companyCardData.namePassengers
      }

      if(companyCardData.passengersPhone) {
        passengersPhone = JSON.parse(companyCardData.passengersPhone)

        for(let key in passengersPhone) {
          companyCardData[key] = passengersPhone[key]
        }

        delete companyCardData.passengersPhone
      }

      setDataInput({...companyCardData, filesNameFront: companyCardData.dirFiles})
    }

  }, [assignAcarClickAuto])

  function cancellation() { 
    editDisp()
    dispatch(setAssignAcarClickAuto({driver: '', telephone: '', marc: '', gossNumber: ''}))
    setDataInput({...dataInput, theCarIsBusyAtThisTime: {}})
  }

  function dataInputJson() {
    for(let key in dataInput) {
      let val = key.split('-')
      val = val[0]

      if(val == 'namePassengers' && key != 'namePassengers') {
        dataInput.namePassengers = {...dataInput.namePassengers, [key]: dataInput[`${key}`]}
        

      } else if(val == 'passengersPhone' && key != 'passengersPhone') {
        dataInput.passengersPhone = {...dataInput.passengersPhone, [key]: dataInput[`${key}`]}
      }
    }

    for(let key in dataInput) {
      if(key == 'namePassengers') {
        dataInput.namePassengers = JSON.stringify(dataInput['namePassengers'])

      } else if(key == 'passengersPhone') {
        dataInput.passengersPhone = JSON.stringify(dataInput['passengersPhone'])
      }
    }
  }

  function dataInputBack() {
    let saveApplicationCounter = false

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

      //console.log(dataInput)
      
      if(dateTime) {
        if(submissionTime >= 8 && submissionTime <= 20) {
          if(cancelTime <= 21 && cancelTime >= 8 && Number(dataInput.timeOfUseOfTransport) <= 13) {
            if(dataInput.theCarIsBusyAtThisTime) {

              saveApplicationCounter = true

              fetch(url.urlBack1, {
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({mailToAutoUser: dataInput.theCarIsBusyAtThisTime})
              
                })
                .then(data => {
                  return data.text()
                })
                .then(data => {
                  if(data != 'null') {
                    //console.log(data)
                  } else {
                    
                  }
                })
                .catch((er) => {
                  console.log(er)
                })

              fetch(url.urlBack1, {
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({theCarIsBusyAtThisTime: dataInput.theCarIsBusyAtThisTime})
              
                })
                .then(data => {
                  return data.text()
                })
                .then(data => {
                  if(data != 'null') {
                    //console.log(data)
                    data = JSON.parse(data)
                    //console.log(data)
                    
                    if(data) {
                      let freeTime = JSON.parse(data.freeTime)
                      let thisTime = dataInput.theCarIsBusyAtThisTime.dateAssign
                      let counter = 0
      
                      for(let key in freeTime) {
                        if(counter != 0) break
                        for(let key2 in thisTime) {
                          if(key2 == key) {
                            let obj = {...freeTime[`${key}`], ...thisTime[`${key2}`]}
                            freeTime = {...freeTime, [key]: obj}
                            counter++
                          }
                        }
                      }
      
                      if(counter == 0) {
                        freeTime = {...freeTime, ...thisTime}
                      }

                      for(let key in freeTime) {
                        if(Object.keys(freeTime[key]).length == 0) {
                          delete freeTime[key]
                        }
                      }
      
                      fetch(url.urlBack1, {
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify({freeTime: [dataInput.theCarIsBusyAtThisTime.id, freeTime]})
                      
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
                  
                  } else {
                    
                  }
            
                })
                .catch((er) => {
                  console.log(er)
                })
            }
      
            if(((dataInput.dateOfApplication == companyCardData.dateOfApplication && dataInput.submissionTime == companyCardData.submissionTime && dataInput.timeOfUseOfTransport == companyCardData.timeOfUseOfTransport) || saveApplicationCounter == true) || companyCardData.status == 'Новая') {

              dataInputJson()
              document.getElementById('buttonDownloadFileSubmit').click()

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
                    setDataInput({...dataInput, theCarIsBusyAtThisTime: {}})
                  }
            
                })
                .catch((er) => {
                  console.log(er)
                })
            } else {
              alert('После изменения времени использования, нужно назначить автомобиль')
            }
            

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

  function assignAcar() {
    dispatch(setAssignAcar(true))
    dispatch(setApplicationsToassignAcar({date: {dateOfApplication: dataInput.dateOfApplication, submissionTime: dataInput.submissionTime, timeOfUseOfTransport: dataInput.timeOfUseOfTransport, gossNumber: dataInput.gossNumber, old: {dateOfApplication: companyCardData.dateOfApplication, submissionTime: companyCardData.submissionTime, timeOfUseOfTransport: companyCardData.timeOfUseOfTransport, gossNumber: companyCardData.gossNumber}}}))
  }

  function sub(event) {
    event.preventDefault()

    let form = new FormData(document.getElementById('formElem'))
    // form.append('dataFileFront', document.getElementById('formElem'))
    // form.append('dir', numberDir)

    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'multipart/form-data',
      },
      body: form
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        if(data != 'null' && data != '') {
          console.log(data)
        } else {
            
        }
  
      })
      .catch((er) => {
        console.log(er)
      })
  }

  function downloadFiles(event) {
    let err = true
    let obj = event.target.files
    
    for(let key in obj) {
     
      if(obj[key]['size'] >= 10000000) {
        err = false
      }
    }

    if(err) {
      setFileData(event.target.files)
      setDataInput(n => {
        let arr = {}
        let obj = event.target.files
        let count = 0
        for(let key in obj) {
          count++
          if(obj[key]['name'] && obj[key]['name'] != 'item') {
            arr[count] = {'name': obj[key]['name']}
          }
        }

        return {...n, filesNameFront: JSON.stringify(arr)}
      })

    } else alert('Файлы не должны превышать 10мб')
  }

  function objToArr(obj) {
    let arr = []
    for(let key in obj) {
      if(obj[key]['name']) {
        arr.push(obj[key]['name'])
      }
    }

    return arr
  }

  function testApp() {
    console.log(dataInput)
    
  }

  return(
    <>
      <div className="addApplications-wrap">
        <div className="addDisp-wrap addApplications-margin">
          <AddRowNameDate dataName={'Дата подачи*'} name={'dateOfApplication'} dataInputOnChange={dataInputOnChangeDate} defaultValue={companyCardData.dateOfApplication}/>
          <AddRowNameSelectTime dataName={'Время подачи*'} name={'submissionTime'} dataInputOnChange={dataInputOnChange} arrData={arrDate} defaultValue={companyCardData.submissionTime}/>
          <AddRowNameInput dataName={'Адрес подачи*'} placeholder={''} name={'submissionAddress'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.submissionAddress}/>
          <AddRowNameInput dataName={'Адрес прибытия*'} placeholder={''} name={'arrivalAddress'} dataInputOnChange={dataInputOnChange} type={'text'} defaultValue={companyCardData.arrivalAddress}/>
          <AddRowNameSelectAuto dataName={'Поездка с ожиданием*'} placeholder={'Выберите значение'} name={'rideWithAnticipation'} dataInputOnChange={dataInputOnChange} arrData={['Да', 'Нет']} defaultValue={companyCardData.rideWithAnticipation}/>
          <AddRowNameInput dataName={'Водитель, тел'} placeholder={'Заполняется автоматически при подборе автомобиля'} name={'driverPhone'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={dataInput.driverPhone}/>
          <AddRowNameInput dataName={'Марка, модель'} placeholder={'Заполняется автоматически при подборе автомобиля'} name={'marc'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={dataInput.marc}/>
          <AddRowNameInput dataName={'Государственный номер'} placeholder={'Заполняется автоматически при подборе автомобиля'} name={'gossNumber'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={dataInput.gossNumber}/>
          <AddRowNameInput dataName={'Введите краткий комментарий к заявке'} placeholder={'Введите текст (до 150 знаков)'} name={'comment'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.comment}/>
        </div>
        <div className="addDisp-wrap">
        <AddRowNameInputArrow dataName={'Время использования транспорта (часы)*'} placeholder={''} name={'timeOfUseOfTransport'} dataInputOnChange={dataInputOnChangeDate} defaultValue={0} number={13} value={companyCardData.timeOfUseOfTransport} setArrPassengers={() => {}} minutes={true}/>
          <AddRowNameSelectAuto dataName={'Цель поездки*'} placeholder={'Выберите значение'} name={'purposeOfTheTrip'} dataInputOnChange={dataInputOnChange} arrData={['Подписание документа', 'Что то еще']} defaultValue={companyCardData.purposeOfTheTrip}/>
          <AddRowNameInput dataName={'Инициатор заявки*'} placeholder={''} name={'applicationInitiator'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={companyCardData.applicationInitiator}/>
          <AddRowNameInput dataName={'Должность'} placeholder={''} name={'jobTitle'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={companyCardData.jobTitle}/>
          <AddRowNameInput dataName={'Подразделение'} placeholder={''} name={'subdivision'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={companyCardData.subdivision}/>
          <AddRowNameInput dataName={'Телефон инициатора*'} placeholder={''} name={'initiatorPhone'} dataInputOnChange={dataInputOnChange} readOnli={true} defaultValue={companyCardData.initiatorPhone}/>
          <AddRowNameSelectAuto dataName={'Класс (тип) автомобиля*'} placeholder={'Выберите значение'} name={'carClass'} dataInputOnChange={dataInputOnChange} arrData={['Бизнес класс', 'Средний класс', 'Низкий класс']} defaultValue={companyCardData.carClass}/>
          <AddRowNameInputArrow dataName={'Количество пассажиров'} placeholder={''} name={'numberOfPassengers'} dataInputOnChange={dataInputOnChangeDate} defaultValue={0} number={5} value={companyCardData.numberOfPassengers} setArrPassengers={setArrPassengers}/>
          {
            arrPassengers.map((item, index) => {
              return (
                <div key={index}>
                  <AddRowNameInput dataName={'ФИО пассажира'} placeholder={''} name={`namePassengers-${index + 1}`} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData[`namePassengers-${index + 1}`]}/>
                  <AddRowNameInput dataName={'Телефон пассажира'} placeholder={''} name={`passengersPhone-${index + 1}`} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData[`passengersPhone-${index + 1}`]}/>
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
        <ButtonDownloadFile name={'Выбрать файл'} cancellation={downloadFiles} sub={sub}/>
        <div className="addApplications-file-wrap">
          {
            objToArr(fileData).map((item, index) => {
              if(item != 'item') {
                return(
                  <div className="addApplications-file-wrap-border" key={index}>{item}</div>
                )
              }
            })
          }
        </div>
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