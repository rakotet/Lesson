import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function DispRowNameWrapper() {
  return(
    <div className="dispRowNameWrapper">
      <WrapNameRowData name={'Номер'}/>
      <WrapNameRowData name={'Фамилия Имя Отчетство'}/>
      <WrapNameRowData name={'Должность'}/>
      <WrapNameRowData name={'Телефон'}/>
      <WrapNameRowData name={'Предприятие'}/>
      <WrapNameRowData name={'Кол-во машин'}/>
      <WrapNameRowData name={'Статус'}/>
      <WrapNameRowData name={'Действие'}/>
    </div>
  )
}