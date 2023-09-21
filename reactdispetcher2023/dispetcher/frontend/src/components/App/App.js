import { useDispatch, useSelector } from 'react-redux'
import Header from "../Header/Header";
import { userDataStore, increment } from "../store/reduser";
import { url } from '../../core/core';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    console.log("componentDidMount");
    const id = document.querySelector('#user').textContent
    const dispatch = useDispatch()

    fetch(url.urlBack1, {
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({userData: id})
  
    })
    .then(data => {
      return data.text()
    })
    .then(data => {
      dispatch(increment(JSON.parse(data)))
    })
    .catch((er) => {
      console.log(er)
    })
    
  }, []);

  const countArr = useSelector(userDataStore)
  console.log(countArr)

  return (
    <>
    {/* <div>{countArr[0].name}</div> */}
     <Header label={'Панель администратора'}/>
    </>
  );
}

export default App;
