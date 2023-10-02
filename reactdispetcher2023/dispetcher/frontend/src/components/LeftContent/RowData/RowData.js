import dispActivImg from "./images/disp-activ-img.png";
import groupActivImg from "./images/group-activ-img.png";
import dispNoActivImg from "./images/disp-noactiv-img.png";
import groupNoActivImg from "./images/group-noactiv-img.png";
import autoNoActivImg from "./images/auto-noactiv.png";
import autoActivImg from "./images/auto-activ.png";
import applicationsNoActivImg from "./images/applications-noactiv.png";
import applicationsActivImg from "./images/applications-activ.png";
import myApplicationsNoActivImg from "./images/myApplications-noaction.png";
import myApplicationsActivImg from "./images/myApplications-action.png";
import myTemplatesNoActivImg from "./images/myTemplates-noactiv.png";
import myTemplatesActivImg from "./images/myTemplates-activ.png";
import adminsActivImg from "./images/admins-activ.png";

import { useSelector } from 'react-redux';
import { nameRowData } from "../../store/reduser";

export default function RowData({name, count, active, click, hide = ''}) {
  let nameRow = useSelector(nameRowData)

  let img;

  if(name == nameRow.disp && active) img = dispActivImg
  else if(name == nameRow.disp && active == false) img = dispNoActivImg
  else if(name == nameRow.group && active) img = groupActivImg
  else if(name == nameRow.group && active == false) img = groupNoActivImg
  else if(name == nameRow.auto && active) img = autoActivImg
  else if(name == nameRow.auto && active == false) img = autoNoActivImg
  else if(name == nameRow.applications && active) img = applicationsActivImg
  else if(name == nameRow.applications && active == false) img = applicationsNoActivImg
  else if(name == nameRow.myApplications && active) img = myApplicationsActivImg
  else if(name == nameRow.myApplications && active == false) img = myApplicationsNoActivImg
  else if(name == nameRow.myTemplates && active) img = myTemplatesActivImg
  else if(name == nameRow.myTemplates && active == false) img = myTemplatesNoActivImg
  else if(name == nameRow.admins && active) img = adminsActivImg

  return(
    <div className="rowData">
      <img src={img} alt=""></img>
      <div className={`rowData-name ${active ? 'rowData-name-active' : 'rowData-name-noActive'}`} onClick={click}>
        {name}
      </div>
      <div className={`rowData-count-wrapp ${hide}`}>
        <div></div>
        <div className="rowData-count">
          {count}
        </div>
      </div>
    </div>
  )
}