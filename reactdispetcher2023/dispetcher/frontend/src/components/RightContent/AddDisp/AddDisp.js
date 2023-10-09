import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput";
import { useState } from "react";
import ButtonCreate from "../AreCommon/ButtonCreate/ButtonCreate";
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation";
import { useDispatch, useSelector } from 'react-redux';
import { activRightContent, setActiveRow } from "../../store/reduser";
import { url } from '../../../core/core';
import AddRowNameSelect from "../AreCommon/AddRowNameSelect/AddRowNameSelect";

export default function AddDisp() {
  const [dataInput, setDataInput] = useState({})
  let activRight = useSelector(activRightContent)
  const dispatch = useDispatch()


  function cancellation() { // переход в disp
    dispatch(setActiveRow(activRight.disp))
  }

  function dataInputBack() {

  }

  function dataInputOnChange(event) { // данные из всех input
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setDataInput({...dataInput, [name]: value.trim()})
  }

  return(
    <div className="addDisp-wrap">
      <AddRowNameInput dataName={'Фамилия Имя Отчество'} placeholder={'Введите ФИО'} name={'nameDispp'} dataInputOnChange={dataInputOnChange}/>
      <AddRowNameInput dataName={'Должность'} placeholder={'Введите должность'} name={'jobTitle'} dataInputOnChange={dataInputOnChange}/>
      <AddRowNameInput dataName={'Телефон'} placeholder={'Введите телефон'} name={'telephone'} dataInputOnChange={dataInputOnChange}/>
      <AddRowNameSelect dataName={'Предприятие'} placeholder={'Выберите предприятие'} name={'dispGroup'} dataInputOnChange={()=>{}}/>
      <AddRowNameSelect dataName={'Подразделение'} placeholder={'Выберите подразделение'} name={'dispSubdivision'} dataInputOnChange={()=>{}}/>
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