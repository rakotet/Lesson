import img from './image/x.png'
import { useDispatch, useSelector } from 'react-redux';
import { setNoticeOfApplicationData } from "../../store/reduser";
import { useState, useEffect } from "react"
import { url } from "../../../core/core"
import ButtonCreate from '../AreCommon/ButtonCreate/ButtonCreate'

export default function NoticeOfApplication() {
  const dispatch = useDispatch()
  
  function close() {
    dispatch(setNoticeOfApplicationData(false))
  }

  return(
    <div className="noticeOfApplication-wrap">
      <div className="noticeOfApplication-data">
        <div className="noticeOfApplication-field">
          <div className="noticeOfApplication-row">
            <div className='noticeOfApplication-row-label'></div>
            <div>
              <img src={img} alt="" onClick={close}/>
            </div>
          </div>
          <div>
            <p>Ваша заявка создана и отправлена диспетчеру для дальнейшей работы. При назначении машины либо отклонении заявки вам придет уведомление на почту</p>
          </div>
        </div>
      </div>
    </div>
  )
}