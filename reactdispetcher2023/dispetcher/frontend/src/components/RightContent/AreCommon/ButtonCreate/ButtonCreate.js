import imgPlus from './image/Add_Plus.png'

export default function ButtonCreate({name, dataInputBack}) {
  return(
    <div className="buttonCreate-wrap" onClick={dataInputBack}>
      <img src={imgPlus} alt="" />
      <div className="buttonCreate-wrap-name">{name}</div>
    </div>
  )
}