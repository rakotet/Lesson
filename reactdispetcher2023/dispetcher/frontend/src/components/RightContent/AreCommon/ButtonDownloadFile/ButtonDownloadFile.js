export default function ButtonDownloadFile({name, cancellation}) {

  return(
   <>
     <div className="buttonCancellation-wrap buttonDownloadFile-wrap" >
      <div className="buttonCancellation-wrap-name "><label htmlFor="buttonDownloadFile-input">{name}</label></div>
      <input type="file" id="buttonDownloadFile-input" multiple accept=".doc, .docx, .pdf" onChange={cancellation}/>
    </div>
   </>
  )
}