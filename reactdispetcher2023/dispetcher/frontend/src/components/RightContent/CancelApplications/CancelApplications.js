import img from './image/x.png'
import { useDispatch, useSelector } from 'react-redux';
import { setCancelApplications, cancelApplicationsObj, setActiveRow, activRightContent, setCancelApplicationsObj} from "../../store/reduser";
import { useState, useEffect } from "react"
import { url } from "../../../core/core"
import ButtonCreate from '../AreCommon/ButtonCreate/ButtonCreate'

export default function CancelApplications() {
  const [textAreaDate, setTextAreaDate] = useState('')
  let cancelApplicationsDataObj = useSelector(cancelApplicationsObj)
  let activRight = useSelector(activRightContent)
  const dispatch = useDispatch()
  
 
  useEffect(() => {
    
    
  }, [cancelApplicationsDataObj])

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

  function dataInputBack() {
    if(textAreaDate.trim() != '') {
      for(let key in cancelApplicationsDataObj) {
        toBack([textAreaDate.trim(), 'Отклонена', cancelApplicationsDataObj[key]['id']])
        //dispatch(setCancelApplicationsObj({...cancelApplicationsDataObj[key], status: "Отклонена"}))
      }

      dispatch(setCancelApplications(false))
    } alert('Введите причину отмены')
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