import imgPlus from './image/save.png'

export default function ButtonEdit({name, dataInputBack}) {
  return(
    <div className="buttonCreate-wrap" onClick={dataInputBack}>
      <img src={imgPlus} alt="" />
      <div className="buttonCreate-wrap-name">{name}</div>
    </div>
  )
}