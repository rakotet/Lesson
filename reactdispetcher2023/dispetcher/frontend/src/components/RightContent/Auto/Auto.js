import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import AutoRowNameWrapper from "../AreCommon/AutoRowNameWrapper/AutoRowNameWrapper"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData, nameRowData, setUpdateLeftContent, updateLeftContent } from "../../store/reduser";
import { useState, useEffect } from "react"
import { url } from "../../../core/core"
import clickTableToExcel from "../../../core/clickTableToExcel"
import Datepicker from "../AreCommon/Datepicker/Datepicker"
import TimePicker from "../AreCommon/TimePicker/TimePicker"
import EditAuto from "../EditAuto/EditAuto"
import AutoCard from "./AutoCard/AutoCard"
import ShowMore from "../AreCommon/ShowMore/ShowMore"

export default function Auto({setTabName}) {
  const [dataExcel, setDataExcel] = useState([])
  const [dataInput, setDataInput] = useState({})
  const [switchArrow, setSwitchArrow] = useState({arrow: ''})
  const [groupArr, setGroup] = useState([])
  const [dispCardOpen, setDispCardOpen] = useState(true)
  const [dispCardEdit, setDispCardEdit] = useState(true)
  const [showMoreActiv, setShowMoreActiv] = useState(10)
  const [companyCardData, setCompanyCardData] = useState({})
  const [backDisp, setBackDisp] = useState(1)
  const dispatch = useDispatch()

  let nameRowDataLabel = useSelector(nameRowData)
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)

  useEffect(() => {
    dispatch(setUpdateLeftContent(Math.random()))
    backDataGroup()
  }, [])

  function divideArr(arrData) {
    let group = []
    for(let i = 0; i < arrData.length; i++) {
      group.push(arrData[i].marc)
    }
    group = [...new Set(group)]
    group.unshift('Выбрать марку')
    setGroup(group)
  }

  function backDataGroup() {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({'getMarcAuto': true})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        data = JSON.parse(data)
        divideArr(data)
      })
      .catch((er) => {
        console.log(er)
      })
  }

  function addAutoFunc() {
    dispatch(setActiveRow(activRight.addAuto))
  }

  function dataInputOnChange(event, inputData = false) { // данные из всех input
    if(!inputData) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setDataInput(n => ({...n, [name]: value.trim()}))
    } else {
      setDataInput(n => ({...n, [inputData[0]]: (inputData[1]).trim()}))
    }
  }

  function dispCardOpenHide(data = {}) {
    companyCardDataSend(data)
    setDispCardOpen(!dispCardOpen)
    if(dispCardOpen) setTabName(nameRowDataLabel.autoCard)
    else setTabName(nameRowDataLabel.auto)
  }

  function dispCardOpenHideTwo() {
    //companyCardDataSend(data)
    setDispCardOpen(!dispCardOpen)
    if(dispCardOpen) setTabName(nameRowDataLabel.autoCard)
    else setTabName(nameRowDataLabel.auto)
  }

  function companyCardDataSend(data = {}) {
    setCompanyCardData(data)
  }

  function editDisp(data = {}) {
    setBackDisp(n => n + 1)
    companyCardDataSend(data)
    setDispCardEdit(!dispCardEdit)
    if(dispCardEdit) setTabName(nameRowDataLabel.editAuto)
    else setTabName(nameRowDataLabel.auto)
  }

  function trashDisp(item) {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({trashAuto: item.id})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        if(data != 'null') {
          console.log(data)
        } else {
          dispatch(setUpdateLeftContent(item.id))
        }
      })
      .catch((er) => {
        console.log(er)
      })
  }

  function showMoreActivClick() {
    setShowMoreActiv(n => n * 2)
  }

  function htmlTable(arr) {
    let str = ''

    for(let i = 0; i < arr.length; i++) {
      str += 
      `
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i]['marc'] + ' ' + arr[i]['gossNumber']}</td>
        <td>${arr[i]['driver'] + ' ' + arr[i]['telephone']}</td>
        <td>${arr[i]['yearOfIssue']}</td>
        <td>${arr[i]['view']}</td>
        <td>${arr[i]['status']}</td>
      </tr>
      `
    }

    return (
      `
        <table>
          <tbody>
           ${str}
          </tbody>
        </table>
      `
    )
  }

  return(
    <>
      {dispCardEdit ? '' : <EditAuto editDisp={editDisp} companyCardData={companyCardData}/>}
      <AutoCard dispCardOpen={dispCardOpen} dispCardOpenHide={dispCardOpenHideTwo} dispCardData={companyCardData}/>
      <div className={dispCardEdit ? '' : 'disp-wrapper-hide' }>
        <div className={dispCardOpen ? 'disp-wrapper' : 'disp-wrapper-hide' }>
          <div className="disp-row">
            <div className="disp-row-menu">
              <ButtonAdd addFunc={addAutoFunc}/>
              <SearchData dataInputOnChange={dataInputOnChange} name={'searchData'}/>
              <SelectData namePlaceholder={'Выбрать марку'} nameArr={groupArr} name={'autoMarc'} dataInputOnChange={dataInputOnChange}/>
              <Datepicker placeHolder={'Свободные авто по дате'} name={'calendarAutoDate'} dataInputOnChange={dataInputOnChange}/>
              <TimePicker name={'calendarAutoTime'} dataInputOnChange={dataInputOnChange}/>
              <DownloadReport clickDownload={clickTableToExcel('Таблица', 'Таблица.xls', htmlTable, dataExcel)}/>
            </div>
            <div>
              <ListDataNumber setShowMoreActiv={setShowMoreActiv}/>
            </div>
          </div>
          <div className="disp-row-name-wrapper">
            <AutoRowNameWrapper setSwitchArrow={setSwitchArrow}/>
            <WrapperContentCentr label="Записей не найдено. Добавьте новый автомобиль" actionLk={actionLk.getAutoData} count={showMoreActiv} companyCardOpenHide={dispCardOpenHide} setDispCardEdit={editDisp} backDisp={backDisp} showMoreActiv={showMoreActiv} trashDisp={trashDisp} sort={dataInput} switchArrow={switchArrow} setDataExcel={setDataExcel}/>
          </div>
          <div>
            <ShowMore label={'Показать еще'} click={showMoreActivClick}/>
          </div>
        </div>
      </div>
    </>
  )
}