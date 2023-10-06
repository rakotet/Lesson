import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import SearchData from "../AreCommon/Search/SearchData"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import GroupRowNameWrapper from "../AreCommon/GroupRowNameWrapper/GroupRowNameWrapper"
import WrapperContentCentr from '../AreCommon/WrapperContentCentr/WrapperContentCentr'
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData } from "../../store/reduser";
import ShowMore from "../AreCommon/ShowMore/ShowMore"
import { useState } from "react"

export default function Group() {
  const [showMoreActiv, setShowMoreActiv] = useState(8)
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  const dispatch = useDispatch()

  function addGroupFunc() {
    dispatch(setActiveRow(activRight.addGroup))
  }

  function showMoreActivClick() {
    setShowMoreActiv(n => n * 2)
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
        <WrapperContentCentr label="Записей не найдено. Добавьте новое предприятие" actionLk={actionLk.getGroupData} count={showMoreActiv}/>
      </div>
      <div>
        <ShowMore label={'Показать еще'} click={showMoreActivClick}/>
      </div>
    </div>
  )
}