import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function GroupRowNameWrapper() {
  return(
    <div className="groupRowNameWrapper">
      <div className="groupRowNameWrapper-width-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="groupRowNameWrapper-width-two">
        <WrapNameRowData name={'Предприятие'}/>
      </div>
      <div className="groupRowNameWrapper-width-three">
        <WrapNameRowData name={'Руководитель'}/>
      </div>
      <div className="groupRowNameWrapper-width-four">
        <WrapNameRowData name={'Кол-во машин'}/>
      </div>
      <div className="dispRowNameWrapper-seven">
        <WrapNameRowData name={'Действие'}/>
      </div>
    </div>
  )
}