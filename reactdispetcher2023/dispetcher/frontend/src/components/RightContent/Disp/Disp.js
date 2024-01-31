import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import DispRowNameWrapper from "../AreCommon/DispRowNameWrapper/DispRowNameWrapper"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import ListDataNumber from "../AreCommon/ListDataNumber/ListDataNumber"
import SearchData from "../AreCommon/Search/SearchData"
import SelectData from "../AreCommon/SelectData/SelectData"
import WrapperContentCentr from "../AreCommon/WrapperContentCentr/WrapperContentCentr"
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData, nameRowData, setUpdateLeftContent, updateLeftContent } from "../../store/reduser";
import { useState, useEffect } from "react"
import DispCard from "./DispCard/DispCard"
import EditDisp from "../EditDisp/EditDisp"
import { url } from "../../../core/core"
import clickTableToExcel from "../../../core/clickTableToExcel"
import ShowMore from "../AreCommon/ShowMore/ShowMore"

export default function Disp({setTabName}) {
  const [dataInput, setDataInput] = useState('')
  const [dataExcel, setDataExcel] = useState([])
  const [switchArrow, setSwitchArrow] = useState({arrow: ''})
  const [groupArr, setGroup] = useState([])
  const [backDisp, setBackDisp] = useState(1)
  const [dispCardOpen, setDispCardOpen] = useState(true)
  const [dispCardEdit, setDispCardEdit] = useState(true)
  const [companyCardData, setCompanyCardData] = useState({})
  const [showMoreActiv, setShowMoreActiv] = useState(10)
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  let nameRowDataLabel = useSelector(nameRowData)
  const dispatch = useDispatch()

  useEffect(() => {
    backDataGroup()
  }, [])

  function divideArr(arrData) {
    let group = []
    for(let i = 0; i < arrData.length; i++) {
      group.push(arrData[i].nameGroup)
    }
    group = [...new Set(group)]
    group.unshift('Выбрать предприятие')
    setGroup(group)
  }

  function backDataGroup() {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({'getGroupData': true})
    
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
    setBackDisp(n => n + 1)
    companyCardDataSend(data)
    setDispCardEdit(!dispCardEdit)
    if(dispCardEdit) setTabName(nameRowDataLabel.editDisp)
    else setTabName(nameRowDataLabel.disp)
  }

  function trashDisp(item) {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({trashDisp: item.id})
    
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
        <td>${arr[i]['userName']}</td>
        <td>${arr[i]['jobTitle']}</td>
        <td>${arr[i]['telephone']}</td>
        <td>${arr[i]['userGroup']}</td>
        <td>${arr[i]['auto']}</td>
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
      {dispCardEdit ? '' : <EditDisp editDisp={editDisp} companyCardData={companyCardData}/>}
      <DispCard dispCardOpen={dispCardOpen} dispCardOpenHide={dispCardOpenHide} dispCardData={companyCardData}/>
      <div className={dispCardEdit ? '' : 'disp-wrapper-hide' }>
        <div className={dispCardOpen ? 'disp-wrapper' : 'disp-wrapper-hide' }>
          <div className="disp-row">
            <div className="disp-row-menu">
              <ButtonAdd addFunc={addDispFunc}/>
              <SearchData dataInputOnChange={dataInputOnChange} name={'searchData'}/>
              <SelectData namePlaceholder={'Выбрать предприятие'} nameArr={groupArr} name={'dispGroup'} dataInputOnChange={dataInputOnChange}/>
              <DownloadReport clickDownload={clickTableToExcel('Таблица', 'Таблица.xls', htmlTable, dataExcel)}/>
            </div>
            <div>
              <ListDataNumber setShowMoreActiv={setShowMoreActiv}/>
            </div>
          </div>
          <div className="disp-row-name-wrapper">
            <DispRowNameWrapper setSwitchArrow={setSwitchArrow}/>
            <WrapperContentCentr label="Записей не найдено. Добавьте нового диспетчера" actionLk={actionLk.getDispData} count={showMoreActiv} companyCardOpenHide={dispCardOpenHide} setDispCardEdit={editDisp} backDisp={backDisp} showMoreActiv={showMoreActiv} trashDisp={trashDisp} sort={dataInput} switchArrow={switchArrow} setDataExcel={setDataExcel}/>
          </div>
          <div>
            <ShowMore label={'Показать еще'} click={showMoreActivClick}/>
          </div>
        </div>
      </div>
    </>
  )
}