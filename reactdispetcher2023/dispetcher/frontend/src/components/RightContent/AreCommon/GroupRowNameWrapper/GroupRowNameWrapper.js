import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function GroupRowNameWrapper({setSwitchArrow = () => {}}) {
  return(
    <div className="groupRowNameWrapper">
      <div className="groupRowNameWrapper-width-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="groupRowNameWrapper-width-two">
        <WrapNameRowData name={'Предприятие'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'groupTwo'}}/>
      </div>
      <div className="groupRowNameWrapper-width-three">
        <WrapNameRowData name={'Руководитель'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'groupThree'}}/>
      </div>
      <div className="groupRowNameWrapper-width-four">
        <WrapNameRowData name={'Кол-во машин'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'groupFour'}}/>
      </div>
      <div className="dispRowNameWrapper-seven">
        <WrapNameRowData name={'Действие'}/>
      </div>
    </div>
  )
}