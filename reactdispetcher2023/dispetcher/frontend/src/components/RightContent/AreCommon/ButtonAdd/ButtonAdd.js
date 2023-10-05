import buttonPlus from './image/plus.png'

export default function ButtonAdd({addFunc}) {
  return(
    <div className="buttonAdd">
      <img src={buttonPlus} alt="" onClick={addFunc}/>
    </div>
  )
}