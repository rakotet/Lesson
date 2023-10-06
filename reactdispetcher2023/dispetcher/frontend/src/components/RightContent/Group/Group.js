import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import SearchData from "../AreCommon/Search/SearchData"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import GroupRowNameWrapper from "../AreCommon/GroupRowNameWrapper/GroupRowNameWrapper"
import WrapperContentCentr from '../AreCommon/WrapperContentCentr/WrapperContentCentr'
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData } from "../../store/reduser";

export default function Group() {
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  const dispatch = useDispatch()

  function addGroupFunc() {
    dispatch(setActiveRow(activRight.addGroup))
  }

  return(
    <div className="group-wrapper">
      <div className="group-row">
        <div className="group-row-menu">
          <ButtonAdd addFunc={addGroupFunc}/>
          <SearchData />
          <DownloadReport />
        </div>
      </div>
      <div className="group-row-name-wrapper">
        <GroupRowNameWrapper />
        <WrapperContentCentr label="Записей не найдено. Добавьте новое предприятие" actionLk={actionLk.getGroupData}/>
      </div>
    </div>
  )
}