import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function MyApplicationsRowNameWrapper() {
  return(
    <div className="myApplicationsRowNameWrapper">
      {/* <div className="applicationsRowNameWrapper-input">
        <input type="checkbox" name="applicationsRowNameWrapper-checkbox" id="cb1"/>
        <label htmlFor="cb1"></label>
      </div> */}
      <div className="myApplicationsRowNameWrapper-zero">
        <div></div>
      </div>
      <div className="myApplicationsRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-two">
        <WrapNameRowData name={'Дата создания'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-three">
        <WrapNameRowData name={'Время использования'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-four">
        <WrapNameRowData name={'Время в пути'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-five">
        <WrapNameRowData name={'Статус'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-six">
        <WrapNameRowData name={'Водитель, тел.'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-seven">
        <WrapNameRowData name={'Автотранспорт'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-eight">
        <WrapNameRowData name={'Вид'}/>
      </div>
      {/* <div className="applicationsRowNameWrapper-nine">
        <WrapNameRowData name={'Создатель, тел.'}/>
      </div> */}
      <div className="myApplicationsRowNameWrapper-ten">
        <WrapNameRowData name={'Пассажир, тел.'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-eleven">
        <WrapNameRowData name={'Адрес отправки'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-twelve">
        <WrapNameRowData name={'Адрес назначения'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-thirteen">
        <WrapNameRowData name={'Цель поездки'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-fourteen">
        <WrapNameRowData name={'Комментарий'}/>
      </div>
    </div>
  )
}