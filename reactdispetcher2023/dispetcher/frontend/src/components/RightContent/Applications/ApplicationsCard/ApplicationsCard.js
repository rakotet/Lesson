import ButtonCancellation from "../../AreCommon/ButtonCancellation/ButtonCancellation"

export default function ApplicationsCard({dispCardOpen, dispCardOpenHide, dispCardData}) {
  console.log(dispCardData)
  let submissionTime = dispCardData.submissionTime
  let timeOfUseOfTransport = dispCardData.timeOfUseOfTransport
  let itog
  if(submissionTime) {
    itog = Number(submissionTime[0] + submissionTime[1]) + Number(timeOfUseOfTransport)
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
          <div className="applicationsCard-name">{dispCardData.status}</div>
        </div>
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
          <div className="applicationsCard-name">{`${itog}:00`}</div>
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
          <div className="applicationsCard-name">{dispCardData.applicationInitiator}</div>
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
        <div className="applicationsCard-group">
          <h4>ФИО пассажира</h4>
          <div className="applicationsCard-name">{dispCardData.namePassengers}</div>
        </div>
        <div className="applicationsCard-group">
          <h4>Сотовый телефон</h4>
          <div className="applicationsCard-name">{dispCardData.passengersPhone}</div>
        </div>
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
        </div>
      </div>

      <ButtonCancellation name={'Назад'} cancellation={dispCardOpenHide}/>
    </div>
  )
}