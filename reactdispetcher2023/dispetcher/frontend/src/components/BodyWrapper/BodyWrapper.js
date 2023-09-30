import LeftContent from "../LeftContent/LeftContent";
import RightContent from "../RightContent/RightContent";

export default function BodyWrapper() {
  return(
    <div className="bodyWrapper">
      <div className="bodyWrapper-left">
        <LeftContent />
      </div>
      <div className="bodyWrapper-right">
        <RightContent />
      </div>
    </div>
  )
}