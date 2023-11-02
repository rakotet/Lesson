import img from './image/x.png'
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData, nameRowData, setUpdateLeftContent, updateLeftContent, assignAcarData, setAssignAcar } from "../../store/reduser";
import { useState, useEffect } from "react"
import { url } from "../../../core/core"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import Datepicker from "../AreCommon/Datepicker/Datepicker"
import AssignAcarRowNameWrapper from "../AreCommon/AssignAcarRowNameWrapper/AssignAcarRowNameWrapper"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"

export default function AssignAcarCard() {

  const dispatch = useDispatch()
  let assignAcar = useSelector(assignAcarData)

  useEffect(() => {

  }, [assignAcar])

  function close() {
    dispatch(setAssignAcar(false))
  }

  return(
    <div className={assignAcar ? "assignAcarCard-wrap" : "assignAcarCard-hide"}>
      <div className="assignAcarCard-data">
        <div className="assignAcarCard-field">
          <div className="assignAcarCard-row">
            <div>
              <span>
                {`Выберите авто для работы с заявкой на ${'08.09.2023'} с  ${'10:00'} по ${'12:00'}`}
              </span>
            </div>
            <div>
              <img src={img} alt="" onClick={close}/>
            </div>
          </div>
          <div className="assignAcarCard-field-row">
            <div className="assignAcarCard-field-row-menu">
              <SearchData />
              <SelectData namePlaceholder={'Выбрать марку'} nameArr={['test1','test2','test3','test4','test5']} name={'assignAcarCard-search'} dataInputOnChange={() => {}}/>
              <Datepicker placeHolder={'Свободные авто за период'} width={true}/>
            </div>
            <div>
              <ListDataNumber setShowMoreActiv={() => {}}/>
            </div>
          </div>
          <div className="assignAcarCard-row-name-wrapper">
            <AssignAcarRowNameWrapper />
            {/* <WrapperContentCentr label="Записей не найдено. Добавьте нового автомобиль" actionLk={actionLk.getAutoData} count={showMoreActiv} companyCardOpenHide={dispCardOpenHide} setDispCardEdit={editDisp} backDisp={backDisp} showMoreActiv={showMoreActiv} trashDisp={trashDisp}/> */}
          </div>
        </div>
      </div>
    </div>
  )
}