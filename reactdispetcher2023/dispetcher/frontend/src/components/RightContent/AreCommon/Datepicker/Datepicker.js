import img from './images/calendar.png'
import clean from './images/Vector.png'
import { useState } from 'react'

export default function Datepicker() {
  const [dateOne, setDateOne] = useState('')
  const [dateTwo, setDateTwo] = useState('')
  const [oneTwo, setOneTwo] = useState(true)

  function inputChange(event) {
    let value = event.target.value
    let date = value[8] + value[9] + '.' + value[5] + value[6] + '.' + value[0] + value[1] + value[2] + value[3]
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
      {`.datepicker-wrapp input::-webkit-calendar-picker-indicator { background: url(${img}) }`}
    </style>
    <div className="datepicker-wrapp" >
      <div className="datepicker-calendar">
        {dateOne == '' ? 'Свободные авто по дате' : `${dateOne}-${dateTwo}`}
      </div>
      <div className={dateTwo == '' ? 'datepicker-hide' : 'datepicker-clean'}>
        <img src={clean} alt="" onClick={cleanInput} />
      </div>
      <input type="date" name="calendar" onChange={inputChange}/>
    </div>
    </>
    
  )
}