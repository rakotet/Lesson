import {useEffect} from 'react'
import { url } from '../../core/core';
import Clock from '../Clock/Clock';

function App() {
  
  const handleClick = () => {
    const id = document.querySelector('#user').textContent

    fetch(url.urlBack1, {
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({action: id})
 
    })
    .then(data => {
      return data.text()
    })
    .then(data => {
      console.log(data)
      // console.log(JSON.parse(data))
    })
    .catch((er) => {
      console.log(er)
    })

    console.log(id)
  }
   

  return (
    <>
      <h1>Hello1</h1>
      <button onClick={handleClick}>тык</button>
      <Clock />
      <div>
        <a href="/?logout">Выход</a>
      </div>
    </>
  );
}

export default App;
