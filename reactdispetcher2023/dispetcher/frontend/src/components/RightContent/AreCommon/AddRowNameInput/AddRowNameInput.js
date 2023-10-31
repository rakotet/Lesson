export default function AddRowNameInput({dataName, placeholder, name, dataInputOnChange, type = 'text', defaultValue='', readOnli = false}) {
  
  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      {
        readOnli ? 
        <input name={name} type={type} placeholder={placeholder} onChange={dataInputOnChange} defaultValue={defaultValue} readOnly/>
        :
        <input name={name} type={type} placeholder={placeholder} onChange={dataInputOnChange} defaultValue={defaultValue} />
      }
    </div>
  )
}