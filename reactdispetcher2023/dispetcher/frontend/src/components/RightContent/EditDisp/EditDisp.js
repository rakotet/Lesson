import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput";
import { useState, useEffect } from "react";
import ButtonEdit from "../AreCommon/ButtonEdit/ButtonEdit";
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation";
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, setSelectSubdivision } from "../../store/reduser";
import { url } from '../../../core/core';
import AddRowNameSelectEditDisp from "../AreCommon/AddRowNameSelectEditDisp/AddRowNameSelectEditDisp";
import AddRowNameSelectTwoEditDisp from "../AreCommon/AddRowNameSelectTwoEditDisp/AddRowNameSelectTwoEditDisp";

export default function EditDisp({editDisp, companyCardData}) {
  const [dataInput, setDataInput] = useState({})
  const [arrGroup, setArrGroup] = useState([])
  const [valueInput, setValueInput] = useState(companyCardData.userSubdivision);
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
    console.log('editDisp')
    backDataGroup()
    setDataInput({userName: companyCardData.userName, jobTitle: companyCardData.jobTitle, telephone: companyCardData.telephone, email: companyCardData.email, userGroup: companyCardData.userGroup, userSubdivision: companyCardData.userSubdivision,})
  }, [])

  function cancellation() { // переход в disp
    editDisp()
    dispatch(setSelectSubdivision([]))
  }

  function dataInputBack() {
    console.log('dataInput1')
    console.log(dataInput)

    let lengthDataInput = Object.keys(dataInput).length
    if(lengthDataInput = 6) {
      let count = 0
      for(let key in dataInput) {
        if(dataInput[key] == '') count++
      }

      if(count == 0) {
        if(isNaN(Number(dataInput.telephone))) {
          alert('Введите верный сотовый номер')
        } else {
          if((dataInput.telephone).length == 11) {

            console.log('dataInputYes')
            console.log(dataInput)
           
            // fetch(url.urlBack1, {
            //   method: 'POST',
            //   header: {
            //     'content-type': 'application/x-www-form-urlencoded',
            //   },
            //   body: JSON.stringify({dataInputDisp: dataInput})
            
            //   })
            //   .then(data => {
            //     return data.text()
            //   })
            //   .then(data => {
            //     if(data != 'null') {
            //       alert('Такой login уже существует')
            //     } else {
            //         // переход в disp
            //         dispatch(setSelectSubdivision([]))
            //         dispatch(setActiveRow(activRight.disp))
            //     }
          
            //   })
            //   .catch((er) => {
            //     console.log(er)
            //   })

          } else alert('Введите верный сотовый номер')
        
        }
        
      } else alert('Заполните все поля!2')

    } else alert('Заполните все поля!1')
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
      {/* {console.log(companyCardData)} */}
      <AddRowNameInput dataName={'Фамилия Имя Отчество'} placeholder={'Введите ФИО'} name={'userName'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.userName}/>
      <AddRowNameInput dataName={'Должность'} placeholder={'Введите должность'} name={'jobTitle'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.jobTitle}/>
      <AddRowNameInput dataName={'Телефон'} placeholder={'Введите телефон'} name={'telephone'} dataInputOnChange={dataInputOnChange} type={'tel'} defaultValue={companyCardData.telephone}/>
      <AddRowNameInput dataName={'Электронная почта'} placeholder={'Введите почту'} name={'email'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.email}/>
      <AddRowNameSelectEditDisp dataName={'Предприятие'} placeholder={'Выберите предприятие'} name={'userGroup'} dataInputOnChange={dataInputOnChange} arrData={group}/>
      <AddRowNameSelectTwoEditDisp dataName={'Подразделение'} placeholder={'Выберите подразделение'} name={'userSubdivision'} dataInputOnChange={dataInputOnChangeTwo} valueInput={valueInput} setValueInput={setValueInput} />
      <div className="addDisp-panell-button">
        <ButtonEdit name={'Сохранить'} dataInputBack={dataInputBack}/>
        <div className="addDisp-delimiter"></div>
        <ButtonCancellation name={'Отмена'} cancellation={cancellation}/>
      </div>
    </div>
  )
}