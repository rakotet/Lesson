export function toDayDate() {
  let date = ((new Date).toLocaleDateString()).split('.')
  let localDate = `${date[2]}-${date[1]}-${date[0]}`

  return localDate
}