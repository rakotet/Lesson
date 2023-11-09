import BodyWrapper from "../BodyWrapper/BodyWrapper";
import Header from "../Header/Header";
import AssignAcarCard from "../RightContent/AssignAcarCard/AssignAcarCard";
import { useDispatch, useSelector } from 'react-redux';
import { assignAcarData } from "../store/reduser";
import { useEffect } from "react";

function App() {
  let assignAcar = useSelector(assignAcarData)
  const dispatch = useDispatch()

  useEffect(() => {

  }, [assignAcar])

  return (
    <>
      {assignAcar ? <AssignAcarCard /> : ''}
      <Header />
      <BodyWrapper />
    </>
  );
}

export default App;
