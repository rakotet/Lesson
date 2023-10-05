import imgPlus from './image/Add_Plus.png'

export default function ButtonCreate({name}) {
  return(
    <div className="buttonCreate-wrap">
      <img src={imgPlus} alt="" />
      <div className="buttonCreate-wrap-name">{name}</div>
    </div>
  )
}