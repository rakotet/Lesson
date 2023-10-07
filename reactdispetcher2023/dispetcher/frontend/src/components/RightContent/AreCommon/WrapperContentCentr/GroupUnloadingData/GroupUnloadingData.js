export default function GroupUnloadingData({data, count}) {
  console.log(data)

  return (
    <>
      {data.map((item, index) => {
        if(index < count) {
          return(
            <div key={index} className="groupUnloadingData">
              <div className="groupUnloadingData-namber">
                <div>{index + 1}</div>
              </div>
              <div className="groupUnloadingData-group">
                <div>{item.nameGroup}</div>
              </div>
              <div className="groupUnloadingData-supervisor">
                <div>{item.supervisor}</div>
              </div>
              <div className="groupUnloadingData-auto">
                <div>{item.autoNumber}</div>
              </div>
            </div>
            )
          }
      })}
    </>
  )
}