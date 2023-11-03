import { useEffect, useState } from 'react'

export default function AssignAcarUnloadingData({data, count, clickAuto}) {
  // console.log(data)

  useEffect(() => {
 
  }, [])

  return (
    <>
      {data.map((item, index) => {
        if(index < count) {
          return(
            <div key={index} className="dispUnloadingData">
              <div className="assignAcarUnloadingData-namber" >
                <div>{index + 1}</div>
              </div>
              <div className="assignAcarUnloadingData-auto" onClick={() => clickAuto(data[`${index}`])}>
                <div>
                  <div className='assignAcarUnloadingData-margin'>{item.marc}</div>
                  <div>{item.gossNumber}</div>
                </div>
              </div>
              <div className="assignAcarUnloadingData-telephone">
              <div>
                  <div className='assignAcarUnloadingData-margin'>{item.driver}</div>
                  <div>{item.telephone}</div>
                </div>
              </div>
              <div className="assignAcarUnloadingData-freeTimeToday">
                <div>{item.freeTime == null ? 'Свободен весь день' : item.freeTime}</div>
              </div>
              <div className="assignAcarUnloadingData-yearOfIssue">
                <div>{item.yearOfIssue}</div>
              </div>
              <div className="assignAcarUnloadingData-view">
                <div>{item.view}</div>
              </div>
              <div className="assignAcarUnloadingData-status">
                <div>{item.status}</div>
              </div>
            </div>
            )
          }
      })}
    </>
  )
}