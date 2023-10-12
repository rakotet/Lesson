import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function DispRowNameWrapper() {
  return(
    <div className="dispRowNameWrapper">
      <div className="dispRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="dispRowNameWrapper-two">
        <WrapNameRowData name={'Фамилия Имя Отчетство'}/>
      </div>
      <div className="dispRowNameWrapper-three">
        <WrapNameRowData name={'Должность'}/>
      </div>
      <div className="dispRowNameWrapper-four">
        <WrapNameRowData name={'Телефон'}/>
      </div>
      <div className="dispRowNameWrapper-five">
        <WrapNameRowData name={'Предприятие'}/>
      </div>
      <div className="dispRowNameWrapper-six">
        <WrapNameRowData name={'Кол-во машин'}/>
      </div>
      <div className="dispRowNameWrapper-seven">
        <WrapNameRowData name={'Действие'}/>
      </div>
    </div>
  )
}