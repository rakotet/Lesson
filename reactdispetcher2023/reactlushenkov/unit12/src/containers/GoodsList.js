import {useSelector, useDispatch} from 'react-redux'
import {selectGoods} from '../store/goodsSlice'
import Goods from '../components/Goods'
import { increment } from '../store/cartSlice'

export default function GoodsList() { // должен получать данные из хранилища и выводить их
  const goods = useSelector(selectGoods)
  const dispatch = useDispatch()

  function clickHandler(event) {
    event.preventDefault()
    let t = event.target

    if(!t.classList.contains('add-to-cart')) return;

    dispatch(increment(t.getAttribute('data-key')))
  }

  return (
    <>
    <div className='goods-field' onClick={clickHandler}>
      {goods.map(item => <Goods title={item.title} cost={item.cost} image={item.image} articul={item.articul} key={item.articul}/>)}
    </div>
      
    </>
  )
}