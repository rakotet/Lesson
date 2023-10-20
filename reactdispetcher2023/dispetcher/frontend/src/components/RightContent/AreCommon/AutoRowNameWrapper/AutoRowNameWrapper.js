import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function AutoRowNameWrapper() {
  return(
    <div className="autoRowNameWrapper">
      <div className="autoRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="autoRowNameWrapper-two">
        <WrapNameRowData name={'Автотранспорт'}/>
      </div>
      <div className="autoRowNameWrapper-three">
        <WrapNameRowData name={'Водитель, тел.'}/>
      </div>
      <div className="autoRowNameWrapper-four">
        <WrapNameRowData name={'Свободное время на сегодня'}/>
      </div>
      <div className="autoRowNameWrapper-five">
        <WrapNameRowData name={'Свободное время на завтра'}/>
      </div>
      <div className="autoRowNameWrapper-six">
        <WrapNameRowData name={'Год выпуска'}/>
      </div>
      <div className="autoRowNameWrapper-seven">
        <WrapNameRowData name={'Вид'}/>
      </div>
      <div className="autoRowNameWrapper-eight">
        <WrapNameRowData name={'Статус'}/>
      </div>
      <div className="autoRowNameWrapper-nine">
        <WrapNameRowData name={'Действие'}/>
      </div>
    </div>
  )
}