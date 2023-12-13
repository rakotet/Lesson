import imgBlue from './images/blue.png';
import imgRed from './images/red.png';
import imgGreen from './images/green.png';

import ButtonCancellation from "../../AreCommon/ButtonCancellation/ButtonCancellation"

export default function ApplicationsCard({dispCardOpen, dispCardOpenHide, dispCardData}) {
  // console.log(dispCardData)
  let submissionTime = dispCardData.submissionTime
  let timeOfUseOfTransport = dispCardData.timeOfUseOfTransport
  let itog
  if(submissionTime) {
    itog = dateApplications(dispCardData.dateOfApplication, submissionTime, timeOfUseOfTransport)
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

  function status(data) {
    if(data == 'Новая') {
      return imgBlue
    } else if(data == 'Отклонена') {
      return imgRed
    } else if(data == 'Назначена') {
      return imgGreen
    }
  }

  let arr = []
  let namePassengers = {}
  let passengersPhone = {}
  let arrDir = []

  if(dispCardData.dirFiles) {
    let dirFiles = JSON.parse(dispCardData.dirFiles)

    for(let key in dirFiles) {
      if(dirFiles[key]['name']) {
        arrDir.push(dirFiles[key]['name'])
      }
    }
  }
  

  if(dispCardData.namePassengers) {
    namePassengers = JSON.parse(dispCardData.namePassengers)
  }

  if(dispCardData.passengersPhone) {
    passengersPhone = JSON.parse(dispCardData.passengersPhone)
  }

  let lengthDataInput = Object.keys(namePassengers).length

  if(lengthDataInput) {
    for(let key in namePassengers) {
      let oneStr = key.split('-')
      oneStr = oneStr[1]

      arr.push(`${namePassengers[`${key}`]}:${passengersPhone[`passengersPhone-${oneStr}`]}`)
    }
  }

  return(
    <div className={dispCardOpen ? 'applicationsCard-hide' : ''}>
      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>НОМЕР ЗАЯВКИ</h4>
          <div className="applicationsCard-name">№{dispCardData.id}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>ДАТА создания ЗАЯВКИ</h4>
          <div className="applicationsCard-name">{dispCardData.dateOfCreation}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>СТАТУС</h4>
          <div className="applicationsCard-name">
            <img src={status(dispCardData.status)}/><p>{dispCardData.status}</p>
          </div>
        </div>
        {
          dispCardData.reasonForDeviation != null 
          ?
          <div className="applicationsCard-group">
            <h4>Причина отклонения</h4>
            <div className="applicationsCard-name">{dispCardData.reasonForDeviation}</div>
          </div> 
          : ''
        }
      </div>

      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>ДАТА ПОДАЧИ</h4>
          <div className="applicationsCard-name">{dispCardData.dateOfApplication}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>ВРЕМЯ ПОДАЧИ</h4>
          <div className="applicationsCard-name">{dispCardData.submissionTime}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>время использования (часы)</h4>
          <div className="applicationsCard-name">{dispCardData.timeOfUseOfTransport}</div>
        </div>
      </div>

      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>Дата окончания</h4>
          <div className="applicationsCard-name">{dispCardData.dateOfApplication}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>ВРЕМЯ окончания</h4>
          <div className="applicationsCard-name">{`${itog}`}</div>
        </div>
      </div>

      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>Адрес подачи</h4>
          <div className="applicationsCard-name">{dispCardData.submissionAddress}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>Адрес прибытия</h4>
          <div className="applicationsCard-name">{dispCardData.arrivalAddress}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>Поездка с ожиданием</h4>
          <div className="applicationsCard-name">{dispCardData.rideWithAnticipation}</div>
        </div>
      </div>

      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>Цель поездки</h4>
          <div className="applicationsCard-name">{dispCardData.purposeOfTheTrip}</div>
        </div>
      </div>

      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>Сотрудник подавший заявку</h4>
          <div className="applicationsCard-name">{dispCardData.applicationInitiator} {dispCardData.emailUserCreate}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>Должность</h4>
          <div className="applicationsCard-name">{dispCardData.jobTitle}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>Подразделение</h4>
          <div className="applicationsCard-name">{dispCardData.subdivision}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>Сотовый телефон</h4>
          <div className="applicationsCard-name">{dispCardData.initiatorPhone}</div>
        </div>
      </div>

      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>Количество пассажиров</h4>
          <div className="applicationsCard-name">{dispCardData.numberOfPassengers}</div>
        </div>
        {
          arr.map((item, index) => {

            return(
              <div key={index}>
                <div className="applicationsCard-group">
                  <h4>ФИО пассажира {index + 1}</h4>
                  <div className="applicationsCard-name">{item.split(':')[0]}</div>
                </div>
                <div className="applicationsCard-group">
                  <h4>Сотовый телефон</h4>
                  <div className="applicationsCard-name">{item.split(':')[1]}</div>
                </div>
              </div>
            )
          })
        }
        

      </div>

      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>Водитель, тел.</h4>
          <div className="applicationsCard-name">{dispCardData.driverPhone}</div>
        </div>
      </div>

      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>Класс (тип) автомобиля</h4>
          <div className="applicationsCard-name">{dispCardData.carClass}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>Марка, модель</h4>
          <div className="applicationsCard-name">{dispCardData.marc}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>Государственный номер</h4>
          <div className="applicationsCard-name">{dispCardData.gossNumber}</div>
        </div>
      </div>

      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>комментарий</h4>
          <div className="applicationsCard-name">{dispCardData.comment}</div>
        </div>
      </div>

      <div className="applicationsCard">
        <div className="applicationsCard-group">
          <h4>Прикрепленные файлы</h4>
          <div className="applicationsCard-name"></div>
          {dispCardData.dirFiles != '' && dispCardData.dirFiles != undefined ? arrDir.map((item, index) => {
            return(
              <div key={index} className="applicationsCard-name"><a href={'/page/files/' + item}>{item}</a></div>
            )
          }) : ''}
        </div>
      </div>

      <ButtonCancellation name={'Назад'} cancellation={dispCardOpenHide}/>
    </div>
  )
}