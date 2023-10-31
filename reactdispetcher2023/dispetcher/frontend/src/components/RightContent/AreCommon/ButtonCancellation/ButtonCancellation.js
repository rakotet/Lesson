export default function ButtonCancellation({name, cancellation}) {
  return(
    <div className="buttonCancellation-wrap" onClick={cancellation}>
      <div className="buttonCancellation-wrap-name">{name}</div>
    </div>
  )
}