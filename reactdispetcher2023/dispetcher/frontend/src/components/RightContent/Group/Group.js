import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import SearchData from "../AreCommon/Search/SearchData"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import GroupRowNameWrapper from "../AreCommon/GroupRowNameWrapper/GroupRowNameWrapper"
import WrapperContentCentr from '../AreCommon/WrapperContentCentr/WrapperContentCentr'
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData, nameRowData } from "../../store/reduser";
import ShowMore from "../AreCommon/ShowMore/ShowMore"
import { useState } from "react"
import CompanyCard from "./CompanyCard/CompanyCard"

export default function Group({setTabName}) {
  const [showMoreActiv, setShowMoreActiv] = useState(8)
  const [companyCardOpen, setCompanyCardOpen] = useState(true)
  const [companyCardData, setCompanyCardData] = useState({})
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  let nameRowDataLabel = useSelector(nameRowData)
  const dispatch = useDispatch()

  function addGroupFunc() {
    dispatch(setActiveRow(activRight.addGroup))
  }

  function showMoreActivClick() {
    setShowMoreActiv(n => n * 2)
  }

  function companyCardOpenHide(data = {}) {
    companyCardDataSend(data)
    setCompanyCardOpen(!companyCardOpen)
    if(companyCardOpen) setTabName(nameRowDataLabel.companyCard)
    else setTabName(nameRowDataLabel.group)
  }

  function companyCardDataSend(data = {}) {
    setCompanyCardData(data)
  }

  return(
    <>
      <CompanyCard companyCardOpen={companyCardOpen} companyCardOpenHide={companyCardOpenHide} companyCardData={companyCardData}/>
      <div className={companyCardOpen ? 'group-wrapper' : 'group-wrapper-hide'}>
        <div className="group-row">
          <div className="group-row-menu">
            <ButtonAdd addFunc={addGroupFunc}/>
            <SearchData />
            <DownloadReport />
          </div>
        </div>
        <div className="group-row-name-wrapper">
          <GroupRowNameWrapper />
          <WrapperContentCentr label="Записей не найдено. Добавьте новое предприятие" actionLk={actionLk.getGroupData} count={showMoreActiv} companyCardOpenHide={companyCardOpenHide}/>
        </div>
        <div>
          <ShowMore label={'Показать еще'} click={showMoreActivClick}/>
        </div>
      </div>
    </>
    
  )
}