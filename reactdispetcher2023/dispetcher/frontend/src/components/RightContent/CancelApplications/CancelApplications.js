import img from './image/x.png'
import snake from './image/snake.gif'
import { useDispatch, useSelector } from 'react-redux';
import { setCancelApplications, cancelApplicationsObj, setActiveRow, activRightContent, setCancelApplicationsObj} from "../../store/reduser";
import { useState, useEffect } from "react"
import { url } from "../../../core/core"
import ButtonCreate from '../AreCommon/ButtonCreate/ButtonCreate'

export default function CancelApplications() {
  const [textAreaDate, setTextAreaDate] = useState('')
  const [download, setDownload] = useState(true)
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
    date.setMinutes(numberHours[3] + numberHours[4]);
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
  
    return `${hours}:${Number(minutes) > 0 ? '30' : '00'}`
  }

  function trashAppYes(gossNumber, item) {
    // console.log(gossNumber)
    // console.log(item)
    // console.log('---------')
    fetch(url.urlBack1, {
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({trashApplicationsYes: [gossNumber, item]})
    
      })
      .then(data => {
        return data.text()
      })
      .then(data => {
        if(data != 'null') {
          console.log(data)
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
          //console.log(data)
        } else {
          
        }
      })
      .catch((er) => {
        console.log(er)
      })

      // fetch(url.urlBack1, {
      //   method: 'POST',
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded',
      //   },
      //   body: JSON.stringify({mailToCancel: data})
      
      //   })
      //   .then(data => {
      //     return data.text()
      //   })
      //   .then(data => {
      //     if(data != 'null') {
      //       //console.log(data)
      //     } else {
            
      //     }
      //   })
      //   .catch((er) => {
      //     console.log(er)
      //   })
  }

  function changeTextArea(event)  {
    setTextAreaDate(event.target.value)
  }

  function close() {
    dispatch(setCancelApplications(false))
  }

  async function dataInputBack() {
    // console.log('--------')
    // console.log(uploadingData)
    if(textAreaDate.trim() != '') {
      setDownload(!download)

      for(let key in uploadingData) {
        await delay(200)
        toBack([textAreaDate.trim(), 'Отклонена', uploadingData[key]['id'], uploadingData[key]['emailUserCreate']])
        dispatch(setCancelApplicationsObj({...uploadingData[key], status: "Отклонена"}))
        try {
          trashAppYes(uploadingData[key]['gossNumber'], {[uploadingData[key]['dateOfApplication']] : {[uploadingData[key]['submissionTime']] : dateApplications(uploadingData[key]['dateOfApplication'], uploadingData[key]['submissionTime'], uploadingData[key]['timeOfUseOfTransport'])}})

        } catch(er) {
          console.log(er)
        }
      }


      setDownload(!download)
      dispatch(setCancelApplications(false))
      
    } else alert('Введите причину')
  } 

  return(
    <div className="cancelApplications-wrap">
      <div className={download ? "cancelApplications-data" : "cancelApplications-data cancelApplications-data-white"}>
        <div className="cancelApplications-field">
          <div className="cancelApplications-row">
            <div className='cancelApplications-row-label'>Введите причину отклонения</div>
            <div>
              <img src={img} alt="" onClick={close}/>
            </div>
          </div>
          <div className="cancelApplications-textarea">
            {download ? <textarea style={{resize: "none"}} onChange={changeTextArea}></textarea> : <img src={snake}/>}
          </div>
          <div className='cancelApplications-field-button'>
            {download ? <ButtonCreate name={'Отправить'} dataInputBack={dataInputBack} img={false}/> : ''}
          </div>
        </div>
      </div>
    </div>
  )
}