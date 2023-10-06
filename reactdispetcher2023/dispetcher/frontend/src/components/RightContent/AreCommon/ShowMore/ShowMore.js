import img from './image/Stroke.png'

export default function ShowMore({label, click}) {
  return(
    <div className="showMore">
      <span onClick={click}>{label}</span>
      <img src={img} alt="" />

    </div>
  )
}