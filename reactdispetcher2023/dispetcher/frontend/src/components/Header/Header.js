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
    body: JSON.stringify({userData: id})
  
    })
    .then(data => {
      return data.text()
    })
    .then(data => {
      data = JSON.parse(data)
      dispatch(setDataStore(data))

      if(data[0].type == roleUsersData.admin) setLabel('Панель администратора')
      else if(data[0].type == roleUsersData.disp) setLabel('Панель диспетчера')
      else if(data[0].type == roleUsersData.user) setLabel('Панель пользователя')
      else if(data[0].type == roleUsersData.sa) setLabel('Панель Супер Администратора')

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
            <h2>{countArr[0].name}</h2>
            <h3>{countArr[0].email}</h3>
          </div>
          <div>
            <img src={userMenu} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}