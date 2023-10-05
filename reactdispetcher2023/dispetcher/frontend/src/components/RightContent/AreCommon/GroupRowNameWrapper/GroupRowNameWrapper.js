import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function GroupRowNameWrapper() {
  return(
    <div className="groupRowNameWrapper">
      <WrapNameRowData name={'Номер'}/>
      <WrapNameRowData name={'Предприятие / - Подразделение'}/>
      <WrapNameRowData name={'Руководитель'}/>
      <WrapNameRowData name={'Кол-во машин'}/>
    </div>
  )
}