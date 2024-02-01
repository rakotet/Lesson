import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function AutoCardRowNameWrapper(setSwitchArrow = () => {}) {
  return(
    <div className="applicationsRowNameWrapper">
      <div className="applicationsRowNameWrapper-zero">
        <div></div>
      </div>
      <div className="applicationsRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="applicationsRowNameWrapper-two">
        <WrapNameRowData name={'Дата создания'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwo'}}/>
      </div>
      <div className="applicationsRowNameWrapper-three">
        <WrapNameRowData name={'Время использования'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwo'}}/>
      </div>
      <div className="applicationsRowNameWrapper-four">
        <WrapNameRowData name={'Время в пути'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwo'}}/>
      </div>
      <div className="applicationsRowNameWrapper-nine">
        <WrapNameRowData name={'Создатель, тел.'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwo'}}/>
      </div>
      <div className="applicationsRowNameWrapper-ten">
        <WrapNameRowData name={'Пассажир, тел.'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwo'}}/>
      </div>
      <div className="applicationsRowNameWrapper-eleven">
        <WrapNameRowData name={'Адрес отправки'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwo'}}/>
      </div>
      <div className="applicationsRowNameWrapper-twelve">
        <WrapNameRowData name={'Адрес назначения'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwo'}}/>
      </div>
      <div className="applicationsRowNameWrapper-thirteen">
        <WrapNameRowData name={'Цель поездки'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwo'}}/>
      </div>
      <div className="applicationsRowNameWrapper-fourteen">
        <WrapNameRowData name={'Комментарий'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwo'}}/>
      </div>
    </div>
  )
}