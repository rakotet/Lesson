import sgkImage from '../../../public/images/sgk.png'
import userMenu from '../../../public/images/user-menu.png'

export default function Header({label, name, email}) {

  return(
    <>
      <div className="header">
        <div className="header-wrapper">
          <img src={sgkImage} alt="" />
          <h1>{label}</h1>
        </div>
        <div className="header-user-menu">
          <div>
            <h2>{name}</h2>
            <h3>{email}</h3>
          </div>
          <div>
            <img src={userMenu} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}