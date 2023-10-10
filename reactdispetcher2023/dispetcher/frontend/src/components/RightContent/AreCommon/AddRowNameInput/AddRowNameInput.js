export default function AddRowNameInput({dataName, placeholder, name, dataInputOnChange, type = 'text'}) {
  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <input name={name} type={type} placeholder={placeholder} onChange={dataInputOnChange}/>
    </div>
  )
}