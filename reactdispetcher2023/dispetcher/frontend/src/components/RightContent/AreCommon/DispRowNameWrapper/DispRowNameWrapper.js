import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function DispRowNameWrapper({setSwitchArrow = () => {}}) {
  return(
    <div className="dispRowNameWrapper">
      <div className="dispRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="dispRowNameWrapper-two">
        <WrapNameRowData name={'Фамилия Имя Отчетство'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'dispTwo'}}/>
      </div>
      <div className="dispRowNameWrapper-three">
        <WrapNameRowData name={'Должность'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'dispThree'}}/>
      </div>
      <div className="dispRowNameWrapper-four">
        <WrapNameRowData name={'Телефон'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'dispFour'}}/>
      </div>
      <div className="dispRowNameWrapper-five">
        <WrapNameRowData name={'Предприятие'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'dispFive'}}/>
      </div>
      <div className="dispRowNameWrapper-six">
        <WrapNameRowData name={'Кол-во машин'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'dispSix'}}/>
      </div>
      <div className="dispRowNameWrapper-seven">
        <WrapNameRowData name={'Действие'}/>
      </div>
    </div>
  )
}