import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput"
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation"
import ButtonCreate from "../AreCommon/ButtonCreate/ButtonCreate"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow, setUpdateLeftContent, setWrapperContentCentrUpdate } from "../../store/reduser";
import { setSelectSubdivision, setDispSelectTwo } from "../../store/reduser";
import { url } from '../../../core/core';

export default function EditGroup({editDisp, companyCardData}) {
  const [plusSubdivision, setPlusSubdivision] = useState([1])
  const [dataInput, setDataInput] = useState({})
  const [numberAuto, setNumberAuto] = useState({})
  let activRight = useSelector(activRightContent)
  const dispatch = useDispatch()
  let divisions = {}
  let arrDivisions = []
  let objDivisionAuto = {}

  useEffect(() => {
    divisions = {...JSON.parse(companyCardData.divisions)}

    let arr = {}
    let count = 0
    
    for (let key in divisions) {
      if(divisions[key]['autoNumber'] && divisions[key]['autoNumber'] != 0) {
        let obj = {autoNumber: divisions[key]['autoNumber']}
        objDivisionAuto[key] = {...obj}
      }

      arrDivisions.push(divisions[key])

      count++
      arr[`nameDivisions-${count}`] = divisions[key]['nameDivisions']
      arr[`nameDivisionsSupervisor-${count}`] = divisions[key]['nameDivisionsSupervisor']
      
    }

    setNumberAuto({...objDivisionAuto})
    setPlusSubdivision(arrDivisions)
    arrDivisions = []

    setDataInput({nameGroup: companyCardData.nameGroup, nameGroupSupervisor: companyCardData.supervisor, ...arr})

  }, [])

  function addSubdivision() { // массив для количества подразделений
    setPlusSubdivision(n => [...n, 1])
  }

  function cancellation() { // переход в group
    editDisp()
    dispatch(setSelectSubdivision([]))
    dispatch(setWrapperContentCentrUpdate(Math.random()))
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
        let obj = {}

        for(let i = 0; i < Object.keys(rest).length; i++) { // разделение на объекты подразделений
          for(let key in rest) {
            if(key.split('-')[1] == i + 1) {
              obj[`division-${i + 1}`] = {...obj[`division-${i + 1}`], autoNumber: 0}
              obj[`division-${i + 1}`] = {...obj[`division-${i + 1}`], [`${key.split('-')[0]}`]: rest[`${key}`]}
            }
          }
        }

        for (let key in obj) {
          if(numberAuto[key]) {
            obj[key]['autoNumber'] = numberAuto[key]['autoNumber']
          }
        }

        objInputs = {id: companyCardData.id, nameGroup, nameGroupSupervisor, divisions: obj}

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
                cancellation()
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
      <AddRowNameInput dataName={'Название предприятия'} placeholder={'Введите название'} name={'nameGroup'} dataInputOnChange={dataInputOnChange} defaultValue={dataInput.nameGroup}/>
      <AddRowNameInput dataName={'Руководитель'} placeholder={'Введите руководителя'} name={'nameGroupSupervisor'} dataInputOnChange={dataInputOnChange} defaultValue={dataInput.nameGroupSupervisor}/>
      <h4>Подразделения</h4>
      {
        plusSubdivision.map((item, index) => {
          return (
            <div key={index}>
              <h4>{index + 1}</h4>
              <AddRowNameInput key={index} dataName={'Название подразделения'} placeholder={'Введите название'} name={`nameDivisions-${index + 1}`} dataInputOnChange={dataInputOnChange} defaultValue={item.nameDivisions}/>
              <AddRowNameInput key={index + 1} dataName={'Руководитель'} placeholder={'Введите руководителя'} name={`nameDivisionsSupervisor-${index + 1}`} dataInputOnChange={dataInputOnChange} defaultValue={item.nameDivisionsSupervisor}/>
            </div>
          )
        })
      }
      <div className="addGroup-add-subdivision" onClick={addSubdivision}>Добавить подразделение</div>
      <div className="addGroup-panell-button">
        <ButtonCreate name={'Сохранить'} dataInputBack={dataInputBack}/>
        <div className="addGroup-delimiter"></div>
        <ButtonCancellation name={'Отмена'} cancellation={cancellation}/>
      </div>
    </div>
  )
}