export default function StatusApplications({status}) {
  let color = ''

  if(status == 'Новая') {
    color = 'blue'
  } else if(status == 'Назначена') {
    color = 'green'
  } else if(status == 'Отклонена') {
    color = 'red'
  }


  return (
    <div className={`applicationsUnloadingData-${color}`}>{status}</div>
  )
}