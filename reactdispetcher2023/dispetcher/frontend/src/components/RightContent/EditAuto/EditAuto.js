import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput";
import { useState, useEffect } from "react";
import ButtonEdit from "../AreCommon/ButtonEdit/ButtonEdit";
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation";
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, setSelectSubdivision, setUpdateLeftContent, userDataStore } from "../../store/reduser";
import { url } from '../../../core/core';
import AddRowNameSelectAuto from "../AreCommon/AddRowNameSelectAuto/AddRowNameSelectAuto";

export default function EditAuto({editDisp, companyCardData}) {
  const [dataInput, setDataInput] = useState({})
  const [arrGroup, setArrGroup] = useState([])
  const [valueInput, setValueInput] = useState('');

  let activRight = useSelector(activRightContent)
  let userData = useSelector(userDataStore)
  const dispatch = useDispatch()

  
  useEffect(() => {
    setDataInput({marc: companyCardData.marc, gossNumber: companyCardData.gossNumber, yearOfIssue: companyCardData.yearOfIssue, view: companyCardData.view, driver: companyCardData.driver, telephone: companyCardData.telephone, status: companyCardData.status})
  }, [])

  function cancellation() { // переход в disp
    editDisp()
  }

  function dataInputBack() {
    let lengthDataInput = Object.keys(dataInput).length
    if(lengthDataInput >= 7) {
      let count = 0
      for(let key in dataInput) {
        if(dataInput[key] == '') count++
      }

      if(count == 0) {
        if(isNaN(Number(dataInput.telephone))) {
          alert('Введите верный сотовый номер')
        } else {
          if((dataInput.telephone).length == 11) {
            if((dataInput.yearOfIssue).length == 4) {
              if(isNaN(Number(dataInput.yearOfIssue))) {
                alert('Введите верный год выпуска')
              } else {
                dataInput.userGroup = userData.userGroup
                dataInput.userSubdivision = userData.userSubdivision
                dataInput.idDisp = userData.id
                dataInput.id = companyCardData.id

                fetch(url.urlBack1, {
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify({updateAuto: dataInput})
                
                  })
                  .then(data => {
                    return data.text()
                  })
                  .then(data => {
                    if(data != 'null') {
                      console.log(data)
                      // alert('Такой госс номер уже существует')
                    } else {
                        //переход в auto
                        cancellation()
                    }
              
                  })
                  .catch((er) => {
                    console.log(er)
                  })
              }
              

            } else alert('Введите верный год выпуска')
            

          } else alert('Введите верный сотовый номер')
        
        }
        
      } else alert('Заполните все поля!')

    } else {
      alert('Заполните все поля!')
  
    }
  }

  function dataInputOnChange(event, inputData = false) { // данные из всех input
    if(!inputData) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setDataInput(n => ({...n, [name]: value.trim()}))
    } else {
      setDataInput(n => {
        setValueInput('')

        return ({...n, [inputData[0]]: (inputData[1]).trim()})
      })
    }
  }

  return(
    <div className="addDisp-wrap">
      <AddRowNameInput dataName={'Марка'} placeholder={'Введите название'} name={'marc'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.marc}/>
      <AddRowNameInput dataName={'Государственный номер'} placeholder={'Введите номер'} name={'gossNumber'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.gossNumber}/>
      <AddRowNameInput dataName={'Год выпуска'} placeholder={'Введите год'} name={'yearOfIssue'} dataInputOnChange={dataInputOnChange} type={'tel'}  defaultValue={companyCardData.yearOfIssue}/>
      <AddRowNameSelectAuto dataName={'Вид'} placeholder={'Выберите вид'} name={'view'} dataInputOnChange={dataInputOnChange} arrData={['Аренда', 'Собственность']} defaultValue={companyCardData.view}/>
      <AddRowNameInput dataName={'Водитель'} placeholder={'Введите ФИО'} name={'driver'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.driver} />
      <AddRowNameInput dataName={'Телефон'} placeholder={'Введите телефон'} name={'telephone'} dataInputOnChange={dataInputOnChange} defaultValue={companyCardData.telephone} />
      <AddRowNameSelectAuto dataName={'Статус'} placeholder={'Выберите статус'} name={'status'} dataInputOnChange={dataInputOnChange} arrData={['Работает', 'Отпуск', 'На ремонте']} defaultValue={companyCardData.status}/>
      <div className="addDisp-panell-button">
        <ButtonEdit name={'Сохранить'} dataInputBack={dataInputBack}/>
        <div className="addDisp-delimiter"></div>
        <ButtonCancellation name={'Отмена'} cancellation={cancellation}/>
      </div>
    </div>
  )
}