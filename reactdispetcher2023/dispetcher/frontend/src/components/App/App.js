import BodyWrapper from "../BodyWrapper/BodyWrapper";
import Header from "../Header/Header";
import AssignAcarCard from "../RightContent/AssignAcarCard/AssignAcarCard";
import CancelApplications from "../RightContent/CancelApplications/CancelApplications";
import NoticeOfApplication from "../RightContent/NoticeOfApplication/NoticeOfApplication";
import { useDispatch, useSelector } from 'react-redux';
import { assignAcarData, cancelApplicationsData, noticeOfApplication } from "../store/reduser";
import { useEffect } from "react";

function App() {
  let assignAcar = useSelector(assignAcarData)
  let cancelApplications = useSelector(cancelApplicationsData)
  let noticeOfApplicationData = useSelector(noticeOfApplication)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('App')
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
