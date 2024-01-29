export default function sortName(name, flag, data) {
  if(!flag) {
    data.sort(function(a, b) {
      if (a[name] < b[name]) {
        return -1
      }
      if (a[name] > b[name]) {
        return 1
      }
      
      return 0
    })
  } else {
    
    data.sort(function(a, b) {
      if (a[name] > b[name]) {
        return -1
      }
      if (a[name] < b[name]) {
        return 1
      }
      
      return 0
    })
  }

  return data
}