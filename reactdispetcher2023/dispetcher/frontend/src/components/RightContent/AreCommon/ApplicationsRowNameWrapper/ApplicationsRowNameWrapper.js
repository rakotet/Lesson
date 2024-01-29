import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function ApplicationsRowNameWrapper({checkNumber, setSwitchArrow = () => {}}) {
  return(
    <div className="applicationsRowNameWrapper">
      <div className="applicationsRowNameWrapper-zero">
        <div>{checkNumber}</div>
      </div>
      <div className="applicationsRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="applicationsRowNameWrapper-two">
        <WrapNameRowData name={'Дата создания'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwo'}}/>
      </div>
      <div className="applicationsRowNameWrapper-three">
        <WrapNameRowData name={'Время использования'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appThree'}}/>
      </div>
      <div className="applicationsRowNameWrapper-four">
        <WrapNameRowData name={'Время в пути'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appFour'}}/>
      </div>
      <div className="applicationsRowNameWrapper-five">
        <WrapNameRowData name={'Статус'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appFive'}}/>
      </div>
      <div className="applicationsRowNameWrapper-six">
        <WrapNameRowData name={'Водитель, тел.'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appSix'}}/>
      </div>
      <div className="applicationsRowNameWrapper-seven">
        <WrapNameRowData name={'Автотранспорт'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appSeven'}}/>
      </div>
      <div className="applicationsRowNameWrapper-eight">
        <WrapNameRowData name={'Вид'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appEight'}}/>
      </div>
      <div className="applicationsRowNameWrapper-nine">
        <WrapNameRowData name={'Создатель, тел.'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appNine'}}/>
      </div>
      <div className="applicationsRowNameWrapper-ten">
        <WrapNameRowData name={'Пассажир, тел.'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTen'}}/>
      </div>
      <div className="applicationsRowNameWrapper-eleven">
        <WrapNameRowData name={'Адрес отправки'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appEleven'}}/>
      </div>
      <div className="applicationsRowNameWrapper-twelve">
        <WrapNameRowData name={'Адрес назначения'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appTwelve'}}/>
      </div>
      <div className="applicationsRowNameWrapper-thirteen">
        <WrapNameRowData name={'Цель поездки'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appThirteen'}}/>
      </div>
      <div className="applicationsRowNameWrapper-fourteen">
        <WrapNameRowData name={'Комментарий'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'appFourteen'}}/>
      </div>
    </div>
  )
}