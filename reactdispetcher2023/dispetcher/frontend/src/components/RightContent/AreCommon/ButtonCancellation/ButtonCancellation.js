export default function ButtonCancellation({name, cancellation, width = false}) {
  return(
    <div className={width ? "buttonCancellation-wrap buttonCancellation-width" : "buttonCancellation-wrap"} onClick={cancellation}>
      <div className="buttonCancellation-wrap-name">{name}</div>
    </div>
  )
}