import { useEffect, useState } from 'react'

export default function AssignAcarUnloadingData({data, count, clickAuto, arrAssign}) {
  //console.log(data)

  let suitableAuto = []
  //let timeObj = {9:10, 10:11, 11:12, 12:13, 13:14, 14:15, 15:16, 16:17, 17:18, 18:19, 19:20, 20:21}

  let timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

  useEffect(() => {
    // console.log('AssignAcarUnloadingData')

    for(let g = 0; g < data.length; g++) {
      let item = data[g]

      if(item.freeTime) {
        item['free'] = JSON.parse(item['freeTime'])
  
        if(item['free'][arrAssign[0]]) {
          let obj = item['free'][arrAssign[0]]
          let str = ''
          let counter = 0

          for(let key in obj) {
            
            for(let i = 0; i < timeArr.length; i++) {
             
              if(timeArr[i] == Number(key[0] + key[1])) {
                let ch = ((Number(obj[key][0] + obj[key][1])) - (Number(key[0] + key[1])))
                let count = 0

                for(let w = i; count < ch; w++) {
                  timeArr[w] = false
                  count++
                }

                break
              }
            }
          }

          // console.log(timeArr)

          for(let q = 0; q < timeArr.length; q++) {
            if(counter == 0) {
              if(timeArr[q]) {
                str += timeArr[q] + ' - '
                counter = 1
              }


            } else {
              if(!timeArr[q]) {
                counter = 0
                str += (timeArr[(q - 1)] + 1) + '; '
              }

            }
          }

          str += '21;'

          console.log(str)
            
          
          item.freeTimeFF = str
          suitableAuto.push(item)
  
        } else {
          suitableAuto.push(item)
        }

      } else {
        suitableAuto.push(item)
      }
    }

    
    
  }, [])
  
  
  // console.log(suitableAuto)

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