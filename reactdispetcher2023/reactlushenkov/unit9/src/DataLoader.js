import {useState, useEffect} from 'react'

export default function DataLoader() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setData(data)
    })
  }, [])

  return(
    <>
      <div>
        <ul>
          {data.map((item)=> {
            return <li key={item.id}>{item.name}</li>
          })}
        </ul>
      </div>
    </>
  )
}