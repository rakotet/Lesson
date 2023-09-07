import {useSelector} from 'react-redux'
import {selectGoods} from '../store/goodsSlice'
import { selectCart } from '../store/cartSlice'

export default function CartList() {
  const goods = useSelector(selectGoods)
  const cart = useSelector(selectCart)

  // далее переиндексируем массив товара для удобства

  const goodsObj = goods.reduce((accum, item) => {
    accum[item['articul']] = item
    return accum
  }, {})

  console.log(Object.keys(cart))

  return(
    <div>
      <ul>
        {Object.keys(cart).map(item => {
          return <li key={item + goodsObj[item]['title']}>{goodsObj[item]['title']} - {cart[item]}</li>
        })}
      </ul>
    </div>
  )
}