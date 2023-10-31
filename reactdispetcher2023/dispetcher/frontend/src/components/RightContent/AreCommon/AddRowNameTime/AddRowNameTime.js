import TimePickerApplications from "../TimePickerApplications/TimePickerApplications"

export default function AddRowNameTime({dataName, name, dataInputOnChange, defaultValue=''}) {
  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <TimePickerApplications name={name} onChange={dataInputOnChange} defaultValue={defaultValue}/>
    </div>
  )
}