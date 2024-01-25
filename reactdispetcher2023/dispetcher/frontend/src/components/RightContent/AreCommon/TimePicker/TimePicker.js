import img from './images/Icon.png'
import clean from './images/Vector.png'
import { useState, useRef } from 'react'

export default function TimePicker({name = '', dataInputOnChange = () => {}}) {
  const [dateOne, setDateOne] = useState('')
  const [dateTwo, setDateTwo] = useState('')
  const [oneTwo, setOneTwo] = useState(true)
  const refOne = useRef()

  function inputChange(event) {
    let value = event.target.value
    let date = value[0] + value[1] + ':' + value[3] + value[4]
   
    if(oneTwo) {
      refOne.current.value = ''
      setDateOne(date)
      setOneTwo(!oneTwo)
      dataInputOnChange(event, [(name += 'One'), value])

      setTimeout(() => {
        refOne.current.showPicker()
      }, 100)

    } else {
      refOne.current.value = ''
      setDateTwo(date)
      setOneTwo(!oneTwo)
      dataInputOnChange(event, [name, value])
    }
  }

  function cleanInput() {
    refOne.current.value = ''
    setDateOne('')
    setDateTwo('')
    setOneTwo(true)
    dataInputOnChange(event, [name, ''])
    dataInputOnChange(event, [(name += 'One'), ''])
  }


  return(
    <>
    <style>
      {`.timepicker-wrapp input::-webkit-calendar-picker-indicator { background: url(${img}) }`}
      {`.timepicker-wrapp input::-webkit-calendar-picker-indicator { width: 10px}`}
      {`.timepicker-wrapp input::-webkit-calendar-picker-indicator { height: 10px}`}
    </style>
    <div className="timepicker-wrapp" >
      <div className="timepicker-calendar">
        {dateOne == '' ? 'Свободные авто по времени' : `${dateOne}-${dateTwo}`}
      </div>
      <div className={dateTwo == '' ? 'timepicker-hide' : 'timepicker-clean'}>
        <img src={clean} alt="" onClick={cleanInput} />
      </div>
      <input type="time" name={name} defaultValue={"08:00"} list="time-list" onChange={inputChange} ref={refOne}/>
      <datalist id="time-list">
        <option value="08:00"/>
        <option value="08:30"/>
        <option value="09:00"/>
        <option value="09:30"/>
        <option value="10:00"/>
        <option value="10:30"/>
        <option value="11:00"/>
        <option value="11:30"/>
        <option value="12:00"/>
        <option value="12:30"/>
        <option value="13:00"/>
        <option value="13:30"/>
        <option value="14:00"/>
        <option value="14:30"/>
        <option value="15:00"/>
        <option value="15:30"/>
        <option value="16:00"/>
        <option value="16:30"/>
        <option value="17:00"/>
        <option value="17:30"/>
        <option value="18:00"/>
        <option value="18:30"/>
        <option value="19:00"/>
        <option value="19:30"/>
        <option value="20:00"/>
        <option value="20:30"/>
        <option value="21:00"/>
      </datalist>
    </div>
    </>
    
  )
}