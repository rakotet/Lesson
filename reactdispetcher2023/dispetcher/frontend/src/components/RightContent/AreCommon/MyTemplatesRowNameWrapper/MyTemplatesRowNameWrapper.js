import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function MyTemplatesRowNameWrapper({checkNumber, setSwitchArrow = () => {}}) {
  return(
    <div className="myTemplatesRowNameWrapper">
      <div className="myTemplatesRowNameWrapper-zero">
        <div>{checkNumber}</div>
      </div>
      <div className="myTemplatesRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="myTemplatesRowNameWrapper-two">
        <WrapNameRowData name={'Дата создания'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'MyTemplatesTwo'}}/>
      </div>
      <div className="myTemplatesRowNameWrapper-ten">
        <WrapNameRowData name={'Пассажир, тел.'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'MyTemplatesTen'}}/>
      </div>
      <div className="myTemplatesRowNameWrapper-eleven">
        <WrapNameRowData name={'Адрес отправки'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'MyTemplatesEleven'}}/>
      </div>
      <div className="myTemplatesRowNameWrapper-twelve">
        <WrapNameRowData name={'Адрес назначения'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'MyTemplatesTwelve'}}/>
      </div>
      <div className="myTemplatesRowNameWrapper-thirteen">
        <WrapNameRowData name={'Цель поездки'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'MyTemplatesThirteen'}}/>
      </div>
      <div className="myTemplatesRowNameWrapper-fourteen">
        <WrapNameRowData name={'Комментарий'} setSwitchArrow={setSwitchArrow} arrow={{arrow: 'MyTemplatesFourteen'}}/>
      </div>
    </div>
  )
}