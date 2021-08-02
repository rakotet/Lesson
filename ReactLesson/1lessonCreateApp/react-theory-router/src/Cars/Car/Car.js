import React from 'react'
import './Car.scss'
import {withRouter} from 'react-router-dom' // компанент для использования роутинга в ф-х компанентах


const Car = props => {
  
  return (
    <div 
      className={'Car'}
      onClick={() => props.history.push('/cars/' + props.name.toLowerCase())} // при клике на div меняем значение url на название машины
    >
      <h3>Сar name: {props.name}</h3>
      <p>Year: <strong>{props.year}</strong></p>
    </div>
  )
}

export default withRouter(Car) // для использования роутинга в ф-м компаненте нужно обернуть его в withRouter