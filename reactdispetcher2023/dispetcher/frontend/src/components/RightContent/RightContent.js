import { useDispatch, useSelector } from 'react-redux'
import { activeRowStore } from "../store/reduser";

export default function RightContent() {
  let activeData = useSelector(activeRowStore)

  return(
    <div>
      {activeData}
    </div>
  )
}