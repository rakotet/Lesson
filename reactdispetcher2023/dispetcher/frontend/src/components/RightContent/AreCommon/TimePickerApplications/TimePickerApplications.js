import img from './images/Icon.png'
import clean from './images/Vector.png'
import { useState } from 'react'

export default function TimePickerApplications({name, onChange, defaultValue}) {
  const [dateOne, setDateOne] = useState(defaultValue)

  function inputChange(event) {
    let value = event.target.value
    let twoValue = value[3] + value[4]

    if(Number(twoValue) > 0) {
      twoValue = '30'
    }

    let date = value[0] + value[1] + ':' + twoValue
   
    setDateOne(date)
    onChange(date, name)  
  }

  function cleanInput() {
    setDateOne('')
    onChange('', name)
  }

  return(
    <>
      <style>
        {`.timepicker-wrapp input::-webkit-calendar-picker-indicator { background: url(${img}) }`}
        {`.timepicker-wrapp input::-webkit-calendar-picker-indicator { width: 10px}`}
        {`.timepicker-wrapp input::-webkit-calendar-picker-indicator { height: 10px}`}
      </style>
      <div className="timepicker-wrapp timePickerApplications-wrap" >
        <div className="timepicker-calendar">
          {dateOne == '' ? '' : `${dateOne}`}
        </div>
        <div className={dateOne == '' ? 'timepicker-hide' : 'timepicker-clean timePickerApplications-clean'}>
          <img src={clean} alt="" onClick={cleanInput} />
        </div>
        <input type="time" name={name} defaultValue={defaultValue} onChange={inputChange}/>
      </div>
    </>
    
  )
}