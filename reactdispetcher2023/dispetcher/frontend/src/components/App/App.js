import BodyWrapper from "../BodyWrapper/BodyWrapper";
import Header from "../Header/Header";
import AssignAcarCard from "../RightContent/AssignAcarCard/AssignAcarCard";
import CancelApplications from "../RightContent/CancelApplications/CancelApplications";
import NoticeOfApplication from "../RightContent/NoticeOfApplication/NoticeOfApplication";
import { useDispatch, useSelector } from 'react-redux';
import { assignAcarData, cancelApplicationsData, noticeOfApplication } from "../store/reduser";
import { url } from "../../core/core"
import { useEffect } from "react";

function App() {
  let assignAcar = useSelector(assignAcarData)
  let cancelApplications = useSelector(cancelApplicationsData)
  let noticeOfApplicationData = useSelector(noticeOfApplication)
  const dispatch = useDispatch()

  useEffect(() => {
    // function getCookie(name) {
    //   var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    //   return matches ? decodeURIComponent(matches[1]) : undefined;
    // }
    
    
    // document.cookie = "sso_session=MTcwOTc5NzE3Mi0xMC43Mi4xMTkuMjEzLU1hdGxhc2hldnNraWlBQUBTVUVL%0ALlJV--51f943e8425ed0e842d343b498c407a6dcd3ea1c"
    // //console.log(getCookie('sso_session'))

    // fetch(url.urlBack1, {
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify({cookies: true})
    
    //   })
    //   .then(data => {
    //     return data.text()
    //   })
    //   .then(data => {
    //     if(data != 'null') {
    //       console.log(data)
    //     } 
    //   })
    //   .catch((er) => {
    //     console.log(er)
    //   })


  }, [assignAcar])

  return (
    <>
      {assignAcar ? <AssignAcarCard /> : ''}
      {cancelApplications ? <CancelApplications /> : ''}
      {noticeOfApplicationData ? <NoticeOfApplication /> : ''}
      <Header />
      <BodyWrapper />
    </>
  );
}

export default App;
