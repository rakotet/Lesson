import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function AutoRowNameWrapper({setSwitchArrow = () => {}}) {
  return(
    <div className="autoRowNameWrapper">
      <div className="autoRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="autoRowNameWrapper-two">
        <WrapNameRowData name={'Автотранспорт'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'autoTwo'}}/>
      </div>
      <div className="autoRowNameWrapper-three">
        <WrapNameRowData name={'Водитель, тел.'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'autoThree'}}/>
      </div>
      <div className="autoRowNameWrapper-four">
        <WrapNameRowData name={'Свободное время на сегодня'}/>
      </div>
      <div className="autoRowNameWrapper-five">
        <WrapNameRowData name={'Свободное время на завтра'}/>
      </div>
      <div className="autoRowNameWrapper-six">
        <WrapNameRowData name={'Год выпуска'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'autoSix'}}/>
      </div>
      <div className="autoRowNameWrapper-seven">
        <WrapNameRowData name={'Вид'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'autoSeven'}}/>
      </div>
      <div className="autoRowNameWrapper-eight">
        <WrapNameRowData name={'Статус'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'autoEight'}}/>
      </div>
      <div className="autoRowNameWrapper-nine">
        <WrapNameRowData name={'Действие'}/>
      </div>
    </div>
  )
}