import img from './images/calendar.png'
import clean from './images/Vector.png'
import { useState } from 'react'

export default function DatepickerAddApplications({name, onChange, defaultValue}) {
  const [dateOne, setDateOne] = useState('')

  function inputChange(event) {
    let value = event.target.value
    let date = value[8] + value[9] + '.' + value[5] + value[6] + '.' + value[0] + value[1] + value[2] + value[3]

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
      {`.datepicker-wrapp input::-webkit-calendar-picker-indicator { background: url(${img}) }`}
    </style>
    <div className="datepicker-wrapp datepickerAddApplications-wrap" >
      <div className="datepicker-calendar">
        {dateOne == '' ? '' : `${dateOne}`}
      </div>
      <div className={dateOne == '' ? 'datepicker-hide' : 'datepicker-clean datepickerAddApplications-clean'}>
        <img src={clean} alt="" onClick={cleanInput} />
      </div>
      <input type="date" name={name} defaultValue={defaultValue} onChange={inputChange}/>
    </div>
    </>
    
  )
}