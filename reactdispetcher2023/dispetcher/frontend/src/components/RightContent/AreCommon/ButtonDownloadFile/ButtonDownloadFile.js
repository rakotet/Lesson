import { url } from "../../../../core/core"

export default function ButtonDownloadFile({name, cancellation, sub}) {

  return(
   <>
     <div className="buttonCancellation-wrap buttonDownloadFile-wrap" >
      <div className="buttonCancellation-wrap-name "><label htmlFor="buttonDownloadFile-input">{name}</label></div>
      {/* <input name="upload_files" type="file" id="buttonDownloadFile-input" accept=".doc, .docx, .pdf" onChange={cancellation}/> */}
      {/* <input name="upload_file" type="file" id="buttonDownloadFile-input" multiple accept=".doc, .docx, .pdf" onChange={cancellation}/> */}

      <form id="formElem" name="upload" encType="multipart/form-data" onSubmit={sub}> 
        <input name="upload_files[]" type="file" id="buttonDownloadFile-input" multiple accept=".doc, .docx, .pdf" onChange={cancellation}/>
        <input id="buttonDownloadFileSubmit" type="submit" value="Загрузить файл"/>
      </form>
    </div>
   </>
  )
}