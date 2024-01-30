import { useEffect, useState } from 'react'
import { updateLeftContent, setUpdateLeftContent } from "../../../../../components/store/reduser";
import sortName from '../../../../../core/sortName'
import { useDispatch, useSelector } from 'react-redux';

export default function AssignAcarUnloadingData({data, count, clickAuto, arrAssign, sort, switchArrow}) {
  const [dataArr, setDataArr] = useState([])
  const dispatch = useDispatch()
  let update = useSelector(updateLeftContent)

  function numberTime(arr, i, value) {
    let count = 0
    for(i; i < arr.length; i++) {
      count++
      if(arr[i] == value) break
    }

    return count
  }

  useEffect(() => {
    let suitableAuto = []
  
    suitableAuto = data.map(itemData => {
      let sTime = arrAssign[1]
      let doTime = arrAssign[2]
      let timeArr = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']

      const timeArrConst = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']

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
              if(timeArr[i] == key) {
                let ch = numberTime(timeArr, i, obj[key])
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
              if(timeArr[q] && timeArr[q] != '21:00') {
                str += timeArrConst[(q != 0 ? q - 1 : q)] + '-'
                counter = 1
              }
            } else {
              if(!timeArr[q]) {
                counter = 0
                str += (timeArrConst[q]) + ';'
              } else if(q == (timeArr.length - 1)) {
                str += '21:00' + ';'
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
                strEnd += ar[0] + ' - ' + ar[1] + '; '
              } else {
                let ar = arrStr[z].split('-')
                strEnd += '<span>' + ar[0] + ' - ' + ar[1] + '; </span>'
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

    if(sort.autoMarc && sort.autoMarc != 'Выбрать марку') {
      suitableAuto = suitableAuto.map((item, index) => {
        if(item.marc == sort.autoMarc) return item
      })
  
      suitableAuto = suitableAuto.filter(Boolean)
    }

    if(sort.searchData && sort.searchData != '') {
      suitableAuto = suitableAuto.map((item, index) => {
        for(let key in item) {
          if(key == 'marc' || key == 'gossNumber' || key == 'driver' || key == 'telephone' || key == 'yearOfIssue' || key == 'view' || key == 'status') {
            if(((item[key]).toLowerCase()).includes((sort.searchData).toLowerCase())) return item
          }
        }
      })
  
      suitableAuto = suitableAuto.filter(Boolean)
    }

    if(sort.calendarAutoDate && sort.calendarAutoDate != '') {
      let arrDate = []
      let todayMilli = Number(new Date().getTime())
      let todayLastMilli = Number(new Date(sort.calendarAutoDate).getTime())
  
      if(todayMilli <= Number(new Date(sort.calendarAutoDateOne).getTime())) {
        todayMilli = Number(new Date(sort.calendarAutoDateOne).getTime())
      }
  
      if(/*todayMilli <= todayLastMilli*/ true) {
        for(let i = todayMilli; i <= todayLastMilli; i = i + 86400000) {
          arrDate.push(new Date(i).toLocaleDateString())
        }
  
        if(!(arrDate == [])) {
          arrDate.push(new Date(todayLastMilli).toLocaleDateString())
        }
  
        //console.log(arrDate)
  
        function notToDay(key, value) {
          for(let i = 0; i < arrDate.length; i++) {
            if((key == arrDate[i]) && (Object.keys(value).length)) {
              return false
            }
          }
  
          return true
        }
  
        suitableAuto = suitableAuto.map((item, index) => {
          let freeTime = JSON.parse(item.freeTime)
          
          if(freeTime) {
            let lengthObj = Object.keys(freeTime).length
            let count = 0
  
            for(let key in freeTime) {
              if(freeTime[key] && notToDay(key, freeTime[key])) {
                count++
              }
            }
  
            if(count == lengthObj) {
              return item
            }
  
          } else {
            return item
          }
        })
      }
  
      suitableAuto = suitableAuto.filter(Boolean)
    }

    if(switchArrow.arrow == 'assignAcarTwo') {
      suitableAuto = sortName('marc', true, suitableAuto)
    } else if(switchArrow.arrow == 'assignAcarTwo-default') {
      suitableAuto = sortName('marc', false, suitableAuto)
    }
  
    if(switchArrow.arrow == 'assignAcarThree') {
      suitableAuto = sortName('driver', true, suitableAuto)
    } else if(switchArrow.arrow == 'assignAcarThree-default') {
      suitableAuto = sortName('driver', false, suitableAuto)
    }
  
    if(switchArrow.arrow == 'assignAcarFive') {
      suitableAuto = sortName('yearOfIssue', true, suitableAuto)
    } else if(switchArrow.arrow == 'assignAcarFive-default') {
      suitableAuto = sortName('yearOfIssue', false, suitableAuto)
    }
  
    if(switchArrow.arrow == 'assignAcarSix') {
      suitableAuto = sortName('view', true, suitableAuto)
    } else if(switchArrow.arrow == 'assignAcarSix-default') {
      suitableAuto = sortName('view', false, suitableAuto)
    }
  
    if(switchArrow.arrow == 'assignAcarSeven') {
      suitableAuto = sortName('status', true, suitableAuto)
    } else if(switchArrow.arrow == 'assignAcarSeven-default') {
      suitableAuto = sortName('status', false, suitableAuto)
    }

    setDataArr(suitableAuto)
    
    
  }, [update, sort, switchArrow])

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
                  <div className='assignAcarUnloadingData-green'><span>08:00 - 21:00</span></div> 
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