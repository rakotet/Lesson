export default function freeTimeAuto(dataItem, arrAssign) {
  let arrData = [dataItem]
  let suitableAuto = []
  
    suitableAuto = arrData.map(itemData => {
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

    return suitableAuto[0].freeTimeStr
}

function numberTime(arr, i, value) {
  let count = 0
  for(i; i < arr.length; i++) {
    count++
    if(arr[i] == value) break
  }

  return count
}