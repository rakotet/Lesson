import WrapNameRowData from "../WrapNameRowData/WrapNameRowData"

export default function MyTemplatesRowNameWrapper({checkNumber}) {
  return(
    <div className="myTemplatesRowNameWrapper">
      <div className="myTemplatesRowNameWrapper-zero">
        <div>{checkNumber}</div>
      </div>
      <div className="myTemplatesRowNameWrapper-one">
        <WrapNameRowData name={'Номер'}/>
      </div>
      <div className="myTemplatesRowNameWrapper-two">
        <WrapNameRowData name={'Дата создания'}/>
      </div>
      <div className="myTemplatesRowNameWrapper-ten">
        <WrapNameRowData name={'Пассажир, тел.'}/>
      </div>
      <div className="myTemplatesRowNameWrapper-eleven">
        <WrapNameRowData name={'Адрес отправки'}/>
      </div>
      <div className="myTemplatesRowNameWrapper-twelve">
        <WrapNameRowData name={'Адрес назначения'}/>
      </div>
      <div className="myTemplatesRowNameWrapper-thirteen">
        <WrapNameRowData name={'Цель поездки'}/>
      </div>
      <div className="myTemplatesRowNameWrapper-fourteen">
        <WrapNameRowData name={'Комментарий'}/>
      </div>
    </div>
  )
}