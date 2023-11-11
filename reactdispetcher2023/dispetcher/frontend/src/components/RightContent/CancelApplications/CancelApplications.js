import img from './image/x.png'
import { useDispatch, useSelector } from 'react-redux';
import { setCancelApplications, cancelApplicationsObj, setActiveRow, activRightContent, setCancelApplicationsObj} from "../../store/reduser";
import { useState, useEffect } from "react"
import { url } from "../../../core/core"
import ButtonCreate from '../AreCommon/ButtonCreate/ButtonCreate'

export default function CancelApplications() {
  const [textAreaDate, setTextAreaDate] = useState('')
  let uploadingData = useSelector(cancelApplicationsObj)
  let activRight = useSelector(activRightContent)
  const dispatch = useDispatch()
  
 
  useEffect(() => {
    
    
  }, [uploadingData])

  const delay = ms => new Promise(res => setTimeout(res, ms));

  function dateApplications(number = '', numberHours = '', timeOfUseOfTransport = '') {
    let date = new Date()
    date.setFullYear(number[6] + number[7] + number[8] + number[9]);
    date.setMonth(number[3] + number[4]);
    date.setDate(number[0] + number[1]);
    date.setHours(numberHours[0] + numberHours[1]);
    date.setMinutes(0);
    let timeOfUse = timeOfUseOfTransport * 3600000
    let dateTime = date.getTime()
    let dateFull = new Date(timeOfUse + dateTime)
  
    let day = String(dateFull.getDate())
    let month = String(dateFull.getMonth())
    let hours = String(dateFull.getHours())
    let minutes = String(dateFull.getMinutes())
  
    if(day.length < 2) day = '0' + day
    if(month.length < 2) month = '0' + month
    if(hours.length < 2) hours = '0' + hours
    if(minutes.length < 2) minutes = '0' + minutes
  
    return `${hours}:00}`
  }

  function trashAppYes(gossNumber, item) {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({trashApplicationsYes: gossNumber})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        if(data != 'null') {
          data = JSON.parse(JSON.parse(data))

          for(let key in data) {
            for(let key2 in item) {
              if(key == key2) {
                for(let key3 in item[key2]) {
                  for(let key4 in data[key]) {
                    if(key3 == key4) {
                      delete data[key][key4]
                    }
                  }
                }
              }
            }
          }
          
          fetch(url.urlBack1, {
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({trashApplicationsYesFreeTime: [JSON.stringify(data), gossNumber]})
          
            })
            .then(data => {
              return data.text()
            })
            .then(data => {
              if(data != 'null') {
                console.log(data)
              } else {
                
              }
            })
            .catch((er) => {
              console.log(er)
            })

        } else {
          
        }
      })
      .catch((er) => {
        console.log(er)
      })
  }

  function toBack(data) {
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({cancelApplications: data})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        if(data != 'null') {
          console.log(data)
        } else {
          
        }
      })
      .catch((er) => {
        console.log(er)
      })
  }

  function changeTextArea(event)  {
    setTextAreaDate(event.target.value)
  }

  function close() {
    dispatch(setCancelApplications(false))
  }

  async function dataInputBack() {
    if(textAreaDate.trim() != '') {
      for(let key in uploadingData) {
        toBack([textAreaDate.trim(), 'Отклонена', uploadingData[key]['id']])
        dispatch(setCancelApplicationsObj({...uploadingData[key], status: "Отклонена"}))
        await delay(100)
        try {
          trashAppYes(uploadingData[key]['gossNumber'], {[uploadingData[key]['dateOfApplication']] : {[uploadingData[key]['submissionTime']] : dateApplications(uploadingData[key]['dateOfApplication'], uploadingData[key]['submissionTime'], uploadingData[key]['timeOfUseOfTransport'])}})

        } catch(er) {
          console.log(er)
        }
      }

      dispatch(setCancelApplications(false))
    } 
  }

  return(
    <div className="cancelApplications-wrap">
      <div className="cancelApplications-data">
        <div className="cancelApplications-field">
          <div className="cancelApplications-row">
            <div className='cancelApplications-row-label'>Введите причину отклонения</div>
            <div>
              <img src={img} alt="" onClick={close}/>
            </div>
          </div>
          <div>
            <textarea style={{resize: "none"}} onChange={changeTextArea}></textarea>
          </div>
          <div className='cancelApplications-field-button'>
            <ButtonCreate name={'Отправить'} dataInputBack={dataInputBack} img={false}/>
          </div>
        </div>
      </div>
    </div>
  )
}