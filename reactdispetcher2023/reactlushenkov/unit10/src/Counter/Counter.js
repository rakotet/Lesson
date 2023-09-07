import { useDispatch, useSelector } from 'react-redux'
import { increment, selectCount, selectText } from '../App/counterSlice'

export default function Counter() {
  const count = useSelector(selectCount) // получаем даныне из store
  const text = useSelector(selectText) // получаем даныне из store
  const dispatch = useDispatch()

  const buttonHandler = () => {
    dispatch(increment())
  }

  return(
    <div>
      <button onClick={buttonHandler}>+</button>
      <h2>{count}</h2>
      <h2>{text}</h2>
    </div>
  )
}