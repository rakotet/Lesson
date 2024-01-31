export default function DownloadReport({clickDownload = () => {}}) {
  return(
    <div className="downloadReport" onClick={clickDownload}>
      <span>Выгрузить отчет</span>
    </div>
  )
}