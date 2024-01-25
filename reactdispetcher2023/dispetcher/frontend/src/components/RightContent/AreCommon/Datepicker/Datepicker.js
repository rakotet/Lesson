import img from './images/calendar.png'
import clean from './images/Vector.png'
import { useState, useRef } from 'react'

export default function Datepicker({placeHolder, width = false, name = '', dataInputOnChange = () => {}}) {
  const [dateOne, setDateOne] = useState('')
  const [dateTwo, setDateTwo] = useState('')
  const [oneTwo, setOneTwo] = useState(true)
  const refOne = useRef()
  //const refTwo = useRef()

  function inputChangeOne(event) {
    let value = event.target.value
    let date = ''

    if(value) {
      date = value[8] + value[9] + '.' + value[5] + value[6] + '.' + value[0] + value[1] + value[2] + value[3]

      if(oneTwo) {
        setDateOne(date)
        setOneTwo(!oneTwo)
        refOne.current.value = ''
        dataInputOnChange(event, [(name += 'One'), value])
  
        setTimeout(() => {
          refOne.current.showPicker()
        }, 100)
  
      } else {
        setDateTwo(date)
        setOneTwo(!oneTwo)
        refOne.current.value = ''
        dataInputOnChange(event, [name, value])
      }

    } else {
      setDateOne('')
      setDateTwo('')
      setOneTwo(true)
      dataInputOnChange(event, [name, ''])
      dataInputOnChange(event, [(name += 'One'), ''])
    }
  }

  function cleanInput() {
    refOne.current.value = ''
    //refTwo.current.value = ''
    setDateOne('')
    setDateTwo('')
    setOneTwo(true)
    dataInputOnChange(event, [name, ''])
    dataInputOnChange(event, [(name += 'One'), ''])
  }

  return(
    <>
      <style>
        {`.datepicker-wrapp input::-webkit-calendar-picker-indicator { background: url(${img}) }`}
      </style>
      <div className="datepicker-wrapp">
        <div className={width ? "datepicker-calendar datepicker-calendar-width" : "datepicker-calendar"} >
          {dateOne == '' ? placeHolder : `${dateOne}-${dateTwo}`}
        </div>
        <div className={dateTwo == '' ? 'datepicker-hide' : 'datepicker-clean'}>
          <img src={clean} alt="" onClick={cleanInput} />
        </div>
        <input type="date" name={name} onChange={inputChangeOne} ref={refOne}/>
        {/* <input className="datepicker-data-hide" type="date" name={name} onChange={inputChangeTwo} ref={refTwo}/> */}
      </div>
    </>
    
  )
}