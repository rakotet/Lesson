import { useEffect, useState } from 'react'
import { updateLeftContent, setUpdateLeftContent } from "../../../../../components/store/reduser";
import { useDispatch, useSelector } from 'react-redux';

export default function AssignAcarUnloadingData({data, count, clickAuto, arrAssign}) {
  const [dataArr, setDataArr] = useState([])
  const dispatch = useDispatch()
  let update= useSelector(updateLeftContent)

  function getNumber(num) {
    if(num.length != 2) {
      return `0${num}:00`
    }

    return `${num}:00`
  }

  useEffect(() => {
    
    let suitableAuto = []
  
    suitableAuto = data.map(itemData => {
      let sTime = Number(arrAssign[1][0] + arrAssign[1][1])
      let doTime = Number(arrAssign[2][0] + arrAssign[2][1])
      let timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

      let googs = true
      let item = {...itemData}
  
      if(item.freeTime) {
        item = {...item, free: JSON.parse(itemData['freeTime'])}
  
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
  
          for(let q = 0; q < timeArr.length; q++) {
            if(counter == 0) {
              if(timeArr[q] && timeArr[q] != 21) {
                str += timeArr[q] + '-'
                counter = 1
              }
            } else {
              if(!timeArr[q]) {
                counter = 0
                str += (timeArr[(q - 1)] + 1) + ';'
              } else if(q == (timeArr.length - 1)) {
                str += 21 + ';'
              }
            }
          }
  
          let arrStr = str.split(';')
          let arrCount = 0
          let index = 999
          let strEnd = ''
  
          for(let a = 0; a < arrStr.length; a++) {
            if(arrStr[a] != '') {
              let ar = arrStr[a].split('-')
  
              if(sTime >= ar[0] && doTime <= ar[1]) {
                arrCount++
                index = a
                break
              }
            }
          }
  
          if(arrCount == 0) {
            googs = false
          }
  
          for(let z = 0; z < arrStr.length; z++) {
            if(arrStr[z] != '') {
              if(z != index) {
                let ar = arrStr[z].split('-')
                strEnd += getNumber(ar[0]) + ' - ' + getNumber(ar[1]) + '; '
              } else {
                let ar = arrStr[z].split('-')
                strEnd += '<span>' + getNumber(ar[0]) + ' - ' + getNumber(ar[1]) + '; </span>'
              }
            }
          }
          
          if(strEnd == '') strEnd = 'Занят весь день'
  
          item.freeTimeStr = strEnd
          item.goog = googs
          return item
  
        } else {
          item.freeTime = null
          item.goog = googs
          return item
        }
  
      } else {
        item.freeTime = null
        item.goog = googs
        return item
      }
    })

    setDataArr(suitableAuto)
    
    
  }, [update])
  

  return (
    <>
      {dataArr.map((item, index) => {
        if(index < count) {
          return(
            <div key={index} className="dispUnloadingData">
              <div className="assignAcarUnloadingData-namber" >
                <div>{index + 1}</div>
              </div>
             {
              item.goog ? 
                <div className="assignAcarUnloadingData-auto" onClick={() => {
                  clickAuto(data[`${index}`])
                  setDataArr([])
                  dispatch(setUpdateLeftContent(Math.random()))
                }}>
                  <div>
                    <div className='assignAcarUnloadingData-margin'>{item.marc}</div>
                    <div>{item.gossNumber}</div>
                  </div>
                </div> :
                <div className="assignAcarUnloadingData-auto-noHover" >
                  <div>
                    <div className='assignAcarUnloadingData-margin'>{item.marc}</div>
                    <div>{item.gossNumber}</div>
                  </div>
                </div>
              }
              <div className="assignAcarUnloadingData-telephone">
              <div>
                  <div className='assignAcarUnloadingData-margin'>{item.driver}</div>
                  <div>{item.telephone}</div>
                </div>
              </div>
              <div className="assignAcarUnloadingData-freeTimeToday">
                <div>{item.freeTime == null 
                  ? 
                  <div className='assignAcarUnloadingData-green'><span>09:00 - 21:00</span></div> 
                  : 
                  <div className='assignAcarUnloadingData-green' dangerouslySetInnerHTML={{__html: item.freeTimeStr}}></div>}
                </div>
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