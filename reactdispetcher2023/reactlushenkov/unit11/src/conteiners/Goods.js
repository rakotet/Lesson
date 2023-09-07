import {useDispatch} from 'react-redux'
import { addGoods } from '../action' // не указываем сам файл т.к. он index.js и подставляется сам

export default function Goods() {
  const dispatch = useDispatch() // ф-я которая отправляет команду на изменения хранилища через нашу ф-ю

  function formHandler(event) {
    event.preventDefault()
    console.log(event.target.elements)

    let data = event.target.elements
    dispatch(addGoods(data.id.value, data.title.value, data.image.value))
  }

  return(
    <div>
      <form onSubmit={formHandler}>
        <div>
          <input type="text" name="id" defaultValue="28ss7s"/>
        </div>
        <div>
          <input type="text" name="title" defaultValue="Кресло Leset Винтажткань Melva 61"/>
        </div>
        <div>
          <input type="text" name="image" defaultValue="https://cdn.leroymerlin.ru/lmru/image/upload/v1634627830/b_white,c_pad,d_photoiscoming.png,f_auto,h_2000,q_auto,w_2000/lmcode/iYIYal2pkky_un41TVhKeA/93409101.jpg"/>
        </div>
        <div>
          <button type="submit">Add new goods</button>
        </div>
      </form>
    </div>
  )
}