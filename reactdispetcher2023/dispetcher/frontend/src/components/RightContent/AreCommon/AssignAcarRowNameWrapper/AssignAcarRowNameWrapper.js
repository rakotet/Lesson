import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function AssignAcarRowNameWrapper({dateOfApplication}) {
  return(
    <div className="assignAcarRowNameWrapper">
      <div className="assignAcarRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="assignAcarRowNameWrapper-two">
        <WrapNameRowData name={'Автотранспорт'}/>
      </div>
      <div className="assignAcarRowNameWrapper-three">
        <WrapNameRowData name={'Водитель, тел.'}/>
      </div>
      <div className="assignAcarRowNameWrapper-four">
        <WrapNameRowData name={`Свободное время на ${dateOfApplication}`}/>
      </div>
      <div className="assignAcarRowNameWrapper-five">
        <WrapNameRowData name={'Год выпуска'}/>
      </div>
      <div className="assignAcarRowNameWrapper-six">
        <WrapNameRowData name={'Вид'}/>
      </div>
      <div className="assignAcarRowNameWrapper-seven">
        <WrapNameRowData name={'Статус'}/>
      </div>
    </div>
  )
}