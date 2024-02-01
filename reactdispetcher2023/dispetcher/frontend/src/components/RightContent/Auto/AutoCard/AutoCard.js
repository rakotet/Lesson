import ButtonCancellation from "../../AreCommon/ButtonCancellation/ButtonCancellation"
import SearchData from '../../AreCommon/Search/SearchData'
import Datepicker from "../../AreCommon/Datepicker/Datepicker"
import DownloadReport from "../../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../../AreCommon/ListDataNumber/ListDataNumber"
import AutoCardRowNameWrapper from "../../AreCommon/AutoCardRowNameWrapper/AutoCardRowNameWrapper"
import { useState, useEffect } from "react"
import clickTableToExcel from "../../../../core/clickTableToExcel"
import AutoCardUnloadingData from "../../AreCommon/WrapperContentCentr/AutoCardUnloadingData/AutoCardUnloadingData"
import { url } from '../../../../core/core';
import ShowMore from "../../AreCommon/ShowMore/ShowMore"

export default function AutoCard({dispCardOpen, dispCardOpenHide, dispCardData}) {
  const [showMoreActiv, setShowMoreActiv] = useState(10)
  const [arrGroup, setArrGroup] = useState([])
  const [dataInput, setDataInput] = useState({})
  const [dataExcel, setDataExcel] = useState([])
  const [switchArrow, setSwitchArrow] = useState({arrow: ''})
console.log(arrGroup)
  function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  useEffect(() => {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({storyAuto: dispCardData.gossNumber})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        //console.log(data)
        if(IsJsonString(data)) {
          data = JSON.parse(data)
          setArrGroup(n => [...data])
          
        }
      })
      .catch((er) => {
        //console.log(er)
      })
  }, [dispCardData])

  function dataInputOnChange(event, inputData = false) { // данные из всех input
    if(!inputData) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setDataInput(n => ({...n, [name]: value.trim()}))
    } else {
      setDataInput(n => ({...n, [inputData[0]]: (inputData[1]).trim()}))
    }
  }

  function htmlTable(arr) {
    let str = ''

    function passangers(namePassengers, passengersPhone, numberOfPassengers) {
      if(namePassengers) {
        let str = ''
        let namePass = JSON.parse(namePassengers)
        let passPhone = ''
        if(passengersPhone) {
          passPhone = JSON.parse(passengersPhone)
        }

        for(let key in namePass) {
          str += (namePass[key] ? namePass[key] : '') + ' ' + (passPhone[`passengersPhone-${key.toString().slice(-1)}`] ? passPhone[`passengersPhone-${key.toString().slice(-1)}`] : '') + '; '
        }

        return str

      } else {
        return '-'
      }
    }

    for(let i = 0; i < arr.length; i++) {
      str += 
      `
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i]['dateOfCreation']}</td>
        <td>${arr[i]['dateOfApplication'] + ' - ' + arr[i]['submissionTime']}</td>
        <td>${arr[i]['timeOfUseOfTransport'] + 'ч'}</td>
        <td>${arr[i]['applicationInitiator'] + ' ' + arr[i]['initiatorPhone']}</td>
        <td>${passangers(arr[i]['namePassengers'], arr[i]['passengersPhone'], arr[i]['numberOfPassengers'])}</td>
        <td>${arr[i]['submissionAddress']}</td>
        <td>${arr[i]['arrivalAddress']}</td>
        <td>${arr[i]['purposeOfTheTrip']}</td>
        <td>${arr[i]['comment'] ? arr[i]['comment'] : '-'}</td>
      </tr>
      `
    }

    return (
      `
        <table>
          <tbody>
           ${str}
          </tbody>
        </table>
      `
    )
  }

  function showMoreActivClick() {
    setShowMoreActiv(n => n * 2)
  }

  return(
    <div className={dispCardOpen ? 'dispCard-hide' : ''}>
      <div className="dispCard">
        <div className="dispCard-group">
          <h4>марка</h4>
          <div className="dispCard-name">{dispCardData.marc}</div>
          <h4>Государственный номер</h4>
          <div className="dispCard-name">{dispCardData.gossNumber}</div>
          <h4>Водитель</h4>
          <div className="dispCard-name">{dispCardData.driver}</div>
          <h4>Статус</h4>
          <div className="dispCard-name">{dispCardData.status}</div>
        </div>
        <div className="dispCard-group">
          <h4>год выпуска</h4>
          <div className="dispCard-name">{dispCardData.yearOfIssue}</div>
          <h4>вид</h4>
          <div className="dispCard-name">{dispCardData.view}</div>
          <h4>Телефон</h4>
          <div className="dispCard-name">{dispCardData.telephone}</div>
        </div>
      </div>
      <ButtonCancellation name={'Назад'} cancellation={dispCardOpenHide}/>
      
      <div className="autoCard-history-wrap">
        <h3>История автотранспорта</h3>
        <div className='disp-wrapper'>
          <div className="disp-row">
            <div className="disp-row-menu">
              <SearchData margin={false} dataInputOnChange={dataInputOnChange} name={'searchData'}/>
              <div className="autoCard-margin">
               <Datepicker placeHolder={'Период создания'} name={'calendarAppCreate'} dataInputOnChange={dataInputOnChange}/>
              </div>
              <Datepicker placeHolder={'Период подачи'} name={'calendarAppInnings'} dataInputOnChange={dataInputOnChange}/>
              <DownloadReport clickDownload={clickTableToExcel('Таблица', 'Таблица.xls', htmlTable, dataExcel)}/>
            </div>
            <div>
              <ListDataNumber setShowMoreActiv={setShowMoreActiv}/>
            </div>
          </div>
          <div className="disp-row-name-wrapper">
            <AutoCardRowNameWrapper setSwitchArrow={setSwitchArrow}/>
            <AutoCardUnloadingData data={arrGroup} count={showMoreActiv} sort={dataInput} switchArrow={switchArrow} setDataExcel={setDataExcel}/>
          </div>
        </div>
      </div>
      {arrGroup == false ? '' : <ShowMore label={'Показать еще'} click={showMoreActivClick}/>}
    </div>
  )
}