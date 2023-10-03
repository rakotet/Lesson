import LeftContent from "../LeftContent/LeftContent";
import RightContent from "../RightContent/RightContent";
import { useState } from "react";

export default function BodyWrapper() {
  const [collapse, setCollapse] = useState(true)

  function collapseClick() {
    setCollapse(!collapse)
  }

  return(
    <div className="bodyWrapper">
      <div className={`bodyWrapper-left ${!collapse ? 'bodyWrapper-left-collapse' : ''}`}>
        <LeftContent collapseData={collapseClick} hideRow={collapse}/>
      </div>
      <div className="bodyWrapper-right">
        <RightContent />
      </div>
    </div>
  )
}