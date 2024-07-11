export function toDayDate() {
  let date = ((new Date).toLocaleDateString()).split('.')
  let localDate = `${date[2]}-${date[1]}-${date[0]}`

  return localDate
}

export function yesItem(arr: Array<object>) {
  let count = false

  arr.forEach(item => {
    if(item != undefined) count = true
  });

  return count
}