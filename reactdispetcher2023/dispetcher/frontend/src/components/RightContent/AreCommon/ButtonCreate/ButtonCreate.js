import imgPlus from './image/Add_Plus.png'

export default function ButtonCreate({name, dataInputBack, img = true}) {
  return(
    <div className="buttonCreate-wrap" onClick={dataInputBack}>
      {img ? <img src={imgPlus} alt="" /> : ''}
      <div className="buttonCreate-wrap-name">{name}</div>
    </div>
  )
}