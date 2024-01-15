import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput"
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation"
import ButtonCreate from "../AreCommon/ButtonCreate/ButtonCreate"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, setUpdateLeftContent } from "../../store/reduser";
import { setSelectSubdivision, setDispSelectTwo } from "../../store/reduser";
import { url } from '../../../core/core';

export default function EditGroup({editDisp, companyCardData}) {
  const [plusSubdivision, setPlusSubdivision] = useState([1])
  const [dataInput, setDataInput] = useState({})
  let activRight = useSelector(activRightContent)
  const dispatch = useDispatch()

  console.log(companyCardData)

  function addSubdivision() { // массив для количества подразделений
    setPlusSubdivision(n => [...n, 1])
  }

  function cancellation() { // переход в group
    editDisp()
    dispatch(setSelectSubdivision([]))
  }

  function dataInputOnChange(event) { // данные из всех input
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setDataInput({...dataInput, [name]: value.trim()})
  }

  function dataInputBack() {
    // валидация полей
    let lengthDataInput = Object.keys(dataInput).length
    let lengthSubdivision = 2 * plusSubdivision.length + 2

    if(lengthSubdivision == lengthDataInput) {
      let count = 0;
      for (let key in dataInput) {
        if(dataInput[key] == '') count++
      }

      if(count == 0) {
        // отправда данных на сервер
        let objInputs = {...dataInput}
        const {nameGroup, nameGroupSupervisor, ...rest} = objInputs
        const obj = {}

        for(let i = 0; i < Object.keys(rest).length; i++) { // разделение на объекты подразделений
          for(let key in rest) {
            if(key.split('-')[1] == i + 1) {
              obj[`division-${i + 1}`] = {...obj[`division-${i + 1}`], autoNumber: 0}
              obj[`division-${i + 1}`] = {...obj[`division-${i + 1}`], [`${key.split('-')[0]}`]: rest[`${key}`]}
            }
          }
        }

        objInputs = {nameGroup, nameGroupSupervisor, divisions: obj}

        fetch(url.urlBack1, {
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({dataUpdateGroup: objInputs})
        
          })
          .then(data => {
            return data.text()
          })
          .then(data => {
            if(data != 'null') {
              alert('Такое предприятие уже существует')
            } else {
                // переход в group
                dispatch(setActiveRow(activRight.group))
                dispatch(setUpdateLeftContent(objInputs.nameGroup))
            }
      
          })
          .catch((er) => {
            console.log(er)
          })

      } else alert('Заполните все поля!')


    } else alert('Заполните все поля!')

  }

  return(
    <div className="addGroup-wrap">
      <AddRowNameInput dataName={'Название предприятия'} placeholder={'Введите название'} name={'nameGroup'} dataInputOnChange={dataInputOnChange}/>
      <AddRowNameInput dataName={'Руководитель'} placeholder={'Введите руководителя'} name={'nameGroupSupervisor'} dataInputOnChange={dataInputOnChange}/>
      <h4>Подразделения</h4>
      {
        plusSubdivision.map((item, index) => {
          return (
            <div key={index}>
              <h4>{index + 1}</h4>
              <AddRowNameInput key={index} dataName={'Название подразделения'} placeholder={'Введите название'} name={`nameDivisions-${index + 1}`} dataInputOnChange={dataInputOnChange}/>
              <AddRowNameInput key={index + 1} dataName={'Руководитель'} placeholder={'Введите руководителя'} name={`nameDivisionsSupervisor-${index + 1}`} dataInputOnChange={dataInputOnChange}/>
            </div>
          )
        })
      }
      <div className="addGroup-add-subdivision" onClick={addSubdivision}>Добавить подразделение</div>
      <div className="addGroup-panell-button">
        <ButtonCreate name={'Создать'} dataInputBack={dataInputBack}/>
        <div className="addGroup-delimiter"></div>
        <ButtonCancellation name={'Отмена'} cancellation={cancellation}/>
      </div>
    </div>
  )
}