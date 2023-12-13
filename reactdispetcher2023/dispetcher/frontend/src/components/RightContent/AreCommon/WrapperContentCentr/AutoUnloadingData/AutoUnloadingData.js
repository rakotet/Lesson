import edit from './images/Edit.png'
import trash from './images/Trash.png'
import freeTimeAuto from '../../../../../core/freeTimeAuto'
import { useEffect, useState } from 'react'

export default function AutoUnloadingData({data, count, dispCardOpenHide, setDispCardEdit, trashDisp}) {
  let arrDateNow = [new Date().toLocaleDateString(), '00:00', '00:00']
  let arrDateNext = [new Date(new Date().getTime() + 86400000).toLocaleDateString(), '00:00', '00:00']

  useEffect(() => {
   
  }, [])

  return (
    <>
      {data.map((item, index) => {
        if(index < count) {
          return(
            <div key={index} className="dispUnloadingData">
              <div className="autoUnloadingData-namber" onClick={() => dispCardOpenHide(data[`${index}`])}>
                <div>{index + 1}</div>
              </div>
              <div className="autoUnloadingData-auto">
                <div>
                  <div className='autoUnloadingData-margin'>{item.marc}</div>
                  <div>{(item.gossNumber).toUpperCase()}</div>
                </div>
              </div>
              <div className="autoUnloadingData-telephone">
              <div>
                  <div className='autoUnloadingData-margin'>{item.driver}</div>
                  <div>{item.telephone}</div>
                </div>
              </div>
              <div className="autoUnloadingData-freeTimeToday">
                {
                  item.freeTime == null || freeTimeAuto(item, arrDateNow) == undefined ? 
                  <div>08:00 - 21:00</div> :
                  <div>{freeTimeAuto(item, arrDateNow)}</div>
                }
              </div>
              <div className="autoUnloadingData-freeTimeTomorrow">
                {
                  item.freeTime == null || freeTimeAuto(item, arrDateNext) == undefined ? 
                  <div>08:00 - 21:00</div> :
                  <div>{freeTimeAuto(item, arrDateNext)}</div>
                }
              </div>
              <div className="autoUnloadingData-yearOfIssue">
                <div>{item.yearOfIssue}</div>
              </div>
              <div className="autoUnloadingData-view">
                <div>{item.view}</div>
              </div>
              <div className="autoUnloadingData-status">
                <div>{item.status}</div>
              </div>
              <div className="autoUnloadingData-action">
                <div className="dispUnloadingData-action-row">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setDispCardEdit(data[`${index}`])}>
                    <path d="M3.33337 17.5H16.6667" stroke="#0078A8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.33337 17.4999H6.66671L16.0775 7.61859C16.4029 7.27688 16.4029 6.72286 16.0775 6.38115L13.9226 4.11859C13.5972 3.77688 13.0696 3.77688 12.7441 4.11859L3.33337 13.9999V17.4999Z" stroke="#0078A8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 7L13.3333 10.5" stroke="#0078A8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => trashDisp(item)}>
                    <path d="M8.83342 1.875C8.48824 1.875 8.20842 2.15482 8.20842 2.5V3.125H4.66675C4.32157 3.125 4.04175 3.40482 4.04175 3.75C4.04175 4.09518 4.32157 4.375 4.66675 4.375H16.3334C16.6786 4.375 16.9584 4.09518 16.9584 3.75C16.9584 3.40482 16.6786 3.125 16.3334 3.125H12.7917V2.5C12.7917 2.15482 12.5119 1.875 12.1667 1.875H8.83342Z" fill="#0078A8"/>
                    <path d="M8.83342 8.875C9.17859 8.875 9.45842 9.15482 9.45842 9.5L9.45841 15.3333C9.45841 15.6785 9.17859 15.9583 8.83341 15.9583C8.48824 15.9583 8.20841 15.6785 8.20841 15.3333L8.20842 9.5C8.20842 9.15482 8.48824 8.875 8.83342 8.875Z" fill="#0078A8"/>
                    <path d="M12.7917 9.5C12.7917 9.15482 12.5119 8.875 12.1667 8.875C11.8216 8.875 11.5417 9.15482 11.5417 9.5V15.3333C11.5417 15.6785 11.8216 15.9583 12.1667 15.9583C12.5119 15.9583 12.7917 15.6785 12.7917 15.3333V9.5Z" fill="#0078A8"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.49294 6.59765C5.5281 6.28113 5.79564 6.04167 6.11411 6.04167H14.886C15.2045 6.04167 15.4721 6.28113 15.5072 6.59765L15.674 8.09877C15.9764 10.8199 15.9764 13.5661 15.674 16.2872L15.6576 16.435C15.5376 17.5151 14.7005 18.3764 13.6242 18.5271C11.5516 18.8172 9.44861 18.8172 7.37598 18.5271C6.2997 18.3764 5.46258 17.5151 5.34256 16.435L5.32614 16.2872C5.0238 13.5661 5.0238 10.8199 5.32614 8.09877L5.49294 6.59765ZM6.67351 7.29167L6.5685 8.23681C6.27635 10.8662 6.27635 13.5198 6.5685 16.1492L6.58492 16.2969C6.64184 16.8092 7.03885 17.2177 7.54929 17.2891C9.50694 17.5632 11.4932 17.5632 13.4509 17.2891C13.9613 17.2177 14.3583 16.8092 14.4152 16.2969L14.4317 16.1492C14.7238 13.5198 14.7238 10.8662 14.4317 8.23681L14.3266 7.29167H6.67351Z" fill="#0078A8"/>
                  </svg>
                </div>
              </div>
            </div>
            )
          }
      })}
    </>
  )
}