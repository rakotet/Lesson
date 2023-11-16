export default function dateApplicationsHours(number, numberHours, timeOfUseOfTransport) {
  let date = new Date()
  date.setFullYear(number[6] + number[7] + number[8] + number[9]);
  date.setMonth(number[3] + number[4]);
  date.setDate(number[0] + number[1]);
  date.setHours(numberHours[0] + numberHours[1]);
  date.setMinutes(0);
  let timeOfUse = timeOfUseOfTransport * 3600000
  let dateTime = date.getTime()
  let dateFull = new Date(timeOfUse + dateTime)

  let day = String(dateFull.getDate())
  let month = String(dateFull.getMonth())
  let hours = String(dateFull.getHours())
  let minutes = String(dateFull.getMinutes())

  // if(day.length < 2) day = '0' + day
  // if(month.length < 2) month = '0' + month
  // if(hours.length < 2) hours = '0' + hours
  // if(minutes.length < 2) minutes = '0' + minutes

  return Number(hours)
}