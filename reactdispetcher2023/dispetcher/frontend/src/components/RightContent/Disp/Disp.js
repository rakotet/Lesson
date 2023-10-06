import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import DispRowNameWrapper from "../AreCommon/DispRowNameWrapper/DispRowNameWrapper"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData } from "../../store/reduser";

export default function Disp() {
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  const dispatch = useDispatch()

  function addDispFunc() {
    dispatch(setActiveRow(activRight.addDisp))
  }

  return(
    <div className="disp-wrapper">
      <div className="disp-row">
        <div className="disp-row-menu">
          <ButtonAdd addFunc={addDispFunc}/>
          <SearchData />
          <SelectData namePlaceholder={'Выбрать предприятие'} nameArr={['test1','test2','test3','test1','test2','test3','test1','test2','test3','test1','test2','test3']}/>
          <SelectData namePlaceholder={'Выбрать категорию'} nameArr={['test4','test5','test6']}/>
          <DownloadReport />
        </div>
        <div>
          <ListDataNumber />
        </div>
      </div>
      <div className="disp-row-name-wrapper">
        <DispRowNameWrapper />
        <WrapperContentCentr label="Записей не найдено. Добавьте нового диспетчера" actionLk={actionLk.getDispData}/>
      </div>
    </div>
  )
}