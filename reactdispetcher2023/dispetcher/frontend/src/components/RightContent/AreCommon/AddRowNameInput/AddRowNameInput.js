export default function AddRowNameInput({dataName, placeholder, name, dataInputOnChange}) {
  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <input name={name} type="text" placeholder={placeholder} onChange={dataInputOnChange}/>
    </div>
  )
}