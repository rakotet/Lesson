import ButtonCancellation from "../../AreCommon/ButtonCancellation/ButtonCancellation"

export default function DispCard({dispCardOpen, dispCardOpenHide, dispCardData}) {
  
  return(
    <div className={dispCardOpen ? 'dispCard-hide' : ''}>
      <div className="dispCard">
        <div className="dispCard-group">
          <h4>Фамилия Имя Отчество</h4>
          <div className="dispCard-name">{dispCardData.userName}</div>
          <h4>Должность</h4>
          <div className="dispCard-name">{dispCardData.jobTitle}</div>
          <h4>телефон</h4>
          <div className="dispCard-name">{dispCardData.telephone}</div>
          <h4>электронная почта</h4>
          <div className="dispCard-name">{dispCardData.email}</div>
          <h4>Предприятие</h4>
          <div className="dispCard-name">{dispCardData.userGroup}</div>
          <h4>подразделение</h4>
          <div className="dispCard-name">{dispCardData.userSubdivision}</div>
        </div>
      </div>
      <ButtonCancellation name={'Назад'} cancellation={dispCardOpenHide}/>
    </div>
  )
}