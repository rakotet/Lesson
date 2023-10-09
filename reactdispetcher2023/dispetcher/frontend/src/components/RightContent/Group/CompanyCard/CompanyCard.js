import ButtonCancellation from "../../AreCommon/ButtonCancellation/ButtonCancellation"

export default function CompanyCard({companyCardOpen, companyCardOpenHide, companyCardData}) {
  
  let divisions;
  let arrObj = []
  let autoNumber = companyCardData.autoNumber
  let nameGroup = companyCardData.nameGroup
  let supervisor = companyCardData.supervisor

  if(companyCardData.divisions) {
    divisions = JSON.parse(companyCardData.divisions)

    for(let key in divisions) {
      arrObj.push(divisions[`${key}`])
    }
  }
  
  return(
    <div className={companyCardOpen ? 'companyCard-hide' : ''}>
      <div className="companyCard">
        <div className="companyCard-group">
          <h5>Предприятие</h5>
          <h4>Название предприятия</h4>
          <div className="companyCard-name">{nameGroup}</div>
          <h4>Руководитель</h4>
          <div className="companyCard-name">{supervisor}</div>
          <h4>Кол-во машин</h4>
          <div className="companyCard-name">{autoNumber}</div>
        </div>

        {arrObj.map((item, index) => {
          return (
            <div key={index} className="companyCard-subdivision">
              <h5>Подразделение {index + 1}</h5>
              <h4>Название подразделения</h4>
              <div className="companyCard-name">{item.nameDivisions}</div>
              <h4>Руководитель</h4>
              <div className="companyCard-name">{item.nameDivisionsSupervisor}</div>
              <h4>Кол-во машин</h4>
              <div className="companyCard-name">{item.autoNumber}</div>
            </div>
          )
        })}
        
      </div>
      <ButtonCancellation name={'Назад'} cancellation={companyCardOpenHide}/>
    </div>
  )
}