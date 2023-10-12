import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import DispRowNameWrapper from "../AreCommon/DispRowNameWrapper/DispRowNameWrapper"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData, nameRowData } from "../../store/reduser";
import { useState, useEffect } from "react"
import DispCard from "./DispCard/DispCard"
import EditDisp from "../EditDisp/EditDisp"

export default function Disp({setTabName}) {
  const [dataInput, setDataInput] = useState({})
  const [dispCardOpen, setDispCardOpen] = useState(true)
  const [dispCardEdit, setDispCardEdit] = useState(true)
  const [companyCardData, setCompanyCardData] = useState({})
  const [showMoreActiv, setShowMoreActiv] = useState(10)
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  let nameRowDataLabel = useSelector(nameRowData)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('disp')
  }, [])

  function addDispFunc() {
    dispatch(setActiveRow(activRight.addDisp))
  }

  function dataInputOnChange(event, inputData = false) { // данные из всех input
    if(!inputData) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setDataInput(n => ({...n, [name]: value.trim()}))
    } else {
      setDataInput(n => ({...n, [inputData[0]]: inputData[1]}))
    }
  }

  function dispCardOpenHide(data = {}) {
    companyCardDataSend(data)
    setDispCardOpen(!dispCardOpen)
    if(dispCardOpen) setTabName(nameRowDataLabel.dispCard)
    else setTabName(nameRowDataLabel.disp)
  }

  function companyCardDataSend(data = {}) {
    setCompanyCardData(data)
  }

  function editDisp(data = {}) {
    companyCardDataSend(data)
    setDispCardEdit(!dispCardEdit)
    if(dispCardEdit) setTabName(nameRowDataLabel.editDisp)
    else setTabName(nameRowDataLabel.disp)
  }

  return(
    <>
      {dispCardEdit ? '' : <EditDisp editDisp={editDisp} companyCardData={companyCardData}/>}
      <DispCard dispCardOpen={dispCardOpen} dispCardOpenHide={dispCardOpenHide} dispCardData={companyCardData}/>
      <div className={dispCardEdit ? '' : 'disp-wrapper-hide' }>
        <div className={dispCardOpen ? 'disp-wrapper' : 'disp-wrapper-hide' }>
          <div className="disp-row">
            <div className="disp-row-menu">
              <ButtonAdd addFunc={addDispFunc}/>
              <SearchData />
              <SelectData namePlaceholder={'Выбрать предприятие'} nameArr={['test1','test2','test3','test4','test5']} name={'dispGroup'} dataInputOnChange={dataInputOnChange}/>
              <SelectData namePlaceholder={'Выбрать категорию'} nameArr={['test1','test2','test3']} name={'dispCategory'} dataInputOnChange={dataInputOnChange}/>
              <DownloadReport />
            </div>
            <div>
              <ListDataNumber />
            </div>
          </div>
          <div className="disp-row-name-wrapper">
            <DispRowNameWrapper />
            <WrapperContentCentr label="Записей не найдено. Добавьте нового диспетчера" actionLk={actionLk.getDispData} count={showMoreActiv} companyCardOpenHide={dispCardOpenHide} setDispCardEdit={editDisp}/>
          </div>
        </div>
      </div>
    </>
  )
}