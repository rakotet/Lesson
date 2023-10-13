import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput";
import { useState, useEffect } from "react";
import ButtonCreate from "../AreCommon/ButtonCreate/ButtonCreate";
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation";
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, setSelectSubdivision, setUpdateLeftContent } from "../../store/reduser";
import { url } from '../../../core/core';
import AddRowNameSelect from "../AreCommon/AddRowNameSelect/AddRowNameSelect";
import AddRowNameSelectTwo from "../AreCommon/AddRowNameSelectTwo/AddRowNameSelectTwo";

export default function AddDisp() {
  const [dataInput, setDataInput] = useState({})
  const [arrGroup, setArrGroup] = useState([])
  const [valueInput, setValueInput] = useState('');
  let activRight = useSelector(activRightContent)
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
    backDataGroup()
  }, [])

  function cancellation() { // переход в disp
    dispatch(setActiveRow(activRight.disp))
    dispatch(setSelectSubdivision([]))
  }

  function dataInputBack() {
    let lengthDataInput = Object.keys(dataInput).length
    if(lengthDataInput == 8) {
      let count = 0
      for(let key in dataInput) {
        if(dataInput[key] == '') count++
      }

      if(count == 0) {
        if(isNaN(Number(dataInput.telephone))) {
          alert('Введите верный сотовый номер')
        } else {
          if((dataInput.telephone).length == 11) {
           
            fetch(url.urlBack1, {
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({dataInputDisp: dataInput})
            
              })
              .then(data => {
                return data.text()
              })
              .then(data => {
                if(data != 'null') {
                  alert('Такой login уже существует')
                } else {
                    // переход в disp
                    dispatch(setUpdateLeftContent(dataInput.login))
                    dispatch(setSelectSubdivision([]))
                    dispatch(setActiveRow(activRight.disp))
                }
          
              })
              .catch((er) => {
                console.log(er)
              })

          } else alert('Введите верный сотовый номер')
        
        }
        
      } else alert('Заполните все поля!')

    } else alert('Заполните все поля!')
  }


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

        dispatch(setSelectSubdivision(divisions))
        delete dataInput.dispSubdivision
        setValueInput('')

        return ({...n, [inputData[0]]: inputData[1]})
      })
    }
  }

  function dataInputOnChangeTwo(inputData) {
    setDataInput(n => ({...n, [inputData[0]]: inputData[1]}))
  }

  return(
    <div className="addDisp-wrap">
      <AddRowNameInput dataName={'Фамилия Имя Отчество'} placeholder={'Введите ФИО'} name={'userName'} dataInputOnChange={dataInputOnChange}/>
      <AddRowNameInput dataName={'Должность'} placeholder={'Введите должность'} name={'jobTitle'} dataInputOnChange={dataInputOnChange}/>
      <AddRowNameInput dataName={'Телефон'} placeholder={'Введите телефон'} name={'telephone'} dataInputOnChange={dataInputOnChange} type={'tel'}/>
      <AddRowNameInput dataName={'Электронная почта'} placeholder={'Введите почту'} name={'email'} dataInputOnChange={dataInputOnChange} />
      <AddRowNameSelect dataName={'Предприятие'} placeholder={'Выберите предприятие'} name={'userGroup'} dataInputOnChange={dataInputOnChange} arrData={group}/>
      <AddRowNameSelectTwo dataName={'Подразделение'} placeholder={'Выберите подразделение'} name={'userSubdivision'} dataInputOnChange={dataInputOnChangeTwo} valueInput={valueInput} setValueInput={setValueInput}/>
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