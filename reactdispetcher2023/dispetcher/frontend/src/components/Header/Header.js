import { useDispatch, useSelector } from 'react-redux'
import { userDataStore, setDataStore, roleUsers } from "../store/reduser";
import { url } from '../../core/core';
import { useEffect, useState } from 'react';
import sgkImage from '../../../public/images/sgk.png'
import userMenu from '../../../public/images/user-menu.png'

export default function Header() {

  const countArr = useSelector(userDataStore)
  const roleUsersData = useSelector(roleUsers)
  const id = document.querySelector('#user').textContent
  const dispatch = useDispatch()
  const [label, setLabel] = useState('')

  useEffect(() => {
    fetch(url.urlBack1, {
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({userId: id})
  
    })
    .then(data => {
      return data.text()
    })
    .then(data => {
      data = JSON.parse(data)
      data = data[0]
      dispatch(setDataStore(data))

      if(data.type == roleUsersData.admin) setLabel('Панель администратора')
      else if(data.type == roleUsersData.disp) setLabel('Панель диспетчера')
      else if(data.type == roleUsersData.user) setLabel('Панель пользователя')
      else if(data.type == roleUsersData.sa) setLabel('Панель Супер Администратора')

    })
    .catch((er) => {
      console.log(er)
    })
    
  }, []);

  return(
    <>
      <div className="header">
        <div className="header-wrapper">
          <img src={sgkImage} alt="" />
          <h1>{label}</h1>
        </div>
        <div className="header-user-menu">
          <div>
            <h2>{countArr.name}</h2>
            <h3>{countArr.email}</h3>
          </div>
          <div>
            <img src={userMenu} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}