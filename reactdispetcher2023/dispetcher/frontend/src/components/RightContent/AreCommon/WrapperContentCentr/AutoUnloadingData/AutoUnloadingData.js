import edit from './images/Edit.png'
import trash from './images/Trash.png'
import { useEffect, useState } from 'react'

export default function AutoUnloadingData({data, count, dispCardOpenHide, setDispCardEdit, trashDisp}) {

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
                <div>{item.freeTimeToday == null ? '' : item.freeTimeToday}</div>
              </div>
              <div className="autoUnloadingData-freeTimeTomorrow">
                <div>{item.freeTimeTomorrow == null ? '' : item.freeTimeTomorrow}</div>
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
                  <img src={edit} alt="" onClick={() => setDispCardEdit(data[`${index}`])}/>
                  <img src={trash} alt="" onClick={() => trashDisp(item)}/>
                </div>
              </div>
            </div>
            )
          }
      })}
    </>
  )
}