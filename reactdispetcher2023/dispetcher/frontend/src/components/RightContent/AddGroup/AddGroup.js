import AddRowNameInput from "../AreCommon/AddRowNameInput/AddRowNameInput"
import ButtonCancellation from "../AreCommon/ButtonCancellation/ButtonCancellation"
import ButtonCreate from "../AreCommon/ButtonCreate/ButtonCreate"
import { useState } from "react"

export default function AddGroup() {
  const [plusSubdivision, setPlusSubdivision] = useState(1)
  const [dataInput, setDataInput] = useState({})

  function addSubdivision() {
    setPlusSubdivision(n => n + 1)
  }

  return(
    <div className="addGroup-wrap">
      <AddRowNameInput dataName={'Название предприятия'} placeholder={'Введите название'} name={''}/>
      <AddRowNameInput dataName={'Руководитель'} placeholder={'Введите руководителя'} name={''}/>
      <h4>Подразделения</h4>
      <h4>{plusSubdivision}</h4>
      <AddRowNameInput dataName={'Название подразделения'} placeholder={'Введите название'} name={''}/>
      <AddRowNameInput dataName={'Руководитель'} placeholder={'Введите руководителя'} name={''}/>

      {/* <h4>2</h4>
      <AddRowNameInput dataName={'Название подразделения'} placeholder={'Введите название'} name={''}/>
      <AddRowNameInput dataName={'Руководитель'} placeholder={'Введите руководителя'} name={''}/> */}
      
      <div className="addGroup-add-subdivision" onClick={addSubdivision}>Добавить подразделение</div>
      <div className="addGroup-panell-button">
        <ButtonCreate name={'Создать'}/>
        <div className="addGroup-delimiter"></div>
        <ButtonCancellation name={'Отмена'}/>
      </div>
    </div>
  )
}