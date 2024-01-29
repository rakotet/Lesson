import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function MyApplicationsRowNameWrapper({checkNumber, setSwitchArrow = () => {}}) {
  return(
    <div className="myApplicationsRowNameWrapper">
      <div className="myApplicationsRowNameWrapper-zero">
        <div>{checkNumber}</div>
      </div>
      <div className="myApplicationsRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="myApplicationsRowNameWrapper-two">
        <WrapNameRowData name={'Дата создания'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppTwo'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-three">
        <WrapNameRowData name={'Время использования'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppThree'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-four">
        <WrapNameRowData name={'Время в пути'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppFour'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-five">
        <WrapNameRowData name={'Статус'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppFive'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-six">
        <WrapNameRowData name={'Водитель, тел.'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppSix'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-seven">
        <WrapNameRowData name={'Автотранспорт'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppSeven'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-eight">
        <WrapNameRowData name={'Вид'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppEight'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-ten">
        <WrapNameRowData name={'Пассажир, тел.'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppTen'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-eleven">
        <WrapNameRowData name={'Адрес отправки'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppEleven'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-twelve">
        <WrapNameRowData name={'Адрес назначения'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppTwelve'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-thirteen">
        <WrapNameRowData name={'Цель поездки'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppThirteen'}}/>
      </div>
      <div className="myApplicationsRowNameWrapper-fourteen">
        <WrapNameRowData name={'Комментарий'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'myAppFourteen'}}/>
      </div>
    </div>
  )
}