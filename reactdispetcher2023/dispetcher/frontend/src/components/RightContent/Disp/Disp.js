import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import DispRowNameWrapper from "../AreCommon/DispRowNameWrapper/DispRowNameWrapper"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData } from "../../store/reduser";
import { useState } from "react"

export default function Disp() {
  const [dataInput, setDataInput] = useState({})
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  const dispatch = useDispatch()

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

  return(
    <div className="disp-wrapper">
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
        <WrapperContentCentr label="Записей не найдено. Добавьте нового диспетчера" actionLk={actionLk.getDispData}/>
      </div>
    </div>
  )
}