import { useEffect, useState } from "react";
import StatusApplications from "./StatusApplications/StatusApplications";
import {cancelApplicationsData, cancelApplicationsObj} from "../../../../store/reduser";
import { useDispatch, useSelector } from 'react-redux';

export default function MyApplicationsUnloadingData({data, count, dispCardOpenHide, setDispCardEdit, setUploadingData}) {
  const [checkboxData, setCheckboxData] = useState({})
  let cancelApplications = useSelector(cancelApplicationsObj)
  
  useEffect(() => {
    // console.log('ApplicationsUnloadingData')
    setUploadingData(checkboxData)
    
  }, [checkboxData])

  // useEffect(() => {
  //   setUploadingData(cancelApplications)
  // }, [cancelApplications])


function dateApplications(number, numberHours, timeOfUseOfTransport) {
  let date = new Date()
  date.setFullYear(number[6] + number[7] + number[8] + number[9]);
  date.setMonth(number[3] + number[4]);
  date.setDate(number[0] + number[1]);
  date.setHours(numberHours[0] + numberHours[1]);
  date.setMinutes(0);
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
          return(
            <div key={index} className="dispUnloadingData myApplicationsUnloadingData-row">
              <div className="applicationsUnloadingData-margin-checkbox">
                <input type="checkbox" defaultChecked={false} name={`applicationsUnloadingData-checkbox${index}`} onChange={() => checkboxDataChange(event, data[`${index}`])}/>
              </div>
              <div className="applicationsUnloadingData-namber" onClick={() => dispCardOpenHide(data[`${index}`])}>
                <div>{index + 1}</div>
              </div>
              <div className="applicationsUnloadingData-dateOfApplication" >
                <div>{item.dateOfCreation}</div>
              </div>
              <div className="applicationsUnloadingData-timeOfUseOfTransport">
                <div>
                  <div className='applicationsUnloadingData-margin'>{item.dateOfApplication} {item.submissionTime}</div>
                  <div>{dateApplications(item.dateOfApplication, item.submissionTime, item.timeOfUseOfTransport)}</div>
                </div>
              </div>
              <div className="applicationsUnloadingData-travelTime">
                <div>{item.timeOfUseOfTransport} ч</div>
              </div>
              <div className="applicationsUnloadingData-status">
                <StatusApplications status={item.status}/>
              </div>
              <div className="applicationsUnloadingData-driverPhone">
                <div className="applicationsUnloadingData-driverPhone-flex">
                  <div>{item.driverPhone ? item.driverPhone.split('-')[0] : ''}</div>
                  <div>{item.driverPhone ? item.driverPhone.split('-')[1] : ''}</div>
                </div>
              </div>
              <div className="applicationsUnloadingData-auto">
                <div className="applicationsUnloadingData-driverPhone-flex">
                  <div>{item.marc}</div>
                  <div>{item.gossNumber}</div>
                </div>
              </div>
              <div className="applicationsUnloadingData-view">
                <div>{item.view}</div>
              </div>
              {/* <div className="applicationsUnloadingData-applicationInitiator">
                <div className="applicationsUnloadingData-driverPhone-flex">
                  <div>{item.applicationInitiator}</div>
                  <div>{item.initiatorPhone}</div>
                </div>
              </div> */}
              <div className="applicationsUnloadingData-passengerPhone">
                <div className="applicationsUnloadingData-driverPhone-flex">
                  <div>{item.namePassengers}</div>
                  <div>{item.passengersPhone}</div>
                </div>
              </div>
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