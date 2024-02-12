import img from './images/calendar.png'
import clean from './images/Vector.png'
import { useState, useEffect, useRef } from 'react'

export default function DatepickerAddApplications({name, onChange, defaultValue}) {
  const [dateOne, setDateOne] = useState(defaultValue)
  const refOne = useRef()

  useEffect(() => {

  }, [])

  function inputChange(event) {
    let value = event.target.value
    let date = ''

    if(Number(value[0] + value[1])) {
      date = value[8] + value[9] + '.' + value[5] + value[6] + '.' + value[0] + value[1] + value[2] + value[3]
    } else {
      date = ''
      refOne.current.value = ''
    }

    setDateOne(date)
    onChange(date, name)
    // refOne.current.value = ''
  }

  function cleanInput() {
    setDateOne('')
    onChange('', name)
    refOne.current.value = ''
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
      <input type="date" name={name} defaultValue={defaultValue} onInput={inputChange} ref={refOne}/>
    </div>
    </>
    
  )
}