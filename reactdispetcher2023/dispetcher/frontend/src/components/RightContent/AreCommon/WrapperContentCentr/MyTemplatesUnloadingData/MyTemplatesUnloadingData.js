import { useEffect, useState } from "react";
import {cancelApplicationsData, cancelApplicationsObj} from "../../../../store/reduser";
import { useDispatch, useSelector } from 'react-redux';

export default function MyApplicationsUnloadingData({data, count, dispCardOpenHide, setDispCardEdit, setUploadingData, sort}) {
  const [checkboxData, setCheckboxData] = useState({})
  let cancelApplications = useSelector(cancelApplicationsObj)
  
  useEffect(() => {
    
    setUploadingData(checkboxData)
    
  }, [checkboxData])

  if(sort.searchData && sort.searchData != '') {
    data = data.map((item, index) => {
      for(let key in item) {
        if(key == 'namePassengers' || key == 'passengersPhone' || key == 'submissionAddress' || key == 'arrivalAddress' || key == 'purposeOfTheTrip' || key == 'comment') {
          if(((item[key] ? item[key] : '').toLowerCase()).includes((sort.searchData).toLowerCase())) return item
        }
      }
    })

    data = data. filter(Boolean)
  }

function dateApplications(number, numberHours, timeOfUseOfTransport) {
  let date = new Date()
  date.setFullYear(number[6] + number[7] + number[8] + number[9]);
  date.setMonth(number[3] + number[4]);
  date.setDate(number[0] + number[1]);
  date.setHours(numberHours[0] + numberHours[1]);
  date.setMinutes(numberHours[3] + numberHours[4]);
  let timeOfUse = timeOfUseOfTransport * 3600000
  let dateTime = date.getTime()
  let dateFull = new Date(timeOfUse + dateTime)

  let day = String(dateFull.getDate())
  let month = String(dateFull.getMonth())
  let hours = String(dateFull.getHours())
  let minutes = String(dateFull.getMinutes())

  if(day.length < 2) day = '0' + day
  if(month.length < 2) month = '0' + month
  if(hours.length < 2) hours = '0' + hours
  if(minutes.length < 2) minutes = '0' + minutes

  return `${day}.${month}.${dateFull.getFullYear()} ${hours}:${minutes}`
}


function checkboxDataChange(event, data) { 
  const target = event.target;
  const value = target.value;
  const name = target.name;

  if(checkboxData[`${name}`]) {
    setCheckboxData(n => {
      let nev = {...n};
      delete nev[`${name}`];

      return nev;
    })
  } else {
    setCheckboxData(n => ({...n, [name]: data}))
  }

}

  return (
    <>
      {data.map((item, index) => {
        if(index < count) {
          let arr = []
          let namePassengers = {}
          let passengersPhone = {}

          if(item.namePassengers) {
            namePassengers = JSON.parse(item.namePassengers)
          }

          if(item.passengersPhone) {
            passengersPhone = JSON.parse(item.passengersPhone)
          }

          let lengthDataInput = Object.keys(namePassengers).length

          if(lengthDataInput) {
            for(let key in namePassengers) {
              let oneStr = key.split('-')
              oneStr = oneStr[1]
  
              arr.push(`${namePassengers[`${key}`]}:${passengersPhone[`passengersPhone-${oneStr}`]}`)
            }
          }

          return(
            <div key={index} className="dispUnloadingData myApplicationsUnloadingData-row">
              <div className="applicationsUnloadingData-margin-checkbox">
                <input type="checkbox" defaultChecked={false} name={`applicationsUnloadingData-checkbox${index}`} onChange={() => checkboxDataChange(event, data[`${index}`])}/>
              </div>
              <div className="applicationsUnloadingData-namber" /*onClick={() => dispCardOpenHide(data[`${index}`])}*/>
                <div>{index + 1}</div>
              </div>
              <div className="applicationsUnloadingData-dateOfApplication" >
                <div>{item.dateOfCreation}</div>
              </div>

              <div className="applicationsUnloadingData-passengerPhone">
                <div className="applicationsUnloadingData-driverPhone-flex">
                  { arr.length > 0 ?
                    arr.map((itemObj, ind) => {
                      return (
                        <div key={ind}>
                          <div>{itemObj.split(':')[0]}</div>
                          <div>{itemObj.split(':')[1]}</div>
                        </div>
                      )
                    })
                    : <><div></div><div></div></>
                  }
                </div>
              </div>

             {/* { arr.length > 0 ?
              arr.map((itemObj, ind) => {
                return (
                  <div key={ind} className="applicationsUnloadingData-passengerPhone">
                    <div className="applicationsUnloadingData-driverPhone-flex">
                      <div>{itemObj.split(':')[0]}</div>
                      <div>{itemObj.split(':')[1]}</div>
                    </div>
                  </div>
                )
              })
              :
              <div className="applicationsUnloadingData-passengerPhone">
                <div className="applicationsUnloadingData-driverPhone-flex">
                  <div></div>
                  <div></div>
                </div>
              </div>
             } */}
              
              <div className="applicationsUnloadingData-shippingAddress">
                <div>{item.submissionAddress}</div>
              </div>
              <div className="applicationsUnloadingData-arrivalAddress">
                <div>{item.arrivalAddress}</div>
              </div>
              <div className="applicationsUnloadingData-purposeOfTheTrip">
                <div>{item.purposeOfTheTrip}</div>
              </div>
              <div className="applicationsUnloadingData-comment">
                <div>{item.comment}</div>
              </div>
            </div>
            )
          }
      })}
    </>
  )
}