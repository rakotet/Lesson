import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function ApplicationsRowNameWrapper() {
  return(
    <div className="applicationsRowNameWrapper">
      {/* <div className="applicationsRowNameWrapper-input">
        <input type="checkbox" name="applicationsRowNameWrapper-checkbox" id="cb1"/>
        <label htmlFor="cb1"></label>
      </div> */}
      <div className="applicationsRowNameWrapper-zero">
        <div></div>
      </div>
      <div className="applicationsRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="applicationsRowNameWrapper-two">
        <WrapNameRowData name={'Дата подачи'}/>
      </div>
      <div className="applicationsRowNameWrapper-three">
        <WrapNameRowData name={'Время использования'}/>
      </div>
      <div className="applicationsRowNameWrapper-four">
        <WrapNameRowData name={'Время в пути'}/>
      </div>
      <div className="applicationsRowNameWrapper-five">
        <WrapNameRowData name={'Статус'}/>
      </div>
      <div className="applicationsRowNameWrapper-six">
        <WrapNameRowData name={'Водитель, тел.'}/>
      </div>
      <div className="applicationsRowNameWrapper-seven">
        <WrapNameRowData name={'Автотранспорт'}/>
      </div>
      <div className="applicationsRowNameWrapper-eight">
        <WrapNameRowData name={'Вид'}/>
      </div>
      <div className="applicationsRowNameWrapper-nine">
        <WrapNameRowData name={'Создатель, тел.'}/>
      </div>
      <div className="applicationsRowNameWrapper-ten">
        <WrapNameRowData name={'Пассажир, тел.'}/>
      </div>
      <div className="applicationsRowNameWrapper-eleven">
        <WrapNameRowData name={'Адрес отправки'}/>
      </div>
      <div className="applicationsRowNameWrapper-twelve">
        <WrapNameRowData name={'Адрес назначения'}/>
      </div>
      <div className="applicationsRowNameWrapper-thirteen">
        <WrapNameRowData name={'Цель поездки'}/>
      </div>
      <div className="applicationsRowNameWrapper-fourteen">
        <WrapNameRowData name={'Комментарий'}/>
      </div>
    </div>
  )
}