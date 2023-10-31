export default function ButtonDownloadFile({name, cancellation}) {
  return(
    <div className="buttonCancellation-wrap buttonDownloadFile-wrap" onClick={cancellation}>
      <div className="buttonCancellation-wrap-name">{name}</div>
    </div>
  )
}