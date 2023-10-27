import ButtonCancellation from "../../AreCommon/ButtonCancellation/ButtonCancellation"

export default function AutoCard({dispCardOpen, dispCardOpenHide, dispCardData}) {
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
    </div>
  )
}