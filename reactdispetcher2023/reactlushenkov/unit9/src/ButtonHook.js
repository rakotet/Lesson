import {useState} from 'react'

export default function ButtonHook() {
  const [s1, setS1] = useState('Жми')

  const handleClick = () => {
    setS1('Нажал')
  }

  return(
    <button onClick={handleClick}>{s1}</button>
  )
}