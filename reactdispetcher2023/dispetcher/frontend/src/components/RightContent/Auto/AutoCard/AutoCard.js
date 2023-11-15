import ButtonCancellation from "../../AreCommon/ButtonCancellation/ButtonCancellation"
import SearchData from '../../AreCommon/Search/SearchData'
import Datepicker from "../../AreCommon/Datepicker/Datepicker"
import DownloadReport from "../../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../../AreCommon/ListDataNumber/ListDataNumber"
import AutoCardRowNameWrapper from "../../AreCommon/AutoCardRowNameWrapper/AutoCardRowNameWrapper"

export default function AutoCard({dispCardOpen, dispCardOpenHide, dispCardData}) {
  return(
    <div className={dispCardOpen ? 'dispCard-hide' : ''}>
      <div className="dispCard">
        <div className="dispCard-group">
          <h4>марка</h4>
          <div className="dispCard-name">{dispCardData.marc}</div>
          <h4>Государственный номер</h4>
          <div className="dispCard-name">{dispCardData.gossNumber}</div>
          <h4>Водитель</h4>
          <div className="dispCard-name">{dispCardData.driver}</div>
          <h4>Статус</h4>
          <div className="dispCard-name">{dispCardData.status}</div>
        </div>
        <div className="dispCard-group">
          <h4>год выпуска</h4>
          <div className="dispCard-name">{dispCardData.yearOfIssue}</div>
          <h4>вид</h4>
          <div className="dispCard-name">{dispCardData.view}</div>
          <h4>Телефон</h4>
          <div className="dispCard-name">{dispCardData.telephone}</div>
        </div>
      </div>
      <ButtonCancellation name={'Назад'} cancellation={dispCardOpenHide}/>
      
      <div className="autoCard-history-wrap">
        <h3>История автотранспорта</h3>
        <div className='disp-wrapper'>
          <div className="disp-row">
            <div className="disp-row-menu">
              <SearchData margin={false}/>
              <div className="autoCard-margin">
               <Datepicker placeHolder={'Период создания'} />
              </div>
              <Datepicker placeHolder={'Период подачи'} />
              <DownloadReport />
            </div>
            <div>
              <ListDataNumber setShowMoreActiv={10}/>
            </div>
          </div>
          <div className="disp-row-name-wrapper">
            <AutoCardRowNameWrapper />
            {/* <WrapperContentCentr label="Записей не найдено. Добавьте нового автомобиль" actionLk={actionLk.getAutoData} count={showMoreActiv} companyCardOpenHide={dispCardOpenHide} setDispCardEdit={editDisp} backDisp={backDisp} showMoreActiv={showMoreActiv} trashDisp={trashDisp}/> */}
          </div>
        </div>
      </div>
    </div>
  )
}