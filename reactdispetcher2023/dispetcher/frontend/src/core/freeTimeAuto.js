export default function freeTimeAuto(dataItem, arrAssign) {
  let arrData = [dataItem]
  let suitableAuto = []
  
    suitableAuto = arrData.map(itemData => {
      let sTime = Number(arrAssign[1][0] + arrAssign[1][1])
      let doTime = Number(arrAssign[2][0] + arrAssign[2][1])
      let timeArr = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

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

    return suitableAuto[0].freeTimeStr
}

function getNumber(num) {
  if(num.length != 2) {
    return `0${num}:00`
  }

  return `${num}:00`
}