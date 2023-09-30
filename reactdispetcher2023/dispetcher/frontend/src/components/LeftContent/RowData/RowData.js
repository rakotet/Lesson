import dispActivImg from "./images/disp-activ-img.png";
import groupActivImg from "./images/group-activ-img.png";
import dispNoActivImg from "./images/disp-noactiv-img.png";
import groupNoActivImg from "./images/group-noactiv-img.png";

export default function RowData({name, count, active, click}) {
  let img;

  if(name == 'Диспетчеры' && active) img = dispActivImg
  else if(name == 'Диспетчеры' && active == false) img = dispNoActivImg
  else if(name == 'Предприятия' && active) img = groupActivImg
  else if(name == 'Предприятия' && active == false) img = groupNoActivImg

  return(
    <div className="rowData">
      <img src={img} alt=""></img>
      <div className={`rowData-name ${active ? 'rowData-name-active' : 'rowData-name-noActive'}`} onClick={click}>
        {name}
      </div>
      <div className="rowData-count-wrapp">
        <div></div>
        <div className="rowData-count">
          {count}
        </div>
      </div>
    </div>
  )
}