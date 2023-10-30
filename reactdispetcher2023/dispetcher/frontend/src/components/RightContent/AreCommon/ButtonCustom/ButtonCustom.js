import refresh from './images/refresh.png'
import edit from './images/pencil-alt.png'
import trash from './images/trash.png'
import cancel from './images/x.png'
import downLoad from './images/download.png'


export default function ButtonCustom({addFunc, buttonImg}) {
  let img;
  if(buttonImg == 'refresh') {
    img = refresh
  } else if(buttonImg == 'edit') {
    img = edit
  } else if(buttonImg == 'trash') {
    img = trash
  } else if(buttonImg == 'cancel') {
    img = cancel
  } else if(buttonImg == 'downLoad') {
    img = downLoad
  }

  return(
    <div className="buttonAdd">
      <img src={img} alt="" onClick={addFunc}/>
    </div>
  )
}