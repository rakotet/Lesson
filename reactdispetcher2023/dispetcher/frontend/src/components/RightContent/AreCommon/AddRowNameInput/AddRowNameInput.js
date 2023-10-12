export default function AddRowNameInput({dataName, placeholder, name, dataInputOnChange, type = 'text', defaultValue=''}) {
  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <input name={name} type={type} placeholder={placeholder} onChange={dataInputOnChange} defaultValue={defaultValue}/>
    </div>
  )
}