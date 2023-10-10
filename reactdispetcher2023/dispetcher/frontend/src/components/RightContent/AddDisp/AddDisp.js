import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput";
import { useState, useEffect } from "react";
import ButtonCreate from "../AreCommon/ButtonCreate/ButtonCreate";
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation";
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, selectSubdivision, setSelectSubdivision } from "../../store/reduser";
import { url } from '../../../core/core';
import AddRowNameSelect from "../AreCommon/AddRowNameSelect/AddRowNameSelect";

export default function AddDisp() {
  const [dataInput, setDataInput] = useState({})
  const [arrGroup, setArrGroup] = useState([])
  const [arrDivisions, setArrDivisions] = useState([1, 2])
  const [gg, setGg] = useState(1)
  let activRight = useSelector(activRightContent)
  let selectSub = useSelector(selectSubdivision)
  const dispatch = useDispatch()

  let group = []
  let divisions = []


  function divideArr(arrData) {
    for(let i = 0; i < arrData.length; i++) {
      group.push(arrData[i].nameGroup)
    }
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
        setArrGroup(n => [...data])
        divideArr(data)
      })
      .catch((er) => {
        console.log(er)
      })
  }

  useEffect(() => {
    console.log('add')
    backDataGroup()
  }, [selectSub])

  function cancellation() { // переход в disp
    dispatch(setActiveRow(activRight.disp))
  }

  function dataInputBack() {
    console.log(dataInput)
  }

  // function ss() {
  //   dispatch(setSelectSubdivision(divisions))
  // }

  function dataInputOnChange(event, inputData = false) { // данные из всех input
    if(!inputData) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setDataInput(n => ({...n, [name]: value.trim()}))
    } else {
      setDataInput(n => {
        let div = {}
        for(let i = 0; i < arrGroup.length; i++) {
          if(arrGroup[i].nameGroup == inputData[1]) {
            div = JSON.parse(arrGroup[i].divisions)
          }
        }

        for(let key in div) {
          divisions.push(div[`${key}`].nameDivisions)
        }

        //setArrDivisions(n => divisions)
        dispatch(setSelectSubdivision(divisions))

        return ({...n, [inputData[0]]: inputData[1]})
      })

       
    }
  }

  return(
    <div className="addDisp-wrap">
      {console.log(selectSub)}
      <AddRowNameInput dataName={'Фамилия Имя Отчество'} placeholder={'Введите ФИО'} name={'nameDispp'} dataInputOnChange={dataInputOnChange}/>
      <AddRowNameInput dataName={'Должность'} placeholder={'Введите должность'} name={'jobTitle'} dataInputOnChange={dataInputOnChange}/>
      <AddRowNameInput dataName={'Телефон'} placeholder={'Введите телефон'} name={'telephone'} dataInputOnChange={dataInputOnChange} type={'tel'}/>
      <AddRowNameSelect dataName={'Предприятие'} placeholder={'Выберите предприятие'} name={'dispGroup'} dataInputOnChange={dataInputOnChange} arrData={group}/>
      <AddRowNameSelect dataName={'Подразделение'} placeholder={'Выберите подразделение'} name={'dispSubdivision'} dataInputOnChange={dataInputOnChange} arrData={selectSub} selectSub={selectSub}/>
      <h4>Доступ</h4>
      <AddRowNameInput dataName={'Логин'} placeholder={'Введите логин'} name={'login'} dataInputOnChange={dataInputOnChange}/>
      <AddRowNameInput dataName={'Пароль'} placeholder={'Введите пароль'} name={'password'} dataInputOnChange={dataInputOnChange}/>
      <div className="addDisp-panell-button">
        <ButtonCreate name={'Создать'} dataInputBack={dataInputBack}/>
        <div className="addDisp-delimiter"></div>
        <ButtonCancellation name={'Отмена'} cancellation={cancellation}/>
      </div>
    </div>
  )
}