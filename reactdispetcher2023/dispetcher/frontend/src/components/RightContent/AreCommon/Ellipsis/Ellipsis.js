import img from './image/Frame 3465077.png'

export default function Ellipsis({handleClick}) {

  return(
    <img className='ellipsis-img' src={img} alt="" onClick={handleClick}/>
  )
}