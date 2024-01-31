import ButtonAdd from "../AreCommon/ButtonAdd/ButtonAdd"
import SearchData from "../AreCommon/Search/SearchData"
import DownloadReport from "../AreCommon/DownloadReport/DownloadReport"
import GroupRowNameWrapper from "../AreCommon/GroupRowNameWrapper/GroupRowNameWrapper"
import WrapperContentCentr from '../AreCommon/WrapperContentCentr/WrapperContentCentr'
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, actionLkData, nameRowData, setSelectSubdivision, setUpdateLeftContent } from "../../store/reduser";
import ShowMore from "../AreCommon/ShowMore/ShowMore"
import { useState, useEffect } from "react"
import CompanyCard from "./CompanyCard/CompanyCard"
import EditGroup from "../EditGroup/EditGroup"
import { url } from "../../../core/core"
import clickTableToExcel from "../../../core/clickTableToExcel"

export default function Group({setTabName}) {
  const [switchArrow, setSwitchArrow] = useState({arrow: ''})
  const [dataExcel, setDataExcel] = useState([])
  const [showMoreActiv, setShowMoreActiv] = useState(10)
  const [companyCardOpen, setCompanyCardOpen] = useState(true)
  const [companyCardData, setCompanyCardData] = useState({})
  const [dataInput, setDataInput] = useState({})
  const [backDisp, setBackDisp] = useState(1)
  const [dispCardOpen, setDispCardOpen] = useState(true)
  const [dispCardEdit, setDispCardEdit] = useState(true)
  let activRight = useSelector(activRightContent)
  let actionLk = useSelector(actionLkData)
  let nameRowDataLabel = useSelector(nameRowData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSelectSubdivision([])) // обнуляем массив подразделений диспетчера
  }, [])

  function addGroupFunc() {
    dispatch(setActiveRow(activRight.addGroup))
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

  function editDisp(data = {}) {
    setBackDisp(n => n + 1)
    companyCardDataSend(data)
    setDispCardEdit(!dispCardEdit)
    if(dispCardEdit) setTabName(nameRowDataLabel.editGroup)
    else setTabName(nameRowDataLabel.group)
  }

  function trashDisp(item) {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({trashGroup: item.id})
    
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

  function htmlTable(arr) {
    let str = ''

    for(let i = 0; i < arr.length; i++) {
      str += 
      `
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i]['nameGroup']}</td>
        <td>${arr[i]['supervisor']}</td>
        <td>${arr[i]['autoNumber']}</td>
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
      {dispCardEdit ? '' : <EditGroup editDisp={editDisp} companyCardData={companyCardData}/>}
      <CompanyCard companyCardOpen={companyCardOpen} companyCardOpenHide={companyCardOpenHide} companyCardData={companyCardData}/>
      <div className={dispCardEdit ? '' : 'disp-wrapper-hide' }>
        <div className={companyCardOpen ? 'group-wrapper' : 'group-wrapper-hide'}>
          <div className="group-row">
            <div className="group-row-menu">
              <ButtonAdd addFunc={addGroupFunc}/>
              <SearchData dataInputOnChange={dataInputOnChange} name={'searchData'}/>
              <DownloadReport clickDownload={clickTableToExcel('Таблица', 'Таблица.xls', htmlTable, dataExcel)}/>
            </div>
          </div>
          <div className="group-row-name-wrapper">
            <GroupRowNameWrapper setSwitchArrow={setSwitchArrow}/>
            <WrapperContentCentr label="Записей не найдено. Добавьте новое предприятие" actionLk={actionLk.getGroupData} count={showMoreActiv} companyCardOpenHide={companyCardOpenHide} setDispCardEdit={editDisp} trashDisp={trashDisp} sort={dataInput} switchArrow={switchArrow} setDataExcel={setDataExcel}/>
          </div>
          <div>
            <ShowMore label={'Показать еще'} click={showMoreActivClick}/>
          </div>
        </div>
      </div>
      
    </>
    
  )
}