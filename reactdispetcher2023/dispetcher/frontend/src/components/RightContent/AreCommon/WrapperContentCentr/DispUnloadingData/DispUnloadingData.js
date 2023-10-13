import edit from './images/Edit.png'
import trash from './images/Trash.png'
import { useEffect } from 'react'

export default function DispUnloadingData({data, count, dispCardOpenHide, setDispCardEdit}) {
  //console.log(data)

  useEffect(() => {

  }, [])

  return (
    <>
      {data.map((item, index) => {
        if(index < count) {
          return(
            <div key={index} className="dispUnloadingData">
              <div className="dispUnloadingData-namber">
                <div>{index + 1}</div>
              </div>
              <div className="dispUnloadingData-name" onClick={() => dispCardOpenHide(data[`${index}`])}>
                <div>{item.userName}</div>
              </div>
              <div className="dispUnloadingData-jobTitle">
                <div>{item.jobTitle}</div>
              </div>
              <div className="dispUnloadingData-telephone">
                <div>{item.telephone}</div>
              </div>
              <div className="dispUnloadingData-userGroup">
                <div>{item.userGroup}</div>
              </div>
              <div className="dispUnloadingData-auto">
                <div>{item.auto}</div>
              </div>
              <div className="dispUnloadingData-action">
                <div className="dispUnloadingData-action-row">
                  <img src={edit} alt="" onClick={() => setDispCardEdit(data[`${index}`])}/>
                  <img src={trash} alt="" />
                </div>
              </div>
            </div>
            )
          }
      })}
    </>
  )
}