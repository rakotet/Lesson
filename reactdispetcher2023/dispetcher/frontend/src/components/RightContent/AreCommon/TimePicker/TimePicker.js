import img from './images/Icon.png'
import clean from './images/Vector.png'
import { useState } from 'react'

export default function TimePicker() {
  const [dateOne, setDateOne] = useState('')
  const [dateTwo, setDateTwo] = useState('')
  const [oneTwo, setOneTwo] = useState(true)

  function inputChange(event) {
    let value = event.target.value
    let date = value[0] + value[1] + ':' + value[3] + value[4]
   
    if(oneTwo) {
      setDateOne(date)
      setOneTwo(!oneTwo)
    } else {
      setDateTwo(date)
      setOneTwo(!oneTwo)
    }
  }

  function cleanInput() {
    setDateOne('')
    setDateTwo('')
    setOneTwo(true)
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
      <input type="time" name="time" defaultValue={'00:00'} onChange={inputChange}/>
    </div>
    </>
    
  )
}