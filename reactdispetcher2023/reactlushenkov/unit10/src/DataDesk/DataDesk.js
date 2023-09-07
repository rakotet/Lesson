import { useDispatch, useSelector } from 'react-redux'
import { selectCount, selectText } from '../App/counterSlice'
import { increment, selectMyText1, showConsole } from '../App/mytextSlice'

export default function DataDesk() {
  const count = useSelector(selectCount) // получаем даныне из store
  const text = useSelector(selectText) // получаем даныне из store
  const t = useSelector(selectMyText1) // получаем даныне из store
  const dispatch = useDispatch()

  let changeText = () => {
    console.log('work')
    dispatch(increment())
  }

  let changeText2 = () => {
    console.log('work2')
    dispatch(showConsole())
  }

  return(
    <div>
      <hr/>
      <h1>Data Desk</h1>
      <h2>{count}</h2>
      <h2>{text}</h2>
      <h2 onClick={changeText}>{t}</h2>
      <h2 onClick={changeText2}>{text}</h2>
    </div>
  )
}