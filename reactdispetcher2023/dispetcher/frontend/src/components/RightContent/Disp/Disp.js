import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import DispRowNameWrapper from "../AreCommon/DispRowNameWrapper/DispRowNameWrapper"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"

export default function Disp() {

  return(
    <div className="disp-wrapper">
      <div className="disp-row">
        <div className="disp-row-menu">
          <ButtonAdd />
          <SearchData />
          <SelectData namePlaceholder={'Выбрать предприятие'}/>
          <SelectData namePlaceholder={'Выбрать категорию'}/>
          <DownloadReport />
        </div>
        <div>
          <ListDataNumber />
        </div>
      </div>
      <div className="disp-row-name-wrapper">
        <DispRowNameWrapper />
        <WrapperContentCentr label="Записей не найдено. Добавьте нового диспетчера"/>
      </div>
    </div>
  )
}