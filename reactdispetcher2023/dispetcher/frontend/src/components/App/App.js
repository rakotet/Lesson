import { useDispatch, useSelector } from 'react-redux'
import Header from "../Header/Header";
import { userDataStore, increment } from "../store/reduser";
import { url } from '../../core/core';
import { useEffect, useState } from 'react';
import { compose } from '@reduxjs/toolkit';

function App() {
  const [data, setData] = useState([{
    name: '111',
    email: '111@mail.ru'
  }])
  const id = document.querySelector('#user').textContent
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("componentDidMount");

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
      // dispatch(increment(JSON.parse(data)))
      setTimeout(()=> {
        setData(
          JSON.parse(data)
        )
      }, 5000)
      
    })
    .catch((er) => {
      console.log(er)
    })
    
  }, []);

  // console.log(data)

  // dispatch(increment(data))
  //const countArr = useSelector(userDataStore)
  //console.log(data)
  // console.log(countArr)

  return (
    <>
    {/* <div>{data[0].name}</div> */}
     <Header label={'Панель администратора'} name={data[0].name} email={data[0].email}/>
    </>
  );
}

export default App;
