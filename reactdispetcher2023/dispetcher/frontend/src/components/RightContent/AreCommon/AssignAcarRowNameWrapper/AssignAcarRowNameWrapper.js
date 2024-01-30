import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function AssignAcarRowNameWrapper({dateOfApplication, setSwitchArrow = () => {}}) {
  return(
    <div className="assignAcarRowNameWrapper">
      <div className="assignAcarRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="assignAcarRowNameWrapper-two">
        <WrapNameRowData name={'Автотранспорт'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'assignAcarTwo'}}/>
      </div>
      <div className="assignAcarRowNameWrapper-three">
        <WrapNameRowData name={'Водитель, тел.'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'assignAcarThree'}}/>
      </div>
      <div className="assignAcarRowNameWrapper-four">
        <WrapNameRowData name={`Свободное время на ${dateOfApplication}`}/>
      </div>
      <div className="assignAcarRowNameWrapper-five">
        <WrapNameRowData name={'Год выпуска'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'assignAcarFive'}}/>
      </div>
      <div className="assignAcarRowNameWrapper-six">
        <WrapNameRowData name={'Вид'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'assignAcarSix'}}/>
      </div>
      <div className="assignAcarRowNameWrapper-seven">
        <WrapNameRowData name={'Статус'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'assignAcarSeven'}}/>
      </div>
    </div>
  )
}