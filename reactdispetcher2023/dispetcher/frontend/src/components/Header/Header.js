import sgkImage from '../../../public/images/sgk.png'
import userMenu from '../../../public/images/user-menu.png'

export default function Header({label}) {

  return(
    <>
      <div className="header">
        <div className="header-wrapper">
          <img src={sgkImage} alt="" />
          <h1>{label}</h1>
        </div>
        <div className="header-user-menu">
          <div>
            <h2>Еремин Артем Валентинович</h2>
            <h3>eremin@suek.ru</h3>
          </div>
          <div>
            <img src={userMenu} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}