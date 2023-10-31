import DatepickerAddApplications from "../DatepickerAddApplications/DatepickerAddApplications"

export default function AddRowNameDate({dataName, name, dataInputOnChange, defaultValue=''}) {
  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <DatepickerAddApplications name={name} onChange={dataInputOnChange} defaultValue={defaultValue}/>
    </div>
  )
}