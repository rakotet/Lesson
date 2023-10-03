export default function SelectData({namePlaceholder}) {
  return(
    <div className="selectData-wrapper">
      <select >
        <option value={namePlaceholder}>{namePlaceholder}</option>
        <option value="test1">test1</option>
        <option value="test2">test2</option>
      </select>
    </div>
  )
}