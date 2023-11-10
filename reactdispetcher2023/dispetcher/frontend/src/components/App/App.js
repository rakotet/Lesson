import BodyWrapper from "../BodyWrapper/BodyWrapper";
import Header from "../Header/Header";
import AssignAcarCard from "../RightContent/AssignAcarCard/AssignAcarCard";
import CancelApplications from "../RightContent/CancelApplications/CancelApplications";
import { useDispatch, useSelector } from 'react-redux';
import { assignAcarData, cancelApplicationsData } from "../store/reduser";
import { useEffect } from "react";

function App() {
  let assignAcar = useSelector(assignAcarData)
  let cancelApplications = useSelector(cancelApplicationsData)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('App')
  }, [assignAcar])

  return (
    <>
      {assignAcar ? <AssignAcarCard /> : ''}
      {cancelApplications ? <CancelApplications /> : ''}
      <Header />
      <BodyWrapper />
    </>
  );
}

export default App;
