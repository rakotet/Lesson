export default function AddRowNameInput({dataName, placeholder, name}) {
  return(
    <div className="addRowNameInput-wrap">
      <div className="addRowNameInput-name">{dataName}</div>
      <input name={name} type="text" placeholder={placeholder} />
    </div>
  )
}